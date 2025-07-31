// NotFound.jsx
import React from 'react';

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-white text-gray-800 p-4">
      <svg
        width="200"
        height="200"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 2L2 7l10 5 10-5-10-5zm0 18l10-5V9l-10 5-10-5v6l10 5z"
          fill="#4F46E5"
        />
        <text
          x="12"
          y="15"
          textAnchor="middle"
          fill="#000"
          fontSize="10"
          fontFamily="Verdana"
        >
          404
        </text>
      </svg>
      <h1 className="text-3xl font-bold mt-4">Page Not Found</h1>
      <p className="text-gray-500 mt-2 text-center max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <a
        href="/"
        className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
      >
        Go Home
      </a>
    </div>
  );
}
