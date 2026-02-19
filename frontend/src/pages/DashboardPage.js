import React from 'react';
import { useAuth } from '../context/AuthContext';
import { AlertsPanel } from '../components/AlertsPanel';
import { FiLogOut, FiHome } from 'react-icons/fi';

export const DashboardPage = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <nav className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FiHome size={28} className="text-green-600" />
            <h1 className="text-2xl font-bold text-gray-800">Crop Health Advisory</h1>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-sm text-gray-600">Welcome</p>
              <p className="font-semibold text-gray-800">{user?.name}</p>
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              <FiLogOut /> Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto p-4 py-8">
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-lg shadow-lg p-6 text-white">
            <h3 className="text-lg font-semibold mb-2">Disease Detection</h3>
            <p className="text-sm">Upload crop images to detect diseases</p>
            <a href="/detect" className="text-white underline mt-2 block">
              Start Detection →
            </a>
          </div>

          <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg shadow-lg p-6 text-white">
            <h3 className="text-lg font-semibold mb-2">Find Services</h3>
            <p className="text-sm">Locate nearby agro-vets and pharmacies</p>
            <a href="/locations" className="text-white underline mt-2 block">
              View Map →
            </a>
          </div>

          <div className="bg-gradient-to-br from-yellow-400 to-orange-600 rounded-lg shadow-lg p-6 text-white">
            <h3 className="text-lg font-semibold mb-2">My Alerts</h3>
            <p className="text-sm">Receive weather and pest alerts</p>
            <a href="/alerts" className="text-white underline mt-2 block">
              View Alerts →
            </a>
          </div>
        </div>

        <AlertsPanel />

        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Quick Tips</h2>
          <ul className="space-y-2 text-gray-700">
            <li>✓ Take clear photos of affected crop areas for better disease detection</li>
            <li>✓ Enable location services to find nearby agro-vets and pharmacies</li>
            <li>✓ Subscribe to weather alerts to get timely notifications</li>
            <li>✓ Review recommended treatments and check farmer feedback</li>
            <li>✓ Keep your crop and location information updated</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
