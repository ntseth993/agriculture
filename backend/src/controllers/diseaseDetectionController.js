const DiseaseDetection = require('../models/DiseaseDetection');
const Disease = require('../models/Disease');
const Crop = require('../models/Crop');
const aiService = require('../services/aiService');
const translationService = require('../services/translationService');
const mongoose = require('mongoose');
const path = require('path');

// Helper function to get or create disease
const getOrCreateDisease = async (diseaseId, diseaseName, cropId = null) => {
  try {
    // First check if it's a valid ObjectId and try to find it
    if (mongoose.Types.ObjectId.isValid(diseaseId)) {
      const disease = await Disease.findById(diseaseId);
      if (disease) return disease._id;
    }

    // Try to find by name
    let disease = await Disease.findOne({ name: diseaseName });
    
    // If not found, create it
    if (!disease) {
      const diseaseData = {
        name: diseaseName,
        description: `Disease: ${diseaseName}`,
      };
      
      // Add crop if provided
      if (cropId && mongoose.Types.ObjectId.isValid(cropId)) {
        diseaseData.crop = cropId;
      }
      
      disease = new Disease(diseaseData);
      await disease.save();
    }

    return disease._id;
  } catch (error) {
    console.error('Error getting/creating disease:', error);
    return null;
  }
};

// Helper function to get or create crop
const getOrCreateCrop = async (cropId, cropName = null) => {
  try {
    // First check if it's a valid ObjectId
    if (mongoose.Types.ObjectId.isValid(cropId)) {
      const crop = await Crop.findById(cropId);
      if (crop) return crop._id;
    }

    // If cropId is a string name, try to find or create by name
    const searchName = cropName || cropId;
    let crop = await Crop.findOne({ name: searchName });
    
    if (!crop) {
      crop = new Crop({
        name: searchName,
        type: 'vegetable',
      });
      await crop.save();
    }

    return crop._id;
  } catch (error) {
    console.error('Error getting/creating crop:', error);
    return null;
  }
};

// Detect disease from image (with file upload support)
exports.detectDisease = async (req, res) => {
  try {
    const { imageUrl, cropId, latitude, longitude, language = 'en' } = req.body;
    let finalImageUrl = imageUrl;

    // Handle file upload
    if (req.file) {
      const filePath = `/uploads/${req.file.filename}`;
      finalImageUrl = `${process.env.SERVER_URL || 'http://localhost:5000'}${filePath}`;
    }

    if (!finalImageUrl || !cropId) {
      return res.status(400).json({ message: 'Image and crop ID are required' });
    }

    // Detect disease using AI service
    let detectionResult = await aiService.detectDiseaseFromImage(finalImageUrl);

    // Validate detection result
    if (!detectionResult) {
      return res.status(500).json({ message: 'Disease detection failed - no result returned' });
    }

    // Translate response to requested language
    if (language && language !== 'en') {
      try {
        detectionResult = await translationService.translateDetectionResponse(detectionResult, language);
      } catch (translationError) {
        console.error('Translation failed:', translationError);
        // Continue with English result if translation fails
      }
    }

    // Get or create the crop document
    const validCropId = await getOrCreateCrop(cropId);
    if (!validCropId) {
      return res.status(500).json({ message: 'Failed to process crop information' });
    }

    // Get or create the disease document
    const validDiseaseId = await getOrCreateDisease(detectionResult.diseaseId, detectionResult.diseaseName, validCropId);

    // Create detection record
    const detection = new DiseaseDetection({
      farmer: req.user.id,
      crop: validCropId,
      imageUrl: finalImageUrl,
      detectedDisease: validDiseaseId,
      confidence: detectionResult.confidence,
      symptoms: detectionResult.symptoms || [],
      fieldLocation: {
        type: 'Point',
        coordinates: [longitude || 0, latitude || 0],
      },
      notes: detectionResult.description || '',
    });

    await detection.save();
    await detection.populate(['crop', 'detectedDisease']);

    res.status(201).json({
      success: true,
      detection: {
        _id: detection._id,
        crop: detection.crop,
        detectedDisease: detection.detectedDisease,
        ...detectionResult,
        confidencePercentage: Math.round(detectionResult.confidence * 100),
      },
    });
  } catch (error) {
    console.error('Disease detection error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get user's detection history
exports.getDetectionHistory = async (req, res) => {
  try {
    const { language = 'en' } = req.query;
    const detections = await DiseaseDetection.find({
      farmer: req.user.id,
    })
      .populate('crop')
      .populate('detectedDisease')
      .sort({ createdAt: -1 });

    // Translate detection details if needed
    if (language && language !== 'en') {
      for (let detection of detections) {
        if (detection.symptoms && Array.isArray(detection.symptoms)) {
          detection.symptoms = await Promise.all(
            detection.symptoms.map(s => translationService.translateText(s, language))
          );
        }
      }
    }

    res.status(200).json(detections);
  } catch (error) {
    console.error('Detection history error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Update detection with feedback
exports.updateDetectionFeedback = async (req, res) => {
  try {
    const { detectionId } = req.params;
    const { isAccurate, correctDisease, suggestions } = req.body;

    const detection = await DiseaseDetection.findById(detectionId);
    if (!detection) {
      return res.status(404).json({ message: 'Detection not found' });
    }

    detection.userFeedback = {
      isAccurate,
      correctDisease,
      suggestions,
    };

    await detection.save();

    res.status(200).json({
      success: true,
      detection,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
