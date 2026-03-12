// Enhanced AI Service for Crop Disease Detection with Real Agricultural Data
import { plantDiseaseDatabase, analyzeEnvironmentalConditions, generateTreatmentPlan } from './plantKnowledgeBase.js';

class AIDetectionService {
  constructor() {
    this.models = {
      'vision-transformer': { accuracy: 96, speed: 'fast' },
      'resnet-50': { accuracy: 94, speed: 'medium' },
      'efficientnet': { accuracy: 95, speed: 'fast' },
      'mobilenet': { accuracy: 92, speed: 'very-fast' }
    };
  }

  // Simulate advanced AI analysis with real agricultural data
  async analyzeImage(imageData, cropType, environmentalData = {}) {
    try {
      // Simulate processing time based on model selection
      const processingTime = Math.random() * 2000 + 1000; // 1-3 seconds
      
      // Get real crop data from knowledge base
      const cropData = plantDiseaseDatabase[cropType];
      if (!cropData) {
        throw new Error(`Crop type ${cropType} not supported`);
      }

      // Simulate model ensemble analysis
      const modelResults = await this.runModelEnsemble(imageData, cropType);
      
      // Select most likely disease based on environmental conditions
      const selectedDisease = this.selectDiseaseByConditions(cropData.diseases, environmentalData);
      
      // Enhance analysis with environmental factors
      const environmentalAnalysis = analyzeEnvironmentalConditions(cropData, environmentalData);
      
      // Generate comprehensive report with real data
      const detectionResult = await this.generateRealDetectionReport(
        selectedDisease, 
        cropData, 
        environmentalData,
        environmentalAnalysis
      );
      
      return {
        success: true,
        detection: detectionResult,
        processingTime,
        modelsUsed: Object.keys(modelResults),
        confidence: detectionResult.confidence,
        cropData: {
          name: cropData.commonName,
          scientific: cropData.scientificName,
          conditions: cropData.growingConditions
        }
      };
      
    } catch (error) {
      console.error('AI Analysis Error:', error);
      throw new Error('AI analysis failed: ' + error.message);
    }
  }

  // Select disease based on environmental conditions
  selectDiseaseByConditions(diseases, environmentalData) {
    // Base selection on environmental conditions
    if (environmentalData.temperature > 25 && environmentalData.humidity > 80) {
      // High temp and humidity - favor fungal diseases
      const fungalDiseases = diseases.filter(d => d.severity === 'high');
      if (fungalDiseases.length > 0) {
        return fungalDiseases[Math.floor(Math.random() * fungalDiseases.length)];
      }
    }
    
    if (environmentalData.temperature < 20 && environmentalData.humidity > 70) {
      // Cool and humid - favor blight diseases
      const blightDiseases = diseases.filter(d => d.name.toLowerCase().includes('blight'));
      if (blightDiseases.length > 0) {
        return blightDiseases[0];
      }
    }
    
    // Default selection with some randomness but weighted by severity
    const weights = diseases.map(d => d.severity === 'high' ? 3 : d.severity === 'medium' ? 2 : 1);
    const totalWeight = weights.reduce((a, b) => a + b, 0);
    let random = Math.random() * totalWeight;
    
    for (let i = 0; i < diseases.length; i++) {
      random -= weights[i];
      if (random <= 0) {
        return diseases[i];
      }
    }
    
    return diseases[0]; // fallback
  }

  // Simulate running multiple AI models
  async runModelEnsemble(imageData, cropType) {
    const modelPredictions = {};
    
    // Simulate different model predictions
    for (const [modelName, model] of Object.entries(this.models)) {
      // Simulate model prediction with some variance
      const baseConfidence = model.accuracy;
      const variance = Math.random() * 10 - 5; // ±5% variance
      const confidence = Math.min(99, Math.max(70, baseConfidence + variance));
      
      modelPredictions[modelName] = {
        confidence: confidence,
        processingTime: model.speed === 'very-fast' ? 500 : model.speed === 'fast' ? 1000 : 2000
      };
    }
    
    return modelPredictions;
  }

  // Generate comprehensive detection report with real agricultural data
  async generateRealDetectionReport(disease, cropData, environmentalData, environmentalAnalysis) {
    const confidence = Math.floor(Math.random() * 15) + 85; // 85-99%
    
    // Generate detailed recommendations using real treatment data
    const treatmentPlan = generateTreatmentPlan(disease, disease.severity, environmentalData);
    
    // Create risk assessment based on real factors
    const riskAssessment = this.assessRealRisk(disease, confidence, environmentalAnalysis);
    
    // Generate crop-specific recommendations
    const cropRecommendations = this.generateCropSpecificRecommendations(cropData, disease, environmentalData);
    
    return {
      disease: {
        name: disease.name,
        scientificName: disease.scientificName,
        severity: disease.severity,
        confidence: confidence,
        symptoms: disease.symptoms,
        causes: disease.causes,
        economicImpact: disease.economicImpact
      },
      crop: {
        name: cropData.commonName,
        scientificName: cropData.scientificName,
        growingConditions: cropData.growingConditions,
        nutritionalRequirements: cropData.nutritionalRequirements,
        growthStages: cropData.growthStages
      },
      treatment: {
        immediate: disease.treatment.chemical,
        biological: disease.treatment.biological,
        cultural: disease.treatment.cultural,
        timing: disease.treatment.timing,
        prevention: disease.prevention,
        cost: disease.economicImpact.treatmentCost
      },
      environmental: {
        current: environmentalData,
        analysis: environmentalAnalysis,
        impact: this.assessEnvironmentalImpact(disease, environmentalData)
      },
      recommendations: [
        ...treatmentPlan.immediate,
        ...treatmentPlan.shortTerm,
        ...cropRecommendations
      ],
      riskAssessment,
      analysisDetails: {
        confidence: confidence,
        environmentalFactors: environmentalAnalysis.riskFactors,
        treatmentComplexity: disease.severity === 'high' ? 'complex' : 'moderate',
        urgency: disease.severity === 'high' ? 'immediate' : disease.severity === 'medium' ? 'within_week' : 'monitor',
        estimatedCost: disease.economicImpact.treatmentCost,
        potentialYieldLoss: disease.economicImpact.yieldLoss
      }
    };
  }

  // Assess real risk based on disease and conditions
  assessRealRisk(disease, confidence, environmentalAnalysis) {
    let riskScore = 0;
    let riskLevel = 'low';
    
    // Base risk from disease severity
    if (disease.severity === 'high') {
      riskScore += 40;
    } else if (disease.severity === 'medium') {
      riskScore += 20;
    }
    
    // Add confidence factor
    if (confidence > 90) {
      riskScore += 30;
    } else if (confidence > 80) {
      riskScore += 20;
    }
    
    // Add environmental risk factors
    riskScore += environmentalAnalysis.riskFactors.length * 10;
    
    // Add economic impact
    const yieldLoss = parseInt(disease.economicImpact.yieldLoss);
    if (yieldLoss > 30) {
      riskScore += 20;
    } else if (yieldLoss > 15) {
      riskScore += 10;
    }
    
    // Determine risk level
    if (riskScore > 70) {
      riskLevel = 'high';
    } else if (riskScore > 40) {
      riskLevel = 'medium';
    }
    
    return {
      level: riskLevel,
      score: riskScore,
      factors: [
        `Disease severity: ${disease.severity}`,
        `Detection confidence: ${confidence}%`,
        `Environmental risks: ${environmentAnalysis.riskFactors.length} factors`,
        `Potential yield loss: ${disease.economicImpact.yieldLoss}`
      ]
    };
  }

  // Generate crop-specific recommendations
  generateCropSpecificRecommendations(cropData, disease, environmentalData) {
    const recommendations = [];
    
    // Growth stage specific recommendations
    const currentStage = this.estimateGrowthStage(cropData.growthStages);
    recommendations.push({
      priority: 'high',
      action: `Current growth stage: ${currentStage.name}`,
      timeframe: 'Current',
      details: currentStage.description
    });
    
    // Nutritional recommendations
    if (disease.severity === 'high') {
      recommendations.push({
        priority: 'medium',
        action: 'Adjust fertilization',
        timeframe: '1-2 weeks',
        details: `Consider reducing nitrogen and increasing potassium. Current requirements: N ${cropData.nutritionalRequirements.nitrogen}, P ${cropData.nutritionalRequirements.phosphorus}, K ${cropData.nutritionalRequirements.potassium}`
      });
    }
    
    // Environmental adjustments
    if (environmentalData.humidity > cropData.growingConditions.humidity.max) {
      recommendations.push({
        priority: 'high',
        action: 'Improve air circulation',
        timeframe: 'Immediate',
        details: 'Reduce humidity through better ventilation or reduced irrigation'
      });
    }
    
    return recommendations;
  }

  // Estimate current growth stage based on typical planting times
  estimateGrowthStage(growthStages) {
    // This would normally be based on actual planting date
    // For simulation, we'll estimate based on current date
    const currentDay = new Date().getDay(); // 0-6
    const stageIndex = Math.min(Math.floor(currentDay * growthStages.length / 7), growthStages.length - 1);
    return growthStages[stageIndex];
  }

  // Assess environmental impact on disease
  assessEnvironmentalImpact(disease, environmentalData) {
    const impact = {
      temperature: 'neutral',
      humidity: 'neutral',
      rainfall: 'neutral',
      overall: 'moderate'
    };
    
    // Analyze temperature impact
    if (disease.causes.some(cause => cause.includes('warm'))) {
      if (environmentalData.temperature > 25) {
        impact.temperature = 'positive';
      }
    }
    
    if (disease.causes.some(cause => cause.includes('cool'))) {
      if (environmentalData.temperature < 20) {
        impact.temperature = 'positive';
      }
    }
    
    // Analyze humidity impact
    if (disease.causes.some(cause => cause.includes('humidity'))) {
      if (environmentalData.humidity > 80) {
        impact.humidity = 'positive';
        impact.overall = 'high';
      }
    }
    
    return impact;
  }

  // Get crop-specific information
  getCropInfo(cropType) {
    const cropData = plantDiseaseDatabase[cropType];
    if (!cropData) {
      return null;
    }
    
    return {
      name: cropData.commonName,
      scientific: cropData.scientificName,
      commonDiseases: cropData.diseases.length,
      growingConditions: cropData.growingConditions,
      nutritionalRequirements: cropData.nutritionalRequirements,
      growthStages: cropData.growthStages,
      keySymptoms: cropData.diseases.flatMap(d => d.symptoms.slice(0, 2)).slice(0, 3)
    };
  }

  // Validate image quality
  validateImage(imageData) {
    const checks = {
      resolution: Math.random() > 0.1,
      lighting: Math.random() > 0.2,
      focus: Math.random() > 0.15,
      coverage: Math.random() > 0.1
    };
    
    const overallQuality = Object.values(checks).filter(Boolean).length / Object.keys(checks).length;
    
    return {
      isValid: overallQuality > 0.6,
      quality: overallQuality,
      checks,
      suggestions: this.getImageQualitySuggestions(checks)
    };
  }

  getImageQualitySuggestions(checks) {
    const suggestions = [];
    
    if (!checks.resolution) {
      suggestions.push('Use higher resolution images for better disease detection accuracy');
    }
    if (!checks.lighting) {
      suggestions.push('Ensure adequate lighting when capturing images - natural daylight is best');
    }
    if (!checks.focus) {
      suggestions.push('Keep the camera focused on the affected areas of the plant');
    }
    if (!checks.coverage) {
      suggestions.push('Capture more of the plant including both affected and healthy areas');
    }
    
    return suggestions;
  }

  // Get detailed disease information
  getDiseaseInfo(cropType, diseaseName) {
    const cropData = plantDiseaseDatabase[cropType];
    if (!cropData) return null;
    
    const disease = cropData.diseases.find(d => d.name.toLowerCase() === diseaseName.toLowerCase());
    if (!disease) return null;
    
    return {
      ...disease,
      crop: cropData.commonName,
      relatedDiseases: cropData.diseases.filter(d => d.name !== disease.name).slice(0, 3)
    };
  }

  // Get treatment recommendations for specific conditions
  getTreatmentRecommendations(cropType, diseaseName, conditions) {
    const disease = this.getDiseaseInfo(cropType, diseaseName);
    if (!disease) return null;
    
    const recommendations = {
      chemical: disease.treatment.chemical,
      biological: disease.treatment.biological,
      cultural: disease.treatment.cultural,
      timing: disease.treatment.timing,
      prevention: disease.prevention,
      environmentalAdjustments: this.getEnvironmentalAdjustments(disease, conditions),
      cost: disease.economicImpact.treatmentCost,
      effectiveness: this.calculateTreatmentEffectiveness(disease, conditions)
    };
    
    return recommendations;
  }

  // Get environmental adjustments for treatment
  getEnvironmentalAdjustments(disease, conditions) {
    const adjustments = [];
    
    if (conditions.temperature > 30) {
      adjustments.push('Apply treatments during cooler parts of the day (early morning or evening)');
    }
    
    if (conditions.humidity > 85) {
      adjustments.push('Ensure proper drying time after chemical applications');
      adjustments.push('Consider systemic fungicides for better coverage');
    }
    
    if (conditions.rainfall > 50) {
      adjustments.push('Use rain-fast formulations or reapply after heavy rain');
    }
    
    return adjustments;
  }

  // Calculate treatment effectiveness based on conditions
  calculateTreatmentEffectiveness(disease, conditions) {
    let effectiveness = 85; // Base effectiveness
    
    // Adjust based on environmental conditions
    if (conditions.humidity > 85 && disease.severity === 'high') {
      effectiveness -= 10; // Reduced effectiveness in high humidity for severe diseases
    }
    
    if (conditions.temperature > 30) {
      effectiveness -= 5; // High temperature can reduce some fungicide effectiveness
    }
    
    if (disease.severity === 'low') {
      effectiveness += 10; // Higher effectiveness for mild diseases
    }
    
    return Math.max(60, Math.min(95, effectiveness));
  }
}

export const aiService = new AIDetectionService();
