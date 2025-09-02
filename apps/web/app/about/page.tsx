"use client";

import { useRouter } from "next/navigation";

export default function AboutPage() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/logout`, {
      method: "POST",
    });
    document.cookie =
      "connect.sid=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    router.push("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-900">About Page</h1>
        <p className="mt-2 text-gray-600">You are successfully logged in.</p>
        <button
          onClick={handleLogout}
          className="w-full px-4 py-2 mt-6 font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
