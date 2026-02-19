const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./src/models/User');

const testData = [
  {
    name: 'Green Valley Agro-Vet',
    email: 'greenvalley@agrovet.com',
    phone: '9876543210',
    password: 'password123',
    role: 'agro-vet',
    businessName: 'Green Valley Agro-Vet',
    businessDetails: {
      address: '123 Farm Road, Near Market',
      city: 'Bangalore',
      state: 'Karnataka',
      pinCode: '560001',
      specialization: 'Seeds, Fertilizers, Equipment',
      operatingHours: '6AM-8PM',
    },
    location: {
      type: 'Point',
      coordinates: [77.5946, 12.9716], // Bangalore coordinates
    },
  },
  {
    name: 'Crop Care Pharmacy',
    email: 'cropcare@pharmacy.com',
    phone: '9876543211',
    password: 'password123',
    role: 'pharmacy',
    businessName: 'Crop Care Pharmacy',
    pharmacyType: 'crop',
    businessDetails: {
      address: '456 Green Lane, Shopping Complex',
      city: 'Bangalore',
      state: 'Karnataka',
      pinCode: '560002',
      specialization: 'Crop Protection Chemicals, Pesticides',
      operatingHours: '7AM-9PM',
    },
    location: {
      type: 'Point',
      coordinates: [77.6245, 12.9352], // Bangalore area
    },
  },
  {
    name: 'Pet & Livestock Care',
    email: 'petcare@pharmacy.com',
    phone: '9876543212',
    password: 'password123',
    role: 'pharmacy',
    businessName: 'Pet & Livestock Care',
    pharmacyType: 'animal',
    businessDetails: {
      address: '789 Animal Care Street',
      city: 'Bangalore',
      state: 'Karnataka',
      pinCode: '560003',
      specialization: 'Veterinary Medicines, Animal Feed',
      operatingHours: '8AM-7PM',
    },
    location: {
      type: 'Point',
      coordinates: [77.5746, 12.9891], // Bangalore area
    },
  },
  {
    name: 'Sunrise Agro Solutions',
    email: 'sunrise@agrovet.com',
    phone: '9876543213',
    password: 'password123',
    role: 'agro-vet',
    businessName: 'Sunrise Agro Solutions',
    businessDetails: {
      address: '321 Agri Hub, Industrial Area',
      city: 'Bangalore',
      state: 'Karnataka',
      pinCode: '560004',
      specialization: 'Organic Seeds, Biofertilizers',
      operatingHours: '6AM-6PM',
    },
    location: {
      type: 'Point',
      coordinates: [77.6340, 12.9789], // Bangalore area
    },
  },
  {
    name: 'Organic Livestock Pharmacy',
    email: 'organic.livestock@pharmacy.com',
    phone: '9876543214',
    password: 'password123',
    role: 'pharmacy',
    businessName: 'Organic Livestock Pharmacy',
    pharmacyType: 'animal',
    businessDetails: {
      address: '654 Natural Care Lane',
      city: 'Bangalore',
      state: 'Karnataka',
      pinCode: '560005',
      specialization: 'Organic Animal Products, Supplements',
      operatingHours: '7AM-6PM',
    },
    location: {
      type: 'Point',
      coordinates: [77.5540, 12.9500], // Bangalore area
    },
  },
];

async function seedData() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/agriculture', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');

    // Clear existing test data
    await User.deleteMany({ email: { $in: testData.map(d => d.email) } });

    // Insert test data
    const result = await User.insertMany(testData);
    console.log(`✅ ${result.length} test records inserted successfully!`);

    // Show created records
    result.forEach(user => {
      console.log(`  - ${user.businessName || user.name} (${user.role})`);
      console.log(`    Location: [${user.location.coordinates}]`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
}

seedData();
