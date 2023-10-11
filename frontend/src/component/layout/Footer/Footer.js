import React from "react";
import { FaInstagram, FaYoutube, FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 px-4">
      <div className="container mx-auto flex flex-wrap flex-col sm:flex-row">
        <div className="w-full sm:w-1/3 mb-8 sm:mb-0">
          <h4 className="text-2xl font-bold mb-4">BookQuestShop</h4>
          <p className="text-sm">High Quality is our first priority</p>
        </div>

        <div className="w-full sm:w-1/3 mb-8 sm:mb-0">
          <h4 className="text-2xl font-bold mb-4">Follow Us</h4>
          <div className="flex">
            <a href="http://instagram.com/bookquestshop" className="mr-4 text-xl">
              <FaInstagram />
            </a>
            <a href="http://youtube.com/bookquestshop" className="mr-4 text-xl">
              <FaYoutube />
            </a>
            <a href="http://facebook.com/bookquestshop" className="mr-4 text-xl">
              <FaFacebook />
            </a>
          </div>
        </div>

        <div className="w-full sm:w-1/3">
          <h4 className="text-2xl font-bold mb-4">Contact Us</h4>
          <p className="text-sm">Email: info@bookquestshop.com</p>
          <p className="text-sm">Phone: 123-456-7890</p>
        </div>
      </div>

      <div className="container mx-auto mt-8">
        <p className="text-center text-sm">
          &copy; {new Date().getFullYear()} BookQuestShop. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
