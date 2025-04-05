"use client";

import React from "react";

const Profile = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Profile Card */}
      <div className="bg-white shadow-md rounded-lg p-6">
        {/* Profile Title */}
        <h2 className="text-xl font-semibold mb-4">Farmer Profile</h2>

        <div className="flex items-center gap-6">
          {/* Profile Image Placeholder */}
          <div className="w-24 h-24 bg-gray-200 rounded-full"></div>

          {/* Farmer Info */}
          <div className="flex-1">
            <p className="text-lg font-semibold text-blue-600">Prabal Verma</p>
            <p className="text-gray-600">Location: Not available</p>
            <p className="text-gray-600">Farm Size: Not available</p>
            <p className="text-gray-600">Crops: Not available</p>
            <button className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      {/* Farm Details Section */}
      <div className="mt-6 bg-white shadow-md rounded-lg p-6">
        <h3 className="text-lg font-semibold">Farm Details</h3>
        <p className="text-blue-600 font-semibold">Farm Information</p>
        <p className="text-gray-600">No details available</p>
      </div>
    </div>
  );
};

export default Profile;
