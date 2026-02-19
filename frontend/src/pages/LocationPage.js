import React, { useState, useEffect, useCallback } from 'react';
import { locationService } from '../services/api';
import { MapComponent } from '../components/MapComponent';
import toast from 'react-hot-toast';

export const LocationPage = () => {
  const [agrovets, setAgrovets] = useState([]);
  const [cropPharmacies, setCropPharmacies] = useState([]);
  const [animalPharmacies, setAnimalPharmacies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [suggestedLocation, setSuggestedLocation] = useState(null);
  const [radius, setRadius] = useState(10);
  const [showSuggestionMode, setShowSuggestionMode] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchNearby = useCallback(async (lat, lng) => {
    try {
      setLoading(true);

      const agrovetsData = await locationService.findNearby(lat, lng, 'agro-vet', radius);
      setAgrovets(agrovetsData.users || []);

      const pharmaciesData = await locationService.findNearby(lat, lng, 'pharmacy', radius);
      const pharmacies = pharmaciesData.users || [];

      const cropPharm = pharmacies.filter(p => p.pharmacyType !== 'animal');
      const animalPharm = pharmacies.filter(p => p.pharmacyType === 'animal');

      setCropPharmacies(cropPharm);
      setAnimalPharmacies(animalPharm);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [radius]);

  const getUserLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
          fetchNearby(latitude, longitude);
        },
        (error) => {
          console.warn('Geolocation error:', error);
          const defaultLocation = { latitude: 12.9352, longitude: 77.6245 };
          setUserLocation(defaultLocation);
          fetchNearby(defaultLocation.latitude, defaultLocation.longitude);
        }
      );
    } else {
      const defaultLocation = { latitude: 12.9352, longitude: 77.6245 };
      setUserLocation(defaultLocation);
      fetchNearby(defaultLocation.latitude, defaultLocation.longitude);
    }
  }, [fetchNearby]);

  useEffect(() => {
    getUserLocation();
  }, [getUserLocation]);

  const handleMapClick = (lat, lng) => {
    setSuggestedLocation({ latitude: lat, longitude: lng });
    toast.success('Location marked! Review below.');
  };

  const confirmSuggestedLocation = async () => {
    if (!suggestedLocation) {
      toast.error('Please select a location on the map');
      return;
    }

    try {
      setLoading(true);
      await locationService.updateLocation(suggestedLocation.latitude, suggestedLocation.longitude);
      setUserLocation(suggestedLocation);
      setSuggestedLocation(null);
      setShowSuggestionMode(false);
      fetchNearby(suggestedLocation.latitude, suggestedLocation.longitude);
      toast.success('Location confirmed!');
    } catch (error) {
      toast.error('Error updating location');
    } finally {
      setLoading(false);
    }
  };

  const getDirections = (location) => {
    if (!userLocation) {
      toast.error('Location not available');
      return;
    }

    // Open Google Maps in new tab
    const url = `https://www.google.com/maps/dir/${userLocation.latitude},${userLocation.longitude}/${location.location.coordinates[1]},${location.location.coordinates[0]}`;
    window.open(url, '_blank');
    toast.success('Opening directions...');
  };

  const allLocations = [...agrovets, ...cropPharmacies, ...animalPharmacies];

  const filteredLocations = allLocations.filter(loc => {
    const matchesTab =
      activeTab === 'all' ||
      (activeTab === 'agrovets' && loc.role === 'agro-vet') ||
      (activeTab === 'crop' && loc.role === 'pharmacy' && loc.pharmacyType !== 'animal') ||
      (activeTab === 'animal' && loc.role === 'pharmacy' && loc.pharmacyType === 'animal');

    const matchesSearch =
      !searchQuery ||
      (loc.businessName && loc.businessName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (loc.businessDetails?.address && loc.businessDetails.address.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (loc.businessDetails?.specialization && loc.businessDetails.specialization.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesTab && matchesSearch;
  });

  const mapCenter = suggestedLocation || userLocation || [12.9352, 77.6245];
  const center = Array.isArray(mapCenter) ? mapCenter : [mapCenter.latitude, mapCenter.longitude];

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundColor: '#fff' }}>
      {/* Left Sidebar */}
      <div
        style={{
          width: '380px',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#fff',
          borderRight: '1px solid #e0e0e0',
          overflowY: 'auto',
        }}
      >
        {/* Search Box */}
        <div style={{ padding: '15px', backgroundColor: '#f8f9fa', borderBottom: '1px solid #e0e0e0' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#fff',
              border: '1px solid #ddd',
              borderRadius: '24px',
              padding: '10px 15px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }}
          >
            <span style={{ fontSize: '18px', marginRight: '10px' }}>🔍</span>
            <input
              type="text"
              placeholder="Search locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                fontSize: '14px',
                fontFamily: 'system-ui, sans-serif',
              }}
            />
          </div>
        </div>

        {/* Location Info */}
        {userLocation && (
          <div style={{ padding: '15px', backgroundColor: '#f0f8ff', borderBottom: '1px solid #e0e0e0' }}>
            <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>📍 Your Location</div>
            <div style={{ fontSize: '14px', fontWeight: '500', marginBottom: '10px' }}>
              ({userLocation.latitude.toFixed(4)}, {userLocation.longitude.toFixed(4)})
            </div>
            
            {/* Radius Slider */}
            <div style={{ marginBottom: '12px' }}>
              <label style={{ fontSize: '12px', color: '#666', display: 'block', marginBottom: '6px' }}>
                Search Radius: {radius} km
              </label>
              <input
                type="range"
                min="1"
                max="50"
                value={radius}
                onChange={(e) => setRadius(parseInt(e.target.value))}
                style={{
                  width: '100%',
                  cursor: 'pointer',
                }}
              />
            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={getUserLocation}
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  backgroundColor: '#4F46E5',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: '500',
                }}
              >
                📍 My Location
              </button>
              <button
                onClick={() => setShowSuggestionMode(!showSuggestionMode)}
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  backgroundColor: showSuggestionMode ? '#EF4444' : '#F59E0B',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: '500',
                }}
              >
                {showSuggestionMode ? '❌ Cancel' : '📌 Pick Location'}
              </button>
            </div>

            {suggestedLocation && (
              <div style={{ marginTop: '12px' }}>
                <button
                  onClick={confirmSuggestedLocation}
                  style={{
                    width: '100%',
                    padding: '10px',
                    backgroundColor: '#10B981',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: '500',
                  }}
                >
                  ✓ Confirm Location
                </button>
              </div>
            )}
          </div>
        )}

        {/* Filter Tabs */}
        <div
          style={{
            display: 'flex',
            gap: '0',
            padding: '0',
            borderBottom: '1px solid #e0e0e0',
            backgroundColor: '#fff',
          }}
        >
          {[
            { key: 'all', label: `All (${allLocations.length})`, icon: '📍' },
            { key: 'agrovets', label: `Agro-Vet (${agrovets.length})`, icon: '🏪' },
            { key: 'crop', label: `Crop (${cropPharmacies.length})`, icon: '💊' },
            { key: 'animal', label: `Animal (${animalPharmacies.length})`, icon: '🐾' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                flex: 1,
                padding: '12px 8px',
                border: 'none',
                backgroundColor: activeTab === tab.key ? '#4F46E5' : '#fff',
                color: activeTab === tab.key ? '#fff' : '#666',
                cursor: 'pointer',
                fontSize: '11px',
                fontWeight: '500',
                borderBottom: activeTab === tab.key ? '3px solid #4F46E5' : 'none',
              }}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Locations List */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {loading ? (
            <div style={{ padding: '20px', textAlign: 'center', color: '#999' }}>
              ⏳ Loading locations...
            </div>
          ) : filteredLocations.length === 0 ? (
            <div style={{ padding: '20px', textAlign: 'center', color: '#999' }}>
              No locations found
            </div>
          ) : (
            filteredLocations.map((location, idx) => (
              <div
                key={idx}
                style={{
                  padding: '12px 15px',
                  borderBottom: '1px solid #e8e8e8',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f5f5f5')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#fff')}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <div style={{ fontSize: '20px', marginTop: '2px' }}>
                    {location.role === 'agro-vet'
                      ? '🏪'
                      : location.pharmacyType === 'animal'
                      ? '🐾'
                      : '💊'}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontSize: '14px',
                        fontWeight: '500',
                        color: '#1a1a1a',
                        marginBottom: '4px',
                      }}
                    >
                      {location.businessName || location.name}
                    </div>
                    <div
                      style={{
                        fontSize: '12px',
                        color: '#666',
                        marginBottom: '3px',
                      }}
                    >
                      {location.businessDetails?.address}
                    </div>
                    <div
                      style={{
                        fontSize: '12px',
                        color: '#666',
                        marginBottom: '3px',
                      }}
                    >
                      📞 {location.phone}
                    </div>
                    {location.businessDetails?.specialization && (
                      <div
                        style={{
                          fontSize: '11px',
                          color: '#888',
                          fontStyle: 'italic',
                          marginBottom: '8px',
                        }}
                      >
                        {location.businessDetails.specialization}
                      </div>
                    )}
                    <button
                      onClick={() => getDirections(location)}
                      style={{
                        width: '100%',
                        padding: '6px 10px',
                        backgroundColor: '#4F46E5',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '11px',
                        fontWeight: '500',
                      }}
                    >
                      🗺️ Get Directions
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Right Map Area */}
      <div style={{ flex: 1, position: 'relative', backgroundColor: '#eee' }}>
        <MapComponent
          locations={filteredLocations}
          center={center}
          zoom={13}
          userLocation={userLocation}
          onMapClick={showSuggestionMode ? handleMapClick : null}
          showRadius={radius}
        />
      </div>
    </div>
  );
};
