"use client";

import { useState } from "react";

const Dashboard = () => {
  const [formData, setFormData] = useState({
    crop: "",
    quantity: "",
  });

  const [contractors, setContractors] = useState([
    { id: 1, crop: "Wheat", price: "$250", minQuantity: "10 tons" },
    { id: 2, crop: "Corn", price: "$200", minQuantity: "5 tons" },
    { id: 3, crop: "Soybean", price: "$300", minQuantity: "8 tons" },
    { id: 4, crop: "Barley", price: "$230", minQuantity: "12 tons" },
    { id: 5, crop: "Oats", price: "$210", minQuantity: "6 tons" },
    { id: 6, crop: "Rice", price: "$350", minQuantity: "15 tons" },
    { id: 7, crop: "Millet", price: "$275", minQuantity: "4 tons" },
    { id: 8, crop: "Sorghum", price: "$220", minQuantity: "7 tons" },
  ]);

  const [addedCrops, setAddedCrops] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showContractors, setShowContractors] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCrop = {
      id: addedCrops.length + 1,
      crop: formData.crop,
      quantity: formData.quantity,
    };
    setAddedCrops((prev) => [...prev, newCrop]);
    setFormData({ crop: "", quantity: "" });
    alert("Crop added successfully!");
    setShowForm(false); // Hide the form after submission
  };

  const toggleContractors = () => {
    setShowContractors((prev) => !prev);
  };

  const filteredContractors = contractors.filter((contractor) =>
    addedCrops.some((addedCrop) => addedCrop.crop === contractor.crop)
  );

  return (
    <div className="w-full px-2">
      <div className="grid gap-6 md:grid-cols-2 p-4">
        {/* Card - 1 */}
        <div className="max-w-lg rounded overflow-hidden shadow-lg p-6">
          <div className="font-bold text-xl mb-2">New Contracts</div>
          <p className="text-gray-700 text-base">
            Create new contracts for your clients. Customize the contract terms and conditions to suit your needs.
          </p>
        </div>

        {/* Card - 2 */}
        <div className="max-w-lg rounded overflow-hidden shadow-lg p-6">
          <div className="font-bold text-xl mb-2">Current Contracts</div>
          <p className="text-gray-700 text-base">
            View and manage your current contracts here. You can add, edit, or delete contracts as needed.
          </p>
        </div>
      </div>

      {/* Crop Adding Form as a Card */}
      <div className="max-w-lg mx-auto mt-6 p-6 shadow-md rounded">
        <h2 className="text-xl font-semibold mb-4">Add New Crop</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Crop</label>
            <input
              type="text"
              name="crop"
              value={formData.crop}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
              placeholder="Enter crop name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
              placeholder="Enter quantity"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>

      {/* List of Added Crops */}
      <div className="max-w-lg mx-auto mt-6 p-6 shadow-md rounded">
        <h2 className="text-xl font-semibold mb-4">Added Crops</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Crop</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {addedCrops.map((crop) => (
              <tr key={crop.id}>
                <td className="px-6 py-4 whitespace-nowrap">{crop.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{crop.crop}</td>
                <td className="px-6 py-4 whitespace-nowrap">{crop.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Button to Show/Hide Contractors */}
      <div className="max-w-lg mx-auto mt-6">
        <button
          onClick={toggleContractors}
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        >
          {showContractors ? "Hide Contractors" : "Show Contractors"}
        </button>
      </div>

      {/* Contractors List Filtered by Added Crops */}
      {showContractors && (
        <div className="max-w-lg mx-auto mt-6 p-6 shadow-md rounded">
          <h2 className="text-xl font-semibold mb-4">Contractors Interested in Added Crops</h2>
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Crop</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Min. Quantity</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredContractors.length > 0 ? (
                filteredContractors.map((contractor) => (
                  <tr key={contractor.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{contractor.crop}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{contractor.price}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{contractor.minQuantity}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap" colSpan="3">No contractors found for the added crops.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Dashboard;