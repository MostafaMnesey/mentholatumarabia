"use client";
import React, { useEffect } from "react";

export default function BlinkTestPage() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.open("https://eye-blink-checker.vercel.app/", "_self");
    }
  }, []);

  return (
    <div className="flex justify-center items-center h-[60vh] text-gray-500">
      Redirecting to Blink Checker...
    </div>
  );
}
