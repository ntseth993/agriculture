const axios = require('axios');

// Multi-language support with translations
const languageSupport = {
  en: 'English',
  hi: 'Hindi',
  es: 'Spanish',
  fr: 'French',
  pt: 'Portuguese',
  zh: 'Chinese',
  ja: 'Japanese',
  ar: 'Arabic',
  de: 'German',
  ru: 'Russian',
};

// Local translation cache for common disease terms
const translationCache = {
  en: {
    'Late Blight': 'Late Blight',
    'Powdery Mildew': 'Powdery Mildew',
    'Leaf Spot': 'Leaf Spot',
    'Rust': 'Rust',
    'Anthracnose': 'Anthracnose',
    'Healthy Plant': 'Healthy Plant',
    'treatment': 'treatment',
    'symptom': 'symptom',
    'recommendation': 'recommendation',
  },
  hi: {
    'Late Blight': 'देर से आने वाला झुलसा',
    'Powdery Mildew': 'पाउडरी मिल्डयू',
    'Leaf Spot': 'पत्ती धब्बा',
    'Rust': 'जंग',
    'Anthracnose': 'एन्थ्रेक्नोज',
    'Healthy Plant': 'स्वस्थ पौधा',
    'treatment': 'उपचार',
    'symptom': 'लक्षण',
    'recommendation': 'सिफारिश',
  },
  es: {
    'Late Blight': 'Tizón tardío',
    'Powdery Mildew': 'Mildiú polvoriento',
    'Leaf Spot': 'Mancha foliar',
    'Rust': 'Roya',
    'Anthracnose': 'Antracnosis',
    'Healthy Plant': 'Planta saludable',
    'treatment': 'tratamiento',
    'symptom': 'síntoma',
    'recommendation': 'recomendación',
  },
  fr: {
    'Late Blight': 'Mildiou tardif',
    'Powdery Mildew': 'Oïdium',
    'Leaf Spot': 'Tache foliaire',
    'Rust': 'Rouille',
    'Anthracnose': 'Anthracnose',
    'Healthy Plant': 'Plante saine',
    'treatment': 'traitement',
    'symptom': 'symptôme',
    'recommendation': 'recommandation',
  },
  pt: {
    'Late Blight': 'Requeima',
    'Powdery Mildew': 'Oídio',
    'Leaf Spot': 'Mancha foliar',
    'Rust': 'Ferrugem',
    'Anthracnose': 'Antracnose',
    'Healthy Plant': 'Planta saudável',
    'treatment': 'tratamento',
    'symptom': 'sintoma',
    'recommendation': 'recomendação',
  },
  zh: {
    'Late Blight': '晚疫病',
    'Powdery Mildew': '白粉病',
    'Leaf Spot': '叶斑病',
    'Rust': '锈病',
    'Anthracnose': '炭疽病',
    'Healthy Plant': '健康植物',
    'treatment': '治疗',
    'symptom': '症状',
    'recommendation': '建议',
  },
};

// Get supported languages
exports.getSupportedLanguages = () => {
  return languageSupport;
};

// Translate text to target language
exports.translateText = async (text, targetLanguage = 'en') => {
  try {
    // Handle null/undefined text
    if (!text) return '';
    
    // Ensure we have a string
    const textStr = String(text).trim();
    if (!textStr) return '';
    
    // Check local cache first
    if (translationCache[targetLanguage] && translationCache[targetLanguage][textStr]) {
      return translationCache[targetLanguage][textStr];
    }

    // If using Google Translate API (optional)
    if (process.env.GOOGLE_TRANSLATE_API_KEY) {
      try {
        const response = await axios.post(
          'https://translation.googleapis.com/language/translate/v2',
          {
            q: textStr,
            target: targetLanguage,
            key: process.env.GOOGLE_TRANSLATE_API_KEY,
          }
        );
        return response.data.data.translations[0].translatedText;
      } catch (apiError) {
        console.log('Google Translate API failed, using cache:', apiError.message);
      }
    }

    // Return original if no translation available
    return textStr;
  } catch (error) {
    console.error('Translation error:', error);
    return text || ''; // Return original text if translation fails
  }
};

// Translate entire disease detection response
exports.translateDetectionResponse = async (detection, language = 'en') => {
  try {
    // Handle null/undefined detection
    if (!detection) {
      return { error: 'No detection data provided' };
    }

    const translatedResponse = {
      ...detection,
      diseaseName: await exports.translateText(detection.diseaseName || '', language),
      description: await exports.translateText(detection.description || '', language),
      symptoms: detection.symptoms && Array.isArray(detection.symptoms)
        ? await Promise.all(
            detection.symptoms.filter(s => s).map(symptom => exports.translateText(symptom, language))
          )
        : [],
      treatments: detection.treatments && Array.isArray(detection.treatments)
        ? await Promise.all(
            detection.treatments.filter(t => t).map(treatment => exports.translateText(treatment, language))
          )
        : [],
      recommendations: detection.recommendations && Array.isArray(detection.recommendations)
        ? await Promise.all(
            detection.recommendations.filter(r => r).map(rec => exports.translateText(rec, language))
          )
        : [],
      detectedSymptoms: detection.detectedSymptoms && Array.isArray(detection.detectedSymptoms)
        ? await Promise.all(
            detection.detectedSymptoms.filter(s => s).map(symptom => exports.translateText(symptom, language))
          )
        : [],
      language: language,
    };

    return translatedResponse;
  } catch (error) {
    console.error('Response translation error:', error);
    return detection; // Return original if translation fails
  }
};

// Batch translate array of items
exports.batchTranslate = async (items, language = 'en') => {
  return Promise.all(
    items.map(item => exports.translateText(item, language))
  );
};

// Get language-specific content
exports.getLocalizedContent = (contentKey, language = 'en') => {
  const content = {
    en: {
      uploadHint: 'Upload a clear image of the affected plant part',
      analyzing: 'Analyzing your image...',
      noDisease: 'Your plant appears to be healthy!',
      treatmentRequired: 'Treatment required',
      followUp: 'Follow up in 7 days',
    },
    hi: {
      uploadHint: 'प्रभावित पौधे के हिस्से की स्पष्ट तस्वीर अपलोड करें',
      analyzing: 'आपकी तस्वीर का विश्लेषण जारी है...',
      noDisease: 'आपका पौधा स्वस्थ दिख रहा है!',
      treatmentRequired: 'उपचार की आवश्यकता है',
      followUp: '7 दिन बाद अनुवर्ती करें',
    },
    es: {
      uploadHint: 'Cargue una imagen clara de la parte de la planta afectada',
      analyzing: 'Analizando su imagen...',
      noDisease: '¡Tu planta parece estar sana!',
      treatmentRequired: 'Se requiere tratamiento',
      followUp: 'Hacer seguimiento en 7 días',
    },
    fr: {
      uploadHint: 'Téléchargez une image claire de la partie de la plante affectée',
      analyzing: 'Analyse de votre image en cours...',
      noDisease: 'Votre plante semble être en bonne santé!',
      treatmentRequired: 'Traitement requis',
      followUp: 'Suivi dans 7 jours',
    },
  };

  return content[language]?.[contentKey] || content.en[contentKey];
};
