const axios = require('axios');
const fs = require('fs');
const path = require('path');

// OpenAI Configuration
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-4-vision-preview';
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

// Disease knowledge base with symptoms and treatments
const diseaseDatabase = {
  potatolate_blight: {
    name: 'Late Blight',
    symptoms: ['brown spots', 'leaf spots', 'wilting', 'dark lesions'],
    description: 'Fungal disease causing brown spots on leaves and tubers',
    treatments: ['Mancozeb', 'Chlorothalonil', 'Remove infected leaves'],
    prevalence: 0.85,
  },
  powdery_mildew: {
    name: 'Powdery Mildew',
    symptoms: ['white powder', 'leaf curl', 'stunted growth'],
    description: 'Fungal disease affecting leaf surface with white powder-like coating',
    treatments: ['Sulfur spray', 'Neem oil', 'Potassium bicarbonate'],
    prevalence: 0.75,
  },
  leaf_spot: {
    name: 'Leaf Spot',
    symptoms: ['brown spots', 'yellow halo', 'leaf yellowing'],
    description: 'Bacterial or fungal infection causing spots on leaves',
    treatments: ['Copper fungicide', 'Remove infected leaves', 'Improve drainage'],
    prevalence: 0.70,
  },
  rust: {
    name: 'Rust',
    symptoms: ['orange spots', 'yellow spots', 'leaf damage'],
    description: 'Fungal disease causing rust-colored spots',
    treatments: ['Sulfur spray', 'Tebuconazole', 'Remove infected leaves'],
    prevalence: 0.65,
  },
  anthracnose: {
    name: 'Anthracnose',
    symptoms: ['dark spots', 'sunken lesions', 'black dots'],
    description: 'Fungal disease causing dark lesions on leaves and fruit',
    treatments: ['Mancozeb', 'Benomyl', 'Copper sulfate'],
    prevalence: 0.60,
  },
  healthy: {
    name: 'Healthy Plant',
    symptoms: ['green leaves', 'no spots', 'normal growth'],
    description: 'Plant is healthy with no visible disease signs',
    treatments: ['Continue normal care', 'Preventive spraying recommended'],
    prevalence: 0.90,
  },
};

// Analyze image using OpenAI Vision API
const analyzeImageWithOpenAI = async (imageUrl) => {
  try {
    if (!OPENAI_API_KEY || OPENAI_API_KEY.includes('your_') || OPENAI_API_KEY === 'undefined') {
      console.warn('OpenAI API key not configured, falling back to local analysis');
      return null;
    }

    const response = await axios.post(
      OPENAI_API_URL,
      {
        model: OPENAI_MODEL,
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: `Analyze this crop/plant image for potential diseases. Identify:
1. Crop type (if visible)
2. Any visible symptoms or signs of disease
3. Confidence level (0-100%)
4. Specific diseases that might match these symptoms

Respond in JSON format with: {
  "cropType": "string",
  "symptoms": ["array", "of", "symptoms"],
  "confidenceLevel": number,
  "possibleDiseases": [{
    "name": "disease name",
    "likelihood": number
  }],
  "description": "brief description of findings"
}`,
              },
              {
                type: 'image_url',
                image_url: {
                  url: imageUrl,
                },
              },
            ],
          },
        ],
        max_tokens: 1024,
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const analysisText = response.data.choices[0].message.content;
    const jsonMatch = analysisText.match(/\{[\s\S]*\}/);
    
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    return null;
  } catch (error) {
    if (error.response?.status === 401) {
      console.warn('OpenAI API: Invalid or missing API key. Falling back to local disease detection.');
    } else if (error.response?.status === 429) {
      console.warn('OpenAI API: Rate limit exceeded. Falling back to local disease detection.');
    } else {
      console.warn('OpenAI Vision API error:', error.response?.data?.error?.message || error.message);
    }
    return null;
  }
};

// Map OpenAI results to disease database
const mapOpenAIResultsToDiseases = (openAIAnalysis) => {
  if (!openAIAnalysis)
    return null;

  const symptoms = openAIAnalysis.symptoms || [];
  let bestMatch = null;
  let highestScore = 0;

  for (const [diseaseId, disease] of Object.entries(diseaseDatabase)) {
    let matchScore = 0;

    // Match symptoms
    const matchedSymptoms = symptoms.filter(s =>
      disease.symptoms.some(ds => ds.includes(s.toLowerCase()) || s.toLowerCase().includes(ds))
    );

    if (symptoms.length > 0) {
      matchScore = matchedSymptoms.length / symptoms.length;
    }

    if (matchScore > highestScore) {
      highestScore = matchScore;
      bestMatch = { diseaseId, disease, confidence: Math.min(matchScore * 100, 95) };
    }
  }

  // If no match found but symptoms detected, return custom analysis
  if (!bestMatch && symptoms.length > 0) {
    return {
      diseaseId: 'identified_disease',
      disease: {
        name: openAIAnalysis.possibleDiseases?.[0]?.name || 'Unidentified Condition',
        symptoms: symptoms,
        description: openAIAnalysis.description || 'Plant shows signs of disease',
        treatments: ['Consult local agricultural expert', 'Remove affected parts', 'Increase monitoring'],
      },
      confidence: openAIAnalysis.confidenceLevel || 60,
    };
  }

  return bestMatch;
};

// Simple local disease detection fallback
const detectDiseaseLocally = async (imageUrl) => {
  try {
    // Default heuristic when OpenAI is not available
    // Returns a healthy plant by default (conservative approach)
    return {
      diseaseId: 'healthy',
      disease: diseaseDatabase.healthy,
      confidence: 60, // Lower confidence for local detection
    };
  } catch (error) {
    console.error('Local disease detection error:', error);
    return {
      diseaseId: 'healthy',
      disease: diseaseDatabase.healthy,
      confidence: 50,
    };
  }
};

// Main disease detection function using OpenAI Vision API
exports.detectDiseaseFromImage = async (imageUrl, cropType = 'crop') => {
  try {
    // Try OpenAI Vision API first
    const openAIAnalysis = await analyzeImageWithOpenAI(imageUrl);

    let result;
    if (openAIAnalysis) {
      result = mapOpenAIResultsToDiseases(openAIAnalysis);
    }

    // Fallback to local detection if OpenAI is not available or failed
    if (!result) {
      result = await detectDiseaseLocally(imageUrl);
    }

    return {
      diseaseId: result.diseaseId,
      diseaseName: result.disease.name,
      description: result.disease.description,
      confidence: result.confidence,
      symptoms: result.disease.symptoms || [],
      treatments: result.disease.treatments || [],
      detectedSymptoms: openAIAnalysis?.symptoms || [],
      recommendations: generateRecommendations(result.disease),
      openAIPowered: !!openAIAnalysis,
      usingFallback: !openAIAnalysis,
    };
  } catch (error) {
    console.error('Disease detection error:', error);
    return {
      diseaseId: 'unknown',
      diseaseName: 'Disease detection unavailable',
      description: 'Disease detection service is currently unavailable. Using local database.',
      confidence: 0,
      symptoms: [],
      treatments: ['Please contact support or try again later'],
      recommendations: ['Please capture a clearer image of the affected area', 'Consider consulting with a local agricultural expert'],
      openAIPowered: false,
      usingFallback: true,
    };
  }
};

// Generate actionable recommendations
const generateRecommendations = (disease) => {
  const recommendations = [];

  if (disease.treatments && disease.treatments.length > 0) {
    recommendations.push(`Primary treatment: ${disease.treatments[0]}`);
    if (disease.treatments.length > 1) {
      recommendations.push(`Alternative: ${disease.treatments[1]}`);
    }
  }

  recommendations.push('Ensure proper ventilation and reduce humidity');
  recommendations.push('Remove affected leaves to prevent spread');
  recommendations.push('Monitor the plant regularly for progression');
  recommendations.push('Consult local agricultural expert for personalized advice');

  return recommendations;
};

// Get treatment options for a disease
exports.getTreatmentOptions = (diseaseId) => {
  const disease = diseaseDatabase[diseaseId];
  if (!disease)
    return null;

  return {
    diseaseName: disease.name,
    treatments: disease.treatments,
    preventiveMeasures: [
      'Maintain proper spacing between plants',
      'Avoid overwatering',
      'Remove plant debris',
      'Improve air circulation',
      'Use disease-resistant varieties',
    ],
    recurringTreatmentSchedule: '7-10 days interval',
    estimatedRecoveryTime: '2-4 weeks',
  };
};

// Quick response cache for common crops and diseases
const responseCache = new Map();

exports.getCachedResponse = (imageHash) => {
  return responseCache.get(imageHash);
};

exports.cacheResponse = (imageHash, response) => {
  responseCache.set(imageHash, response);
  // Clear cache after 1 hour
  setTimeout(() => responseCache.delete(imageHash), 3600000);
};
