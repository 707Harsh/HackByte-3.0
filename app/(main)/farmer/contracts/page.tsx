import React from "react";
import { FiCheckCircle, FiXCircle, FiClock, FiCalendar, FiDollarSign, FiPackage } from "react-icons/fi";
import { GiWheat, GiCorn, GiGrain } from "react-icons/gi";

const contracts = [
  {
    id: "66de0d7361cb4b0c040d0563",
    name: "Vijay Singh",
    date: "2024-09-09",
    crop: "Wheat",
    quantity: 5,
    price: "1000/- per quintal",
    status: "pending",
  },
  {
    id: "66de8c23e9c1bff218cf5275",
    name: "Prabal Verma",
    date: "2024-10-15",
    crop: "Rice",
    quantity: 5,
    price: "1200/- per quintal",
    status: "pending",
  },
  {
    id: "66de9938bac72ce0dd2f1960",
    name: "Prabal Verma",
    date: "2024-11-20",
    crop: "Corn",
    quantity: 5,
    price: "900/- per quintal",
    status: "pending",
  },
];

const getCropIcon = (crop: string) => {
  switch (crop.toLowerCase()) {
    case 'wheat':
      return <GiWheat className="text-amber-500" />;
    case 'rice':
      return <GiGrain className="text-gray-600" />;
    case 'corn':
      return <GiCorn className="text-yellow-500" />;
    default:
      return <FiPackage className="text-green-500" />;
  }
};

const formatDate = (dateString: string) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' } as Intl.DateTimeFormatOptions;
  return new Intl.DateTimeFormat('en-US', options).format(new Date(dateString));
};

const Contracts = () => {
  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-green-800">My Contracts</h1>
        <div className="flex gap-2 mt-4 md:mt-0">
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm">
            New Contract
          </button>
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm">
            Filter
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-xl shadow-sm border">
          <p className="text-gray-500 text-sm">Total Contracts</p>
          <p className="text-2xl font-bold">3</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border">
          <p className="text-gray-500 text-sm">Pending</p>
          <p className="text-2xl font-bold text-yellow-600">3</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border">
          <p className="text-gray-500 text-sm">Accepted</p>
          <p className="text-2xl font-bold text-green-600">0</p>
        </div>
        <div className="bg-white p-4 rounded-xl shadow-sm border">
          <p className="text-gray-500 text-sm">Rejected</p>
          <p className="text-2xl font-bold text-red-600">0</p>
        </div>
      </div>

      {/* Contracts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contracts.map((contract) => (
          <div key={contract.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
            {/* Contract Header */}
            <div className="bg-green-50 p-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                {getCropIcon(contract.crop)}
                <h3 className="font-semibold text-gray-800">{contract.crop}</h3>
              </div>
              <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                <FiClock className="text-xs" />
                {contract.status.charAt(0).toUpperCase() + contract.status.slice(1)}
              </span>
            </div>

            {/* Contract Details */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="font-medium">{contract.name}</p>
                <p className="text-sm text-gray-500">#{contract.id.slice(-6)}</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <FiCalendar className="text-gray-400" />
                  <span>{formatDate(contract.date)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <FiPackage className="text-gray-400" />
                  <span>{contract.quantity} quintals</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <FiDollarSign className="text-gray-400" />
                  <span>{contract.price}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between gap-3 mt-6">
                <button className="flex-1 bg-green-50 hover:bg-green-100 text-green-700 flex items-center justify-center gap-2 py-2 rounded-lg transition-colors">
                  <FiCheckCircle />
                  Accept
                </button>
                <button className="flex-1 bg-red-50 hover:bg-red-100 text-red-700 flex items-center justify-center gap-2 py-2 rounded-lg transition-colors">
                  <FiXCircle />
                  Reject
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State (when no contracts) */}
      {/* <div className="bg-gray-50 rounded-xl p-8 text-center">
        <div className="mx-auto w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
          <FiPackage className="text-gray-400 text-2xl" />
        </div>
        <h3 className="text-lg font-medium text-gray-700 mb-2">No Contracts Available</h3>
        <p className="text-gray-500 mb-4">You don't have any contracts yet.</p>
        <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg">
          Create New Contract
        </button>
      </div> */}
    </div>
  );
};

export default Contracts;