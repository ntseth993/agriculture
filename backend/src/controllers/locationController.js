const User = require('../models/User');
const axios = require('axios');

// Find nearby agro-vets and pharmacies
exports.findNearby = async (req, res) => {
  try {
    const { latitude, longitude, radius = 10, type, pharmacyType } = req.query; // radius in km

    if (!latitude || !longitude) {
      return res.status(400).json({ message: 'Latitude and longitude are required' });
    }

    const radiusInMeters = radius * 1000;

    // Query by user role
    let roleQuery;
    let additionalFilter = {};
    
    if (type === 'agro-vet') {
      roleQuery = 'agro-vet';
    } else if (type === 'pharmacy') {
      roleQuery = 'pharmacy';
      // Filter by pharmacy type if specified
      if (pharmacyType === 'animal') {
        additionalFilter = { 'businessDetails.pharmacyType': 'animal' };
      } else if (pharmacyType === 'crop') {
        additionalFilter = { 'businessDetails.pharmacyType': { $ne: 'animal' } };
      }
    } else {
      // If no specific type, return both
      roleQuery = { $in: ['agro-vet', 'pharmacy'] };
    }

    const nearbyUsers = await User.find({
      role: roleQuery,
      ...additionalFilter,
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(longitude), parseFloat(latitude)],
          },
          $maxDistance: radiusInMeters,
        },
      },
    }).select('name businessName businessDetails location phone email profileImage role pharmacyType');

    // Add pharmacy type to response
    const usersWithType = nearbyUsers.map(user => ({
      ...user.toObject(),
      pharmacyType: user.businessDetails?.pharmacyType || 'crop',
    }));

    res.status(200).json({
      success: true,
      count: usersWithType.length,
      users: usersWithType,
    });
  } catch (error) {
    console.error('Find nearby error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get user location
exports.getUserLocation = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user || !user.location) {
      return res.status(404).json({ message: 'Location not found' });
    }

    res.status(200).json({
      success: true,
      location: user.location,
    });
  } catch (error) {
    console.error('Get location error:', error);
    res.status(500).json({ message: error.message });
  }
};

// Update user location
exports.updateLocation = async (req, res) => {
  try {
    const { latitude, longitude } = req.body;

    if (!latitude || !longitude) {
      return res.status(400).json({ message: 'Latitude and longitude are required' });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        location: {
          type: 'Point',
          coordinates: [longitude, latitude],
        },
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      location: user.location,
      message: 'Location updated successfully',
    });
  } catch (error) {
    console.error('Update location error:', error);
    res.status(500).json({ message: error.message });
  }
};
