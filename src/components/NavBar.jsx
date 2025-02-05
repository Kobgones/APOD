import React from "react";
import { Link } from "react-router-dom";
import astronautLogo from "../assets/astronaut.png";

const NavBar = () => {
  return (
    <nav className="bg-gradient-to-r from-purple-500 to-blue-500 p-4 border-b border-gray-800 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <img
            src={astronautLogo}
            alt="Astronaut Logo"
            className="h-10 w-10 rounded-full shadow-md"
          />
          <span className="text-white text-2xl font-bold tracking-wide">
            Nasa Day
          </span>
        </Link>

        <div className="flex gap-8">
          <Link
            to="/"
            className="text-white hover:text-yellow-300 transition-colors font-semibold"
          >
            APOD
          </Link>
          <Link
            to="/mars-rover"
            className="text-white hover:text-yellow-300 transition-colors font-semibold"
          >
            Mars Rover
          </Link>
          <Link
            to="/asteroid"
            className="text-white hover:text-yellow-300 transition-colors font-semibold"
          >
            Asteroid
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
