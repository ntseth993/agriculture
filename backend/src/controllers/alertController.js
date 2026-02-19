const Alert = require('../models/Alert');

// Lazy-load Twilio only when needed
let client = null;

const getTwilioClient = () => {
  if (!client && process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
    try {
      const twilio = require('twilio');
      client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    } catch (error) {
      console.warn('Twilio not available:', error.message);
    }
  }
  return client;
};

// Create alert
exports.createAlert = async (req, res) => {
  try {
    const { recipientId, type, title, message, severity, cropId, data, sendSMS } = req.body;

    const alert = new Alert({
      recipient: recipientId,
      type,
      title,
      message,
      severity,
      crop: cropId,
      data,
    });

    await alert.save();

    // Send SMS if requested and Twilio is configured
    if (sendSMS) {
      const twilioClient = getTwilioClient();
      if (twilioClient) {
        const user = await require('../models/User').findById(recipientId);
        if (user && user.phone) {
          try {
            await twilioClient.messages.create({
              body: `${title}: ${message}`,
              from: process.env.TWILIO_PHONE_NUMBER,
              to: user.phone,
            });

            alert.smsSent = true;
            alert.smsTimestamp = new Date();
            await alert.save();
          } catch (smsError) {
            console.error('SMS sending failed:', smsError.message);
          }
        }
      }
    }

    res.status(201).json({
      success: true,
      alert,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get alerts for user
exports.getUserAlerts = async (req, res) => {
  try {
    const { type, read } = req.query;

    const query = { recipient: req.user.id };
    if (type) query.type = type;
    if (read !== undefined) query.read = read === 'true';

    const alerts = await Alert.find(query)
      .populate('crop')
      .sort({ createdAt: -1 })
      .limit(50);

    res.status(200).json({
      success: true,
      count: alerts.length,
      alerts,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Mark alert as read
exports.markAsRead = async (req, res) => {
  try {
    const { alertId } = req.params;

    const alert = await Alert.findByIdAndUpdate(
      alertId,
      {
        read: true,
        readAt: new Date(),
      },
      { new: true }
    );

    if (!alert) {
      return res.status(404).json({ message: 'Alert not found' });
    }

    res.status(200).json({
      success: true,
      alert,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Send weather alert (batch operation)
exports.sendWeatherAlert = async (req, res) => {
  try {
    const { affectedAreas, weatherCondition, severity } = req.body;

    const User = require('../models/User');
    const affectedUsers = await User.find({
      'location.coordinates': {
        $geoWithin: {
          $geometry: affectedAreas,
        },
      },
    });

    const twilioClient = getTwilioClient();

    const alertPromises = affectedUsers.map(async (user) => {
      const alert = new Alert({
        recipient: user._id,
        type: 'weather',
        title: 'Weather Alert',
        message: `${weatherCondition} expected in your area`,
        severity,
        data: { weatherCondition },
      });

      await alert.save();

      if (twilioClient) {
        try {
          await twilioClient.messages.create({
            body: `WEATHER ALERT: ${weatherCondition} expected in your area. Please take necessary precautions.`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: user.phone,
          });

          alert.smsSent = true;
          alert.smsTimestamp = new Date();
          await alert.save();
        } catch (smsError) {
          console.error(`SMS failed for ${user.phone}:`, smsError.message);
        }
      }
    });

    await Promise.all(alertPromises);

    res.status(201).json({
      success: true,
      message: `Weather alert sent to ${affectedUsers.length} users`,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
