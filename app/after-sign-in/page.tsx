"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export default function AfterSignIn() {
  const router = useRouter();
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (!isLoaded) return;

    const checkProfile = async () => {
      try {
        const res = await fetch(`/api/get-profile?clerkUserId=${user?.id}`);
        if (!res.ok) throw new Error("Failed to fetch profile");

        const profile = await res.json();

        if (!profile.role) {
          router.push("/complete-profile");
        } else if (profile.role === "FARMER") {
          router.push("/farmer/dashboard");
        } else if (profile.role === "CONTRACTOR") {
          router.push("/contractor/dashboard");
        } else {
          router.push("/complete-profile");
        }
      } catch (err) {
        console.error(err);
        router.push("/complete-profile");
      }
    };

    checkProfile();
  }, [user, isLoaded, router]);

  return <p>Redirecting...</p>;
}
