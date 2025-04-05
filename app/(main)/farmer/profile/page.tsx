"use client";

import React from "react";
import { FiEdit, FiMapPin, FiDroplet, FiSun, FiCalendar, FiDollarSign } from "react-icons/fi";
import { GiFarmTractor, GiWheat, GiPlantWatering } from "react-icons/gi";

const Profile = () => {
  // Sample farmer data - replace with actual data from your API
  const farmerData = {
    name: "Prabal Verma",
    location: "Punjab, India",
    farmSize: "12 acres",
    crops: ["Wheat", "Rice", "Mustard"],
    irrigationType: "Tube Well",
    soilType: "Alluvial",
    farmingExperience: "8 years",
    contact: "+91 9876543210",
    joinDate: "15 March 2018",
    rating: 4.7,
    totalContracts: 24,
    upcomingHarvest: "June 2023",
  };

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      {/* Profile Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-green-800">Farmer Dashboard</h1>
        <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
          <FiEdit className="text-lg" />
          <span>Edit Profile</span>
        </button>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            {/* Profile Image */}
            <div className="relative">
              <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center">
                <GiFarmTractor className="text-5xl text-green-600" />
              </div>
              <div className="absolute bottom-0 right-0 bg-yellow-400 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
                {farmerData.rating}
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{farmerData.name}</h2>
                  <div className="flex items-center gap-1 text-gray-600 mt-1">
                    <FiMapPin className="text-green-600" />
                    <span>{farmerData.location}</span>
                  </div>
                </div>
                <div className="mt-3 md:mt-0 bg-green-50 text-green-800 px-3 py-1 rounded-full text-sm">
                  Member since {farmerData.joinDate}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-gray-500 text-sm">Farm Size</p>
                  <p className="font-semibold text-lg">{farmerData.farmSize}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-gray-500 text-sm">Experience</p>
                  <p className="font-semibold text-lg">{farmerData.farmingExperience}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-gray-500 text-sm">Total Contracts</p>
                  <p className="font-semibold text-lg">{farmerData.totalContracts}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-gray-500 text-sm">Upcoming Harvest</p>
                  <p className="font-semibold text-lg">{farmerData.upcomingHarvest}</p>
                </div>
              </div>

              {/* Contact */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-blue-800 font-medium">Contact Information</p>
                <p className="text-gray-700 mt-1">{farmerData.contact}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Farm Details Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Crops Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-4">
              <GiWheat className="text-green-600" />
              <span>Crops Cultivated</span>
            </h3>
            <div className="space-y-3">
              {farmerData.crops.map((crop, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <GiPlantWatering className="text-green-600 text-sm" />
                  </div>
                  <span className="font-medium">{crop}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Farm Characteristics */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-4">
              <FiSun className="text-yellow-500" />
              <span>Farm Characteristics</span>
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <FiDroplet className="text-blue-600" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Irrigation Type</p>
                  <p className="font-medium">{farmerData.irrigationType}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                  <FiSun className="text-amber-600" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Soil Type</p>
                  <p className="font-medium">{farmerData.soilType}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="mt-6 bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-4">
            <FiCalendar className="text-green-600" />
            <span>Recent Contracts</span>
          </h3>
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <p className="text-gray-600">No recent contracts available</p>
            <button className="mt-3 text-green-600 hover:text-green-800 font-medium">
              View All Contracts
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;