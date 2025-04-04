import React from "react";

const contracts = [
  {
    id: "66de0d7361cb4b0c040d0563",
    name: "Vijay Singh",
    date: "9/9/2024",
    crop: "Wheat",
    quantity: 5,
    price: "1000/- per quintal",
  },
  {
    id: "66de8c23e9c1bff218cf5275",
    name: "Prabal Verma",
    date: "Invalid Date",
    crop: "Rice",
    quantity: 5,
    price: "1200/- per quintal",
  },
  {
    id: "66de9938bac72ce0dd2f1960",
    name: "Prabal Verma",
    date: "Invalid Date",
    crop: "Corn",
    quantity: 5,
    price: "900/- per quintal",
  },
];

const Contracts = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center mb-6">My Contracts (Farmer)</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contracts.map((contract) => (
          <div key={contract.id} className="bg-white p-4 rounded-lg shadow-md border">
            <h3 className="text-lg font-semibold">{contract.name}</h3>
            <p className="text-sm text-gray-600">Contract ID: {contract.id}</p>
            <p className="text-sm text-gray-600">Date: {contract.date}</p>
            <p className="text-sm text-gray-600">Crop: {contract.crop}</p>
            <p className="text-sm text-gray-600">Quantity: {contract.quantity}</p>
            <p className="text-sm text-gray-600">Price: {contract.price}</p>
            <div className="flex justify-between items-center mt-4">
              <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                ✅ Accept
              </button>
              <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                ❌ Reject
              </button>
            </div>
            <p className="text-yellow-600 font-semibold mt-2 text-right">Pending</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contracts;