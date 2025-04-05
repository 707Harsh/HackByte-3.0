"use client";

import { PurchaseRequest, ListingStatus } from "@prisma/client";
import { useState, useEffect } from "react";
import {
  FiShoppingBag,
  FiPlus,
  FiDollarSign,
  FiCalendar,
  FiBox,
  FiFilter,
  FiMessageSquare,
  FiMapPin,
  FiClock,
  FiCheck,
  FiX,
} from "react-icons/fi";

const Dashboard = () => {
  // Available crop types for suggestions
  const availableCrops = ["Wheat", "Rice", "Corn", "Soybean", "Barley", "Oats", "Millet", "Sorghum"];
  
  const dummyCropSuggestions = [
    {
      cropType: "Wheat",
      state: "Punjab",
      city: "Ludhiana",
      averagePrice: 2100,
      suggestedPrice: 2200,
    },
    {
      cropType: "Rice",
      state: "West Bengal",
      city: "Burdwan",
      averagePrice: 1850,
      suggestedPrice: 1950,
    },
    {
      cropType: "Corn",
      state: "Karnataka",
      city: "Belgaum",
      averagePrice: 1750,
      suggestedPrice: 1800,
    },
  ];

  const [formData, setFormData] = useState({
    cropType: "",
    quantity: 0,
    pricePerUnit: 0,
  });

  const [activeTab, setActiveTab] = useState("newRequest");
  const [loading, setLoading] = useState(false);
  const [purchaseHistory, setPurchaseHistory] = useState<PurchaseRequest[]>([]);
  const [cropSuggestions, setCropSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [fetchingHistory, setFetchingHistory] = useState(false);
  const [error, setError] = useState("");

  // Fetch purchase history when component mounts or tab changes
  useEffect(() => {
    if (activeTab === "history") {
      fetchPurchaseHistory();
    }
  }, [activeTab]);

  const fetchPurchaseHistory = async () => {
    try {
      setFetchingHistory(true);
      const response = await fetch("/api/purchase-requests");
      if (!response.ok) {
        throw new Error("Failed to fetch purchase history");
      }
      const data = await response.json();
      setPurchaseHistory(data);
    } catch (err) {
      console.error("Error fetching purchase history:", err);
      setError("Failed to load purchase history. Please try again.");
    } finally {
      setFetchingHistory(false);
    }
  };

  // Handle crop type input changes
  const handleCropTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData({ ...formData, cropType: value });
    
    if (value.length > 0) {
      const matches = availableCrops.filter(crop =>
        crop.toLowerCase().includes(value.toLowerCase())
      );
      setCropSuggestions(matches);
      setShowSuggestions(true);
    } else {
      setCropSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // Select a suggestion
  const selectSuggestion = (crop: string) => {
    setFormData({ ...formData, cropType: crop });
    setShowSuggestions(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "quantity" || name === "pricePerUnit" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validate crop type
    if (!availableCrops.includes(formData.cropType)) {
      setError("Please enter a valid crop type from the suggestions");
      setLoading(false);
      return;
    }

    try {
      // Call the API to create purchase request
      const response = await fetch("/api/purchase-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create purchase request");
      }

      // Reset form and show success
      setFormData({ cropType: "", quantity: 0, pricePerUnit: 0 });
      setActiveTab("history");
      fetchPurchaseHistory(); // Refresh history after submission
    } catch (err: any) {
      console.error("Error submitting purchase request:", err);
      setError(err.message || "Failed to submit request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Format date for display
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // Status badge component
  const StatusBadge = ({ status }: { status: ListingStatus }) => {
    let bgColor = "bg-gray-100 text-gray-800";
    let icon = <FiClock className="mr-1" />;

    switch (status) {
      case ListingStatus.ACTIVE:
        bgColor = "bg-green-100 text-green-800";
        icon = <FiCheck className="mr-1" />;
        break;
      case ListingStatus.PENDING:
        bgColor = "bg-yellow-100 text-yellow-800";
        break;
      case ListingStatus.EXPIRED:
        bgColor = "bg-gray-100 text-gray-800";
        break;
      case ListingStatus.CANCELLED:
        bgColor = "bg-red-100 text-red-800";
        break;
      case ListingStatus.COMPLETED:
        bgColor = "bg-blue-100 text-blue-800";
        icon = <FiX className="mr-1" />;
        break;
      case ListingStatus.COMPLETED:
        bgColor = "bg-blue-100 text-blue-800";
        icon = <FiCheck className="mr-1" />;
        break;
      default:
        break;
    }

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bgColor}`}>
        {icon}
        {status.charAt(0) + status.slice(1).toLowerCase()}
      </span>
    );
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-green-800">
          Contractor Dashboard
        </h1>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === "newRequest"
              ? "text-green-600 border-b-2 border-green-600"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("newRequest")}
        >
          New Purchase Request
        </button>
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === "history"
              ? "text-green-600 border-b-2 border-green-600"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("history")}
        >
          Purchase History
        </button>
        <button
          className={`py-2 px-4 font-medium ${
            activeTab === "suggestions"
              ? "text-green-600 border-b-2 border-green-600"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("suggestions")}
        >
          Crop Suggestions
        </button>
      </div>

      {/* Error message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {/* New Purchase Request Form */}
      {activeTab === "newRequest" && (
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <FiShoppingBag className="text-green-600" />
            Create Purchase Request
          </h2>

          <form onSubmit={handleSubmit} className="max-w-lg">
            <div className="grid gap-4">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Crop Type
                </label>
                <input
                  type="text"
                  name="cropType"
                  value={formData.cropType}
                  onChange={handleCropTypeChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter crop type (e.g. Wheat, Rice)"
                  autoComplete="off"
                />
                {showSuggestions && cropSuggestions.length > 0 && (
                  <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                    {cropSuggestions.map((crop, index) => (
                      <div
                        key={index}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => selectSuggestion(crop)}
                      >
                        {crop}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity (quintals)
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    min="1"
                    value={formData.quantity}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Price/Quintal (₹)
                  </label>
                  <input
                    type="number"
                    name="pricePerUnit"
                    min="1"
                    value={formData.pricePerUnit}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors disabled:opacity-50 mt-4"
              >
                {loading ? "Submitting..." : "Submit Request"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Purchase History */}
      {activeTab === "history" && (
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <FiCalendar className="text-green-600" />
            Purchase History
          </h2>

          {fetchingHistory ? (
            <div className="text-center py-8">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-green-600 border-r-transparent"></div>
              <p className="mt-2 text-gray-600">Loading purchase history...</p>
            </div>
          ) : purchaseHistory.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <FiBox className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-2 text-lg">No purchase requests yet</p>
              <button
                onClick={() => setActiveTab("newRequest")}
                className="mt-4 inline-flex items-center font-medium text-green-600 hover:text-green-700"
              >
                <FiPlus className="mr-1" /> Create your first request
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Crop
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price/Quintal
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Value
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {purchaseHistory.map((request) => (
                    <tr key={request.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4 whitespace-nowrap font-medium text-gray-900">
                        {request.cropType}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-gray-700">
                        {request.quantity} quintals
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-gray-700">
                        ₹{request.pricePerUnit.toLocaleString()}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-gray-700">
                        ₹{(request.quantity * request.pricePerUnit).toLocaleString()}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <StatusBadge status={request.status} />
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-gray-700">
                        {formatDate(request.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Crop Suggestions */}
      {activeTab === "suggestions" && (
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <FiFilter className="text-green-600" />
            Market Suggestions
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dummyCropSuggestions.map((suggestion, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <h3 className="font-bold text-lg text-gray-800">{suggestion.cropType}</h3>
                <div className="flex items-center text-gray-600 mt-2">
                  <FiMapPin className="mr-1" />
                  <span>
                    {suggestion.city}, {suggestion.state}
                  </span>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-gray-500">Average Price</p>
                    <p className="font-medium">₹{suggestion.averagePrice}/quintal</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Suggested Price</p>
                    <p className="font-medium text-green-600">₹{suggestion.suggestedPrice}/quintal</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setFormData({
                      cropType: suggestion.cropType,
                      quantity: 0,
                      pricePerUnit: suggestion.suggestedPrice,
                    });
                    setActiveTab("newRequest");
                  }}
                  className="mt-4 w-full bg-green-50 hover:bg-green-100 text-green-700 font-medium py-2 px-4 rounded-lg transition-colors text-center"
                >
                  Use This Suggestion
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;