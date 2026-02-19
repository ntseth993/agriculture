import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export const MapComponent = ({ 
  locations = [], 
  center = [20.5937, 78.9629], 
  zoom = 5,
  userLocation = null,
  onMapClick = null,
  showRadius = null
}) => {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef({});

  // Initialize map once
  useEffect(() => {
    if (mapRef.current) return;
    if (!mapContainer.current) return;

    try {
      // Create map with proper options
      const map = L.map(mapContainer.current, {
        center: [20.5937, 78.9629],
        zoom: 11,
        zoomControl: true,
        attributionControl: false,
        preferCanvas: true,
        scrollWheelZoom: true,
        dragging: true,
        touchZoom: true,
        doubleClickZoom: true,
        keyboard: true,
        tap: true,
      });

      // Add CartoDB Positron tile layer (Google Maps-like appearance)
      L.tileLayer('https://{s}.basemaps.cartocdn.com/positron/{z}/{x}/{y}{r}.png', {
        attribution: '© CartoDB',
        maxZoom: 19,
        subdomains: 'abcd',
      }).addTo(map);

      mapRef.current = map;

      // Force resize after a short delay
      setTimeout(() => {
        if (mapRef.current) {
          mapRef.current.invalidateSize();
        }
      }, 50);

      console.log('Map initialized');
    } catch (error) {
      console.error('Map initialization error:', error);
    }

    return () => {
      // Keep map alive
    };
  }, []);

  // Update map view when center changes
  useEffect(() => {
    if (!mapRef.current) return;
    if (!center || !Array.isArray(center) || center.length !== 2) return;

    try {
      mapRef.current.setView(center, zoom || 11);
    } catch (error) {
      console.error('Map view error:', error);
    }
  }, [center, zoom]);

  // Add user location marker
  useEffect(() => {
    if (!mapRef.current || !userLocation) return;

    try {
      // Remove old marker
      if (markersRef.current['user']) {
        mapRef.current.removeLayer(markersRef.current['user']);
      }

      const userMarker = L.circleMarker([userLocation.latitude, userLocation.longitude], {
        radius: 8,
        fillColor: '#1f2937',
        color: '#111827',
        weight: 3,
        opacity: 1,
        fillOpacity: 0.9,
      }).bindPopup('<b>📍 Your Location</b>', { offset: L.point(0, -10) });

      userMarker.addTo(mapRef.current);
      markersRef.current['user'] = userMarker;
    } catch (error) {
      console.error('User marker error:', error);
    }
  }, [userLocation]);

  // Add/update search radius circle
  useEffect(() => {
    if (!mapRef.current || !userLocation || !showRadius) return;

    try {
      // Remove old circle
      if (markersRef.current['circle']) {
        mapRef.current.removeLayer(markersRef.current['circle']);
      }

      const circle = L.circle([userLocation.latitude, userLocation.longitude], {
        radius: showRadius * 1000,
        color: '#2563eb',
        weight: 2,
        opacity: 0.6,
        fill: true,
        fillColor: '#2563eb',
        fillOpacity: 0.08,
        dashArray: '4, 4',
      });

      circle.addTo(mapRef.current);
      markersRef.current['circle'] = circle;
    } catch (error) {
      console.error('Circle error:', error);
    }
  }, [userLocation, showRadius]);

  // Add location markers with optimized rendering
  useEffect(() => {
    if (!mapRef.current) return;

    try {
      // Remove old location markers (but keep user marker and circle)
      Object.keys(markersRef.current).forEach(key => {
        if (key !== 'user' && key !== 'circle' && markersRef.current[key]) {
          mapRef.current.removeLayer(markersRef.current[key]);
          delete markersRef.current[key];
        }
      });

      // Add new location markers
      locations.forEach((location, index) => {
        try {
          if (!location.location?.coordinates || location.location.coordinates.length !== 2) return;

          const [lng, lat] = location.location.coordinates;
          if (!Number.isFinite(lat) || !Number.isFinite(lng)) return;

          // Determine marker style
          let fillColor = '#059669';
          let emoji = '🏪';

          if (location.role === 'pharmacy') {
            if (location.pharmacyType === 'animal') {
              fillColor = '#d97706';
              emoji = '🐾';
            } else {
              fillColor = '#2563eb';
              emoji = '💊';
            }
          }

          const marker = L.circleMarker([lat, lng], {
            radius: 8,
            fillColor: fillColor,
            color: fillColor,
            weight: 2,
            opacity: 1,
            fillOpacity: 0.85,
          });

          // Create popup
          const popupText = `
            <div style="font-size: 13px; min-width: 220px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
              <b style="display: block; margin-bottom: 6px; font-size: 14px; color: #1f2937;">${emoji} ${location.businessName || location.name}</b>
              <div style="color: #4b5563; line-height: 1.5;">
                <div>📍 ${location.businessDetails?.address || 'Location'}</div>
                <div>📞 ${location.phone || 'N/A'}</div>
                ${location.businessDetails?.specialization ? `<div>📋 ${location.businessDetails.specialization}</div>` : ''}
              </div>
            </div>
          `;

          marker.bindPopup(popupText, { offset: L.point(0, -10), closeButton: true });
          marker.addTo(mapRef.current);
          markersRef.current[`loc_${index}`] = marker;
        } catch (error) {
          console.error('Location marker error:', error);
        }
      });
    } catch (error) {
      console.error('Markers update error:', error);
    }
  }, [locations]);

  // Handle map click for location suggestion
  useEffect(() => {
    if (!mapRef.current || !onMapClick) return;

    const handleClick = (e) => {
      try {
        onMapClick(e.latlng.lat, e.latlng.lng);
      } catch (error) {
        console.error('Click handler error:', error);
      }
    };

    mapRef.current.on('click', handleClick);
    return () => {
      if (mapRef.current) {
        mapRef.current.off('click', handleClick);
      }
    };
  }, [onMapClick]);

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '500px',
      backgroundColor: '#f3f4f6',
      borderRadius: '12px',
      border: 'none',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      overflow: 'hidden',
    }}>
      <div
        ref={mapContainer}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
        }}
      />
    </div>
  );
};
