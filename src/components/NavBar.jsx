import React from "react";
import { Link } from "react-router-dom";
import astronautLogo from "../assets/astronaut.png";

const NavBar = () => {
  return (
    <nav className="bg-black p-4 border-b border-gray-800">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <img
            src={astronautLogo}
            alt="Astronaut Logo"
            className="h-8 w-8"
          />
          <span className="text-white text-xl font-automn">
            Nasa Day
          </span>
        </Link>

        <div className="flex gap-6">
          <Link
            to="/"
            className="text-white hover:text-gray-300 transition-colors font-automn"
          >
            APOD
          </Link>
          <Link
            to="/mars-rover"
            className="text-white hover:text-gray-300 transition-colors font-automn"
          >
            Mars Rover
          </Link>
          <Link
            to="/asteroid"
            className="text-white hover:text-gray-300 transition-colors font-automn"
          >
            Asteroid
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
