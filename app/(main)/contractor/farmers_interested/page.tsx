"use client";

import { User } from "@prisma/client";
import React, { useEffect, useState } from "react";
import { FiUser, FiMapPin, FiPackage, FiDollarSign, FiCheckCircle, FiXCircle, FiFilter, FiSearch } from "react-icons/fi";

// Define a more specific type for status with default value
type FarmerStatus = "pending" | "accepted" | "rejected";

type Farmer = {
  id: string;
  name: string;
  cropType: string;
  location: string;
  quantity: string;
  pricePerUnit: string;
  status?: FarmerStatus; // Make status optional
  image?: string;
};

type FarmerCardProps = {
  farmer: Farmer;
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
};

const FarmerCard: React.FC<FarmerCardProps> = ({
  farmer,
  onAccept,
  onReject,
}) => {
  // Provide a default status if undefined
  const status = farmer.status || "pending";

  const statusColor = {
    accepted: "border-green-500/30 bg-green-50/50",
    rejected: "border-red-500/30 bg-red-50/50",
    pending: "border-gray-200 bg-white",
  };

  const statusTextColor = {
    accepted: "text-green-600",
    rejected: "text-red-600",
    pending: "text-gray-600",
  };

  // Safely format status text
  const formatStatusText = (status: string) => {
    if (!status) return "Pending"; // Default value
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div
      className={`rounded-xl shadow-sm p-5 border ${statusColor[status]} transition-all hover:shadow-md hover:-translate-y-0.5`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-gray-100 p-2 rounded-lg">
            {farmer.image ? (
              <img 
                src={farmer.image} 
                alt={farmer.name}
                className="w-10 h-10 rounded-md object-cover"
              />
            ) : (
              <FiUser className="text-gray-600 text-lg" />
            )}
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">{farmer.name}</h3>
            <span className={`text-xs font-medium ${statusTextColor[status]}`}>
              {formatStatusText(status)}
            </span>
          </div>
        </div>
      </div>

      {/* <div className="space-y-3 mt-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <FiPackage className="text-gray-400 flex-shrink-0" />
          <span className="truncate"><span className="font-medium">Crop:</span> {farmer.cropType}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <FiMapPin className="text-gray-400 flex-shrink-0" />
          <span className="truncate"><span className="font-medium">Location:</span> {farmer.location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <FiPackage className="text-gray-400 flex-shrink-0" />
          <span><span className="font-medium">Quantity:</span> {farmer.quantity} quintals</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <FiDollarSign className="text-gray-400 flex-shrink-0" />
          <span><span className="font-medium">Price:</span> ₹{farmer.pricePerUnit}/quintal</span>
        </div>
      </div> */}

      {status === "pending" && (
        <div className="flex justify-between gap-3 mt-5">
          <button
            onClick={() => onAccept(farmer.id)}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-colors"
          >
            <FiCheckCircle size={16} /> Accept
          </button>
          <button
            onClick={() => onReject(farmer.id)}
            className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 py-2 px-4 rounded-lg flex items-center justify-center gap-2 text-sm font-medium transition-colors"
          >
            <FiXCircle size={16} /> Reject
          </button>
        </div>
      )}
    </div>
  );
};

const FarmerCommoditySales: React.FC = () => {
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const handleAccept = (id: string) => {
    setFarmers(prev => prev.map(f => 
      f.id === id ? { ...f, status: "accepted" } : f
    ));
    console.log("Accepted farmer:", id);
  };

  const handleReject = (id: string) => {
    setFarmers(prev => prev.map(f => 
      f.id === id ? { ...f, status: "rejected" } : f
    ));
    console.log("Rejected farmer:", id);
  };

  const filteredFarmers = farmers.filter(farmer =>
    farmer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    farmer.cropType.toLowerCase().includes(searchQuery.toLowerCase()) ||
    farmer.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const fetchInterests = async () => {
      try {
        const res = await fetch("/api/purchase-requests/interests");
        const { interests } = await res.json();

        console.log("Fetched interests:", interests);

        if (!Array.isArray(interests)) {
          throw new Error("Invalid interests array");
        }

        const result = await fetch("/api/users/filter", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userIds: interests }),
        });

        const data1 = await result.json();
        const filteredUsers = data1.users?.filter((user: any) =>
          interests.includes(user.clerkId)
        );

        console.log("Filtered users with matching clerkId:", filteredUsers);
        setFarmers(filteredUsers);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInterests();
  }, []);

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          Farmer Commodity Sales
        </h1>
        <p className="text-gray-600">Manage and review farmer sales requests</p>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="relative w-full md:w-64">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search farmers..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <button className="bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 border border-gray-300 text-sm font-medium">
            <FiFilter size={16} /> Filter
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      ) : filteredFarmers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredFarmers.map((farmer) => (
            <FarmerCard
              key={farmer.id}
              farmer={farmer}
              onAccept={handleAccept}
              onReject={handleReject}
            />
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 rounded-xl p-8 text-center border border-gray-200">
          <div className="mx-auto w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <FiUser className="text-gray-400 text-3xl" />
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">
            {searchQuery ? "No matching farmers found" : "No Farmers Available"}
          </h3>
          <p className="text-gray-500 max-w-md mx-auto">
            {searchQuery 
              ? "Try adjusting your search query to find what you're looking for."
              : "There are currently no farmers interested in selling. Check back later."}
          </p>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="mt-4 text-green-600 hover:text-green-700 font-medium text-sm"
            >
              Clear search
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default FarmerCommoditySales;