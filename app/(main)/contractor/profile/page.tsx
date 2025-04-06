"use client";

import React, { useEffect, useState } from "react";
import { FiBriefcase, FiStar, FiDollarSign, FiClock, FiMapPin, FiTruck, FiPhone, FiMail } from "react-icons/fi";
import { GiCommercialAirplane } from "react-icons/gi";
import { useUser } from "@clerk/nextjs";

interface ContractorData {
  id: string;
  clerkId: string;
  name: string;
  phone: string;
  email: string | null;
  role: string;
  state: string;
  city: string;
  // Add other fields from your DB as needed
}

const ContractorProfile = () => {
  const { user } = useUser();
  const [contractorData, setContractorData] = useState<ContractorData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchContractorData = async () => {
      try {
        const response = await fetch(`/api/contractor/${user?.id}`);
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        setContractorData(data);
      } catch (err) {
        setError("Failed to load contractor data");
      } finally {
        setLoading(false);
      }
    };

    console.log("user?.id in profile page:", user?.id);
    if (user?.id) fetchContractorData();
  }, [user?.id]);

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

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
                4.8 {/* Static rating until DB field exists */}
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {contractorData?.name || "Contractor Name"}
                  </h2>
                  <div className="flex items-center gap-1 text-gray-600 mt-1">
                    <FiMapPin className="text-blue-600" />
                    <span>
                      {contractorData?.city && contractorData?.state
                        ? `${contractorData.city}, ${contractorData.state}`
                        : "Location not specified"}
                    </span>
                  </div>
                </div>
                <div className="mt-3 md:mt-0 bg-blue-50 text-blue-800 px-3 py-1 rounded-full text-sm">
                  Member since 2015 {/* Static until DB field exists */}
                </div>
              </div>
              {/* Add additional fields from your DB as needed */}
              <div className="mt-4 space-y-2">
                <p className="text-gray-600">
                  <FiPhone className="inline mr-2" />
                  {contractorData?.phone || "N/A"}
                </p>
                <p className="text-gray-600">
                  <FiMail className="inline mr-2" />
                  {contractorData?.email || "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractorProfile;