/**
 * Test script to verify location features
 * This registers sample pharmacy accounts and tests geospatial queries
 */

const axios = require('axios');

const API_BASE = 'http://localhost:5000/api';

const testData = {
  // Sample crop pharmacy
  cropPharmacy: {
    name: 'Green Crops Pharmacy',
    email: 'greencrop@pharmacy.com',
    phone: '9876543210',
    password: 'testpass123',
    role: 'pharmacy',
    businessName: 'Green Crops Pharmacy',
    businessDetails: {
      address: 'Agricultural Market, Delhi',
      specialization: 'Crop fertilizers and pesticides',
      operatingHours: '9AM - 6PM',
      pharmacyType: 'crop',
    },
    // Delhi coordinates - for testing
    location: {
      type: 'Point',
      coordinates: [77.2090, 28.6139],
    },
  },

  // Sample animal pharmacy
  animalPharmacy: {
    name: 'Vet Care Pharmacy',
    email: 'vetcare@pharmacy.com',
    phone: '9876543211',
    password: 'testpass123',
    role: 'pharmacy',
    businessName: 'Vet Care Pharmacy',
    businessDetails: {
      address: 'Veterinary Market, Delhi',
      specialization: 'Animal medicines and vaccines',
      operatingHours: '8AM - 8PM',
      pharmacyType: 'animal',
    },
    location: {
      type: 'Point',
      coordinates: [77.2190, 28.6239],
    },
  },

  // Sample agro-vet
  agroVet: {
    name: 'Farm Supply Store',
    email: 'farmsupply@agrovet.com',
    phone: '9876543212',
    password: 'testpass123',
    role: 'agro-vet',
    businessName: 'Farm Supply Store',
    businessDetails: {
      address: 'Market Area, Delhi',
      specialization: 'Seeds, tools, and equipment',
      operatingHours: '7AM - 9PM',
    },
    location: {
      type: 'Point',
      coordinates: [77.1900, 28.6039],
    },
  },

  // Test farmer at Delhi center (for geospatial queries)
  farmer: {
    name: 'Test Farmer',
    email: 'farmer@test.com',
    phone: '9999999999',
    password: 'testpass123',
    role: 'farmer',
    location: {
      type: 'Point',
      coordinates: [77.2100, 28.6100],
    },
  },
};

async function test() {
  try {
    console.log('🚀 Starting Location Feature Tests...\n');

    // Test 1: Register pharmacy accounts
    console.log('📝 Test 1: Registering pharmacy accounts...');
    
    const cropPharmRes = await axios.post(`${API_BASE}/auth/register`, testData.cropPharmacy);
    console.log('✅ Crop Pharmacy registered:', cropPharmRes.data.user.email);
    const cropPharmToken = cropPharmRes.data.token;

    const animalPharmRes = await axios.post(`${API_BASE}/auth/register`, testData.animalPharmacy);
    console.log('✅ Animal Pharmacy registered:', animalPharmRes.data.user.email);
    const animalPharmToken = animalPharmRes.data.token;

    const agroVetRes = await axios.post(`${API_BASE}/auth/register`, testData.agroVet);
    console.log('✅ Agro-Vet registered:', agroVetRes.data.user.email);
    const agroVetToken = agroVetRes.data.token;

    const farmerRes = await axios.post(`${API_BASE}/auth/register`, testData.farmer);
    console.log('✅ Farmer registered:', farmerRes.data.user.email);
    const farmerToken = farmerRes.data.token;

    // Test 2: Update locations for pharmacies
    console.log('\n📍 Test 2: Updating pharmacy locations...');

    await axios.put(
      `${API_BASE}/location/update-location`,
      {
        latitude: testData.cropPharmacy.location.coordinates[1],
        longitude: testData.cropPharmacy.location.coordinates[0],
      },
      { headers: { Authorization: `Bearer ${cropPharmToken}` } }
    );
    console.log('✅ Crop Pharmacy location updated');

    await axios.put(
      `${API_BASE}/location/update-location`,
      {
        latitude: testData.animalPharmacy.location.coordinates[1],
        longitude: testData.animalPharmacy.location.coordinates[0],
      },
      { headers: { Authorization: `Bearer ${animalPharmToken}` } }
    );
    console.log('✅ Animal Pharmacy location updated');

    await axios.put(
      `${API_BASE}/location/update-location`,
      {
        latitude: testData.agroVet.location.coordinates[1],
        longitude: testData.agroVet.location.coordinates[0],
      },
      { headers: { Authorization: `Bearer ${agroVetToken}` } }
    );
    console.log('✅ Agro-Vet location updated');

    // Test 3: Find nearby services (from farmer's location)
    console.log('\n🔍 Test 3: Finding nearby services...');

    const farmerLat = testData.farmer.location.coordinates[1];
    const farmerLng = testData.farmer.location.coordinates[0];

    const agrovetsRes = await axios.get(`${API_BASE}/location/nearby`, {
      params: {
        latitude: farmerLat,
        longitude: farmerLng,
        type: 'agro-vet',
        radius: 10,
      },
      headers: { Authorization: `Bearer ${farmerToken}` },
    });

    console.log(`✅ Found ${agrovetsRes.data.users.length} agro-vets nearby`);
    if (agrovetsRes.data.users.length > 0) {
      console.log(`   - ${agrovetsRes.data.users[0].businessName}`);
    }

    // Test 4: Find pharmacies and check pharmacy type filtering
    console.log('\n💊 Test 4: Testing pharmacy type filtering...');

    const pharmaciesRes = await axios.get(`${API_BASE}/location/nearby`, {
      params: {
        latitude: farmerLat,
        longitude: farmerLng,
        type: 'pharmacy',
        radius: 10,
      },
      headers: { Authorization: `Bearer ${farmerToken}` },
    });

    console.log(`✅ Found ${pharmaciesRes.data.users.length} pharmacies nearby`);
    
    const cropPharmacies = pharmaciesRes.data.users.filter(p => p.pharmacyType !== 'animal');
    const animalPharmacies = pharmaciesRes.data.users.filter(p => p.pharmacyType === 'animal');
    
    console.log(`   - ${cropPharmacies.length} crop pharmacies`);
    if (cropPharmacies.length > 0) {
      console.log(`     • ${cropPharmacies[0].businessName}`);
    }
    
    console.log(`   - ${animalPharmacies.length} animal pharmacies`);
    if (animalPharmacies.length > 0) {
      console.log(`     • ${animalPharmacies[0].businessName}`);
    }

    // Test 5: Verify location coordinates are properly stored
    console.log('\n📐 Test 5: Verifying location coordinates...');
    const userLocationRes = await axios.get(`${API_BASE}/location/my-location`, {
      headers: { Authorization: `Bearer ${cropPharmToken}` },
    });
    
    console.log('✅ Crop Pharmacy location retrieved:');
    console.log(`   - Latitude: ${userLocationRes.data.location.coordinates[1]}`);
    console.log(`   - Longitude: ${userLocationRes.data.location.coordinates[0]}`);

    console.log('\n✨ All tests completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
    process.exit(1);
  }
}

test();
