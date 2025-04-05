"use client";

import React from "react";
import { FiBriefcase, FiStar, FiDollarSign, FiClock, FiMapPin, FiTruck } from "react-icons/fi";
import { GiCommercialAirplane } from "react-icons/gi";

const ContractorProfile = () => {
  // Sample contractor data based on Prisma schema
  const contractorData = {
    companyName: "AgriSolutions Pvt. Ltd.",
    rating: 4.8,
    experience: 12,
    location: "Mumbai, Maharashtra",
    totalPurchases: 245,
    activeContracts: 8,
    averageResponseTime: "2.4 hours",
    memberSince: "2015",
    recentPurchases: [
      { crop: "Wheat", quantity: 150, price: "₹2,100/q", date: "2024-03-15" },
      { crop: "Rice", quantity: 80, price: "₹1,850/q", date: "2024-03-18" },
      { crop: "Corn", quantity: 200, price: "₹1,750/q", date: "2024-03-20" },
    ]
  };

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      {/* Profile Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-blue-800">Contractor Profile</h1>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
          <FiBriefcase className="text-lg" />
          <span>Edit Profile</span>
        </button>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            {/* Company Logo */}
            <div className="relative">
              <div className="w-32 h-32 bg-blue-100 rounded-xl flex items-center justify-center">
                <GiCommercialAirplane className="text-5xl text-blue-600" />
              </div>
              <div className="absolute bottom-0 right-0 bg-yellow-400 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
                {contractorData.rating}
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{contractorData.companyName}</h2>
                  <div className="flex items-center gap-1 text-gray-600 mt-1">
                    <FiMapPin className="text-blue-600" />
                    <span>{contractorData.location}</span>
                  </div>
                </div>
                <div className="mt-3 md:mt-0 bg-blue-50 text-blue-800 px-3 py-1 rounded-full text-sm">
                  Member since {contractorData.memberSince}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-gray-500 text-sm">Experience</p>
                  <p className="font-semibold text-lg">{contractorData.experience} years</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-gray-500 text-sm">Total Purchases</p>
                  <p className="font-semibold text-lg">{contractorData.totalPurchases}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-gray-500 text-sm">Active Contracts</p>
                  <p className="font-semibold text-lg">{contractorData.activeContracts}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-gray-500 text-sm">Avg. Response</p>
                  <p className="font-semibold text-lg">{contractorData.averageResponseTime}</p>
                </div>
              </div>

              {/* Rating */}
              <div className="bg-yellow-50 p-4 rounded-lg flex items-center gap-2">
                <FiStar className="text-yellow-500 text-xl" />
                <span className="text-yellow-800 font-medium">
                  {contractorData.rating}/5 Average Rating (1.2k reviews)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Purchases Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Purchases */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-4">
              <FiTruck className="text-blue-600" />
              <span>Recent Purchases</span>
            </h3>
            <div className="space-y-4">
              {contractorData.recentPurchases.map((purchase, index) => (
                <div key={index} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{purchase.crop}</p>
                    <p className="text-sm text-gray-500">{purchase.quantity} quintals</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{purchase.price}</p>
                    <p className="text-sm text-gray-500">{purchase.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Company Details */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-4">
              <FiBriefcase className="text-blue-600" />
              <span>Company Details</span>
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <FiClock className="text-blue-600" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Operation Hours</p>
                  <p className="font-medium">Mon-Sat: 8 AM - 8 PM</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <FiDollarSign className="text-green-600" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Payment Methods</p>
                  <p className="font-medium">UPI, Net Banking, Cheque</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Active Contracts Section */}
      <div className="mt-6 bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-4">
            <FiTruck className="text-blue-600" />
            <span>Active Contracts</span>
          </h3>
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <p className="text-gray-600">No active contracts to display</p>
            <button className="mt-3 text-blue-600 hover:text-blue-800 font-medium">
              View All Contracts
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractorProfile;