import axios from 'axios';

// Configure API base URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Create axios instance with base URL
const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

export const cropService = {
  getAllCrops: async () => {
    const response = await apiClient.get('/api/crops');
    return response.data;
  },

  getCropDetails: async (cropId) => {
    const response = await apiClient.get(`/api/crops/${cropId}`);
    return response.data;
  },

  verifyCrop: async (imageData, cropId) => {
    const formData = new FormData();
    
    if (imageData instanceof File) {
      formData.append('image', imageData);
    } else if (typeof imageData === 'string' && imageData.startsWith('data:image')) {
      const blob = await fetch(imageData).then(res => res.blob());
      formData.append('image', blob, 'crop-image.jpg');
    } else {
      formData.append('imageUrl', imageData);
    }
    
    if (cropId) {
      formData.append('cropId', cropId);
    }

    const response = await apiClient.post('/api/crops/verify', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  verifyAndDetect: async (imageData, cropId, latitude, longitude) => {
    const formData = new FormData();
    
    if (imageData instanceof File) {
      formData.append('image', imageData);
    } else if (typeof imageData === 'string' && imageData.startsWith('data:image')) {
      const blob = await fetch(imageData).then(res => res.blob());
      formData.append('image', blob, 'crop-image.jpg');
    } else {
      formData.append('imageUrl', imageData);
    }
    
    formData.append('cropId', cropId);
    formData.append('latitude', latitude);
    formData.append('longitude', longitude);

      const response = await apiClient.post('/api/crops/verify-and-detect', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};

export const diseaseService = {
  detectDisease: async (imageData, cropId, latitude, longitude, language = 'en') => {
    const formData = new FormData();
    
    // Handle both File objects and base64 strings
    if (imageData instanceof File) {
      formData.append('image', imageData);
    } else if (typeof imageData === 'string' && imageData.startsWith('data:image')) {
      // Convert base64 to blob
      const blob = await fetch(imageData).then(res => res.blob());
      formData.append('image', blob, 'crop-image.jpg');
    } else {
      // Assume it's a URL
      formData.append('imageUrl', imageData);
    }
    
    formData.append('cropId', cropId);
    formData.append('latitude', latitude || 0);
    formData.append('longitude', longitude || 0);
    formData.append('language', language);

    try {
      const response = await apiClient.post('/api/diseases/detect', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Disease detection error:', error);
      throw error.response?.data || error;
    }
  },

  getDetectionHistory: async (language = 'en') => {
    try {
      const response = await apiClient.get('/api/diseases/history', {
        params: { language },
      });
      return response.data;
    } catch (error) {
      console.error('History fetch error:', error);
      throw error.response?.data || error;
    }
  },

  updateFeedback: async (detectionId, feedback) => {
    try {
      const response = await apiClient.put(`/api/diseases/${detectionId}/feedback`, feedback);
      return response.data;
    } catch (error) {
      console.error('Feedback update error:', error);
      throw error.response?.data || error;
    }
  },
};

export const treatmentService = {
  getTreatments: async (filters = {}) => {
    const response = await apiClient.get('/api/treatments', { params: filters });
    return response.data;
  },

  getTreatmentsForDisease: async (diseaseId, type) => {
    const response = await apiClient.get(`/api/treatments/disease/${diseaseId}`, {
      params: { type },
    });
    return response.data;
  },

  addReview: async (treatmentId, review) => {
    const response = await apiClient.post(`/api/treatments/${treatmentId}/review`, review);
    return response.data;
  },
};

export const locationService = {
  findNearby: async (latitude, longitude, type, radius = 10) => {
    const response = await apiClient.get('/api/location/nearby', {
      params: { latitude, longitude, type, radius },
    });
    return response.data;
  },

  updateLocation: async (latitude, longitude) => {
    const response = await apiClient.put('/api/location/update-location', {
      latitude,
      longitude,
    });
    return response.data;
  },

  getMyLocation: async () => {
    const response = await apiClient.get('/api/location/my-location');
    return response.data;
  },
};

export const alertService = {
  getAlerts: async (filters = {}) => {
    const response = await apiClient.get('/api/alerts', { params: filters });
    return response.data;
  },

  markAsRead: async (alertId) => {
    const response = await apiClient.put(`/api/alerts/${alertId}/read`);
    return response.data;
  },

  createAlert: async (alertData) => {
    const response = await apiClient.post('/api/alerts', alertData);
    return response.data;
  },
};
