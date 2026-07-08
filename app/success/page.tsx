"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function SuccessContent() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "Member";

  return (
    <div className="bg-white/90 max-w-2xl w-full rounded-2xl shadow-2xl p-8 text-center">
      <img
        src="/images/logo.jpeg"
        alt="Bread of Life Logo"
        className="w-24 h-24 mx-auto mb-6 object-contain"
      />

      <h1 className="text-4xl font-bold text-blue-900 mb-4">
        Registration Successful!
      </h1>

      <p className="text-xl text-gray-800">
        Hello, <strong>{name}</strong>
      </p>

      <p className="mt-4 text-lg text-gray-700">
        You have successfully registered for the
      </p>

      <p className="text-2xl font-bold text-blue-900 mt-2">
        3 Days of Power Conference
      </p>

      <p className="mt-6 text-gray-700">
        We look forward to welcoming you to Bread of Life Church International - Livingstone.
      </p>

      <Link
        href="/"
        className="inline-block mt-8 bg-blue-900 text-white px-8 py-3 rounded-xl font-bold"
      >
        Back to Registration
      </Link>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <main
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-6"
      style={{
        backgroundImage: "url('/images/church.jpeg')",
      }}
    >
      <Suspense fallback={<p className="text-white">Loading...</p>}>
        <SuccessContent />
      </Suspense>
    </main>
  );
}