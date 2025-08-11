
// src/components/Footer.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => (
  <footer className="w-full py-4 bg-gray-900 flex justify-center gap-4">
    {/* 
    <h1 className="brand" style={{ display: 'none' }}>
      LoopRebel
    </h1> 
    */}
    {/* Footer navigation buttons */}
    <Link
      to="/"
      className="bg-green-600 text-white px-4 py-2 rounded shadow-md shadow-black hover:bg-green-700 transition"
    >
      Home
    </Link>
    <Link
      to="/login"
      className="bg-green-600 text-white px-4 py-2 rounded shadow-md shadow-black hover:bg-green-700 transition"
    >
      Login
    </Link>
    <Link
      to="/register"
      className="bg-green-600 text-white px-4 py-2 rounded shadow-md shadow-black hover:bg-green-700 transition"
    >
      Register
    </Link>
    {/* Add more buttons here if needed */}
  </footer>
);

export default Footer;



