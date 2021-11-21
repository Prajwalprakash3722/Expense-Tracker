import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../Assets/Expense.png";
import axios from "axios";
export default function NavBar() {
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});
  const [logged, setLoggedIn] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    window.location.pathname = "/";
  };
  useEffect(() => {
    setToken(localStorage.getItem("token"));
    if (token) {
      axios
        .get("http://localhost:3001/api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setUser(res.data[0]);
          setLoggedIn(true);
        });
    }
  }, [token]);
  return (
    <>
      <nav className="bg-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between">
            <div className="flex space-x-7">
              <div className="flex flex-col items-center">
                <Link to="/" className="flex items-center">
                  <img
                    src={Logo}
                    alt="Logo"
                    className="h-24 w-24"
                    height="800"
                    width="800"
                  />
                  <span className="font-semibold text-gray-500 text-lg">
                    Expense Tracker
                  </span>
                </Link>
              </div>
            </div>
            {!logged ? (
              <>
                <div className="hidden md:flex items-center space-x-1">
                  <Link
                    to="/"
                    className="py-4 px-2 text-blue-500 border-b-4 border-blue-500 font-semibold "
                  >
                    Home
                  </Link>
                  <Link
                    to="/about"
                    className="py-4 px-2 text-gray-500 font-semibold hover:text-blue-500 transition duration-300"
                  >
                    About
                  </Link>
                  <Link
                    to="/"
                    className="py-4 px-2 text-gray-500 font-semibold hover:text-blue-500 transition duration-300"
                  >
                    Services
                  </Link>

                  <Link
                    to="/"
                    className="py-4 px-2 text-gray-500 font-semibold hover:text-blue-500 transition duration-300"
                  >
                    Contact Us
                  </Link>
                </div>
                <div className="hidden md:flex items-center space-x-3 ">
                  <Link
                    to="/login"
                    className="p-3 font-medium text-gray-500 rounded hover:bg-blue-500 hover:text-white transition duration-300"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/register"
                    className="p-3 font-medium text-white bg-blue-500 rounded hover:bg-blue-400 transition duration-300"
                  >
                    Sign Up
                  </Link>
                </div>
              </>
            ) : (
              <>
                <div className="hidden md:flex items-center space-x-1">
                  <Link
                    to="/"
                    className="py-4 px-2 text-blue-500 border-b-4 border-blue-500 font-semibold "
                  >
                    Home
                  </Link>
                  <Link
                    to="/about"
                    className="py-4 px-2 text-gray-500 font-semibold hover:text-blue-500 transition duration-300"
                  >
                    About
                  </Link>
                  <Link
                    to="/dashboard"
                    className="py-4 px-2 text-gray-500 font-semibold hover:text-blue-500 transition duration-300"
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/"
                    className="py-4 px-2 text-gray-500 font-semibold hover:text-blue-500 transition duration-300"
                  >
                    Contact Us
                  </Link>
                </div>
                <div className="hidden md:flex items-center space-x-3 ">
                  <Link
                    to="/profile"
                    className="p-3 font-medium text-gray-500 rounded hover:bg-blue-500 hover:text-white transition duration-300"
                  >
                    {user.name}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="p-3 font-medium text-white bg-blue-500 rounded hover:bg-blue-400 transition duration-300"
                  >
                    Logout
                  </button>
                </div>
              </>
            )}

            <div className="md:hidden flex items-center">
              <button className="outline-none mobile-menu-button">
                <svg
                  className=" w-6 h-6 text-gray-500 hover:text-blue-500 "
                  x-show="!showMenu"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="hidden mobile-menu">
          <ul className="">
            {!logged ? (
              <>
                <li className="active">
                  <Link
                    to="/"
                    className="block text-sm px-2 py-4 hover:bg-blue-500 transition duration-300"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="block text-sm px-2 py-4 hover:bg-blue-500 transition duration-300"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className="block text-sm px-2 py-4 hover:bg-blue-500 transition duration-300"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className="block text-sm px-2 py-4 hover:bg-blue-500 transition duration-300"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/login"
                    className="block text-sm px-2 py-4 hover:bg-blue-500 transition duration-300"
                  >
                    Log In
                  </Link>{" "}
                </li>
                <li>
                  <Link
                    to="/register"
                    className="block text-sm px-2 py-4 hover:bg-blue-500 transition duration-300"
                  >
                    Sign Up
                  </Link>{" "}
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/"
                    className="block text-sm px-2 py-4 hover:bg-blue-500 transition duration-300"
                  >
                    Home
                  </Link>{" "}
                </li>
                <li>
                  <Link
                    to="/about"
                    className="block text-sm px-2 py-4 hover:bg-blue-500 transition duration-300"
                  >
                    About
                  </Link>{" "}
                </li>
                <li>
                  <Link
                    to="/dashboard"
                    className="block text-sm px-2 py-4 hover:bg-blue-500 transition duration-300"
                  >
                    Dashboard
                  </Link>{" "}
                </li>
                <li>
                  <Link
                    to="/"
                    className="block text-sm px-2 py-4 hover:bg-blue-500 transition duration-300"
                  >
                    Contact Us
                  </Link>{" "}
                </li>
                <li>
                  <Link
                    to="/profile"
                    className="block text-sm px-2 py-4 hover:bg-blue-500 transition duration-300"
                  >
                    {user.name}
                  </Link>{" "}
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="block text-sm px-2 py-4 hover:bg-blue-500 transition duration-300"
                  >
                    Logout
                  </button>{" "}
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}
