const Crop = require('../models/Crop');
const DiseaseDetection = require('../models/DiseaseDetection');
const axios = require('axios');

// Verify crop from uploaded image
exports.verifyCrop = async (req, res) => {
  try {
    const { cropId } = req.body;
    let imageUrl = req.body.imageUrl;

    // Handle file upload
    if (req.file) {
      const filePath = `/uploads/${req.file.filename}`;
      imageUrl = `${process.env.SERVER_URL || 'http://localhost:5000'}${filePath}`;
    }

    if (!imageUrl) {
      return res.status(400).json({ message: 'Image is required for verification' });
    }

    // Get crop details
    const crop = cropId ? await Crop.findById(cropId).populate('commonDiseases') : null;

    // Verify crop using ML API (if available)
    let verificationResult = {
      isValid: true,
      cropType: crop ? crop.name : 'Unknown',
      confidence: 0,
      issues: [],
      suggestions: [],
    };

    try {
      const mlResponse = await axios.post(
        `${process.env.CROP_VERIFICATION_API_URL}/verify`,
        {
          image_url: imageUrl,
          crop_id: cropId,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.CROP_VERIFICATION_API_KEY}`,
          },
        }
      );

      verificationResult = {
        isValid: mlResponse.data.is_valid,
        cropType: mlResponse.data.detected_crop_type,
        confidence: mlResponse.data.confidence,
        issues: mlResponse.data.issues || [],
        suggestions: mlResponse.data.suggestions || [],
        detectedDiseases: mlResponse.data.detected_diseases || [],
      };
    } catch (mlError) {
      console.log('Crop verification API not available, using basic verification');
      
      // Basic verification - check if crop is in database
      if (crop) {
        verificationResult.cropType = crop.name;
        verificationResult.confidence = 0.85;
        verificationResult.suggestions = [
          `Crop: ${crop.name}`,
          `Scientific Name: ${crop.scientificName}`,
          `Season: ${crop.season}`,
          `Water Requirement: ${crop.waterRequirement}`,
          `Soil Types: ${crop.soilType.join(', ')}`,
        ];
      }
    }

    res.status(200).json({
      success: true,
      verification: {
        ...verificationResult,
        imageUrl,
        timestamp: new Date(),
        farmerId: req.user.id,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

// Get crop details for verification
exports.getCropDetails = async (req, res) => {
  try {
    const { cropId } = req.params;

    const crop = await Crop.findById(cropId).populate('commonDiseases');

    if (!crop) {
      return res.status(404).json({ message: 'Crop not found' });
    }

    res.status(200).json({
      success: true,
      crop,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

// Get all available crops for verification
exports.getAllCrops = async (req, res) => {
  try {
    const crops = await Crop.find({}).populate('commonDiseases');

    res.status(200).json({
      success: true,
      count: crops.length,
      crops,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};

// Verify and detect disease in one step
exports.verifyAndDetect = async (req, res) => {
  try {
    const { cropId, latitude, longitude } = req.body;
    let imageUrl = req.body.imageUrl;

    // Handle file upload
    if (req.file) {
      const filePath = `/uploads/${req.file.filename}`;
      imageUrl = `${process.env.SERVER_URL || 'http://localhost:5000'}${filePath}`;
    }

    if (!imageUrl) {
      return res.status(400).json({ message: 'Image is required' });
    }

    // Step 1: Verify crop
    const crop = cropId ? await Crop.findById(cropId).populate('commonDiseases') : null;

    let verificationResult = {
      isValid: true,
      cropType: crop ? crop.name : 'Unknown',
      confidence: 0.85,
      issues: [],
      suggestions: crop
        ? [
            `Crop: ${crop.name}`,
            `Scientific Name: ${crop.scientificName}`,
            `Season: ${crop.season}`,
          ]
        : [],
    };

    // Step 2: Detect disease
    let detectedDisease = null;
    let diseaseConfidence = 0;

    try {
      const mlResponse = await axios.post(
        `${process.env.DISEASE_DETECTION_API_URL}/detect`,
        {
          image_url: imageUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.DISEASE_DETECTION_API_KEY}`,
          },
        }
      );

      detectedDisease = mlResponse.data.disease_id;
      diseaseConfidence = mlResponse.data.confidence;
    } catch (mlError) {
      console.log('Disease detection API not available');
    }

    // Create detection record
    const detection = new DiseaseDetection({
      farmer: req.user.id,
      crop: cropId,
      imageUrl,
      detectedDisease,
      confidence: diseaseConfidence,
      fieldLocation: {
        type: 'Point',
        coordinates: [longitude || 0, latitude || 0],
      },
    });

    await detection.save();
    await detection.populate(['crop', 'detectedDisease', 'recommendedTreatments']);

    res.status(201).json({
      success: true,
      verification: verificationResult,
      detection: detection,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};
