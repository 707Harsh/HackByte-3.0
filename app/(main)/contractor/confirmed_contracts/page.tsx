"use client";

import React from "react";
import { FiCheckCircle, FiUser, FiMapPin, FiPackage, FiCalendar } from "react-icons/fi";

type ConfirmedContract = {
  id: string;
  farmerName: string;
  cropType: string;
  location: string;
  quantity: string;
  price: string;
  acceptedDate: string;
  completedDate: string;
};

const ConfirmedContracts = () => {
  const contracts: ConfirmedContract[] = [
    {
      id: "1",
      farmerName: "Johnathan Doe",
      cropType: "Wheat",
      location: "Springfield, IL",
      quantity: "500 kg",
      price: "₹2,100/quintal",
      acceptedDate: "2024-03-15",
      completedDate: "2024-03-18"
    },
    {
      id: "2",
      farmerName: "Jane Smith",
      cropType: "Corn",
      location: "Lincoln, NE",
      quantity: "750 kg",
      price: "₹1,850/quintal",
      acceptedDate: "2024-03-18",
      completedDate: "2024-03-22"
    },
    {
      id: "3",
      farmerName: "Robert Johnson",
      cropType: "Soybeans",
      location: "Des Moines, IA",
      quantity: "1200 kg",
      price: "₹1,750/quintal",
      acceptedDate: "2024-03-20",
      completedDate: "2024-03-25"
    },
  ];

  return (
    <div className="container mx-auto p-4 md:p-6 max-w-6xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Confirmed Contracts</h2>
        <span className="text-sm text-gray-500">
          Showing {contracts.length} completed deals
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {contracts.map((contract) => (
          <div 
            key={contract.id} 
            className="relative p-5 rounded-lg shadow-md border-l-4 border-green-500 bg-white hover:shadow-lg transition-shadow flex flex-col h-full"
          >
            {/* Farmer Info */}
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-blue-100 rounded-full text-blue-600">
                <FiUser />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">
                {contract.farmerName}
              </h3>
            </div>

            {/* Contract Details */}
            <div className="space-y-2 flex-grow">
              <div className="flex items-center gap-2 text-gray-600">
                <FiPackage className="text-gray-500" />
                <span><span className="font-medium">Crop:</span> {contract.cropType}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <FiMapPin className="text-gray-500" />
                <span><span className="font-medium">Location:</span> {contract.location}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <span className="font-medium">Quantity:</span> {contract.quantity}
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <span className="font-medium">Price:</span> {contract.price}
              </div>
            </div>

            {/* Dates */}
            <div className="mt-4 pt-3 border-t border-gray-100 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <FiCalendar className="text-gray-400" />
                <span>Accepted: {contract.acceptedDate}</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <FiCalendar className="text-gray-400" />
                <span>Completed: {contract.completedDate}</span>
              </div>
            </div>

            {/* Deal Done Badge - Now at the bottom */}
            <div className="mt-4 pt-3 border-t border-gray-100">
              <div className="flex items-center justify-center gap-1 bg-green-100 text-green-800 px-3 py-1.5 rounded-full text-sm font-medium w-full">
                <FiCheckCircle className="text-green-600" />
                <span>Deal Done</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConfirmedContracts;