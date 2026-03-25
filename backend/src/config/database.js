const mongoose = require('mongoose');

const connectDB = async () => {
  if (!process.env.MONGODB_URI) {
    console.warn('WARNING: MONGODB_URI is not set. Database features will be unavailable.');
    console.warn('Add your MONGODB_URI to the Secrets panel to enable database connectivity.');
    return null;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    console.warn('Server will continue running without database connectivity.');
    return null;
  }
};

module.exports = connectDB;
