import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white py-12 border-t">
      <div className="container mx-auto px-6 lg:px-12 grid grid-cols-2 md:grid-cols-4 gap-10 mb-10">
        {[
          {
            title: "About Us",
            links: ["Our Story", "Careers", "Press"],
          },
          {
            title: "Services",
            links: ["Food & Alcohol Delivery", "Grocery Delivery", "Pharmacy Delivery"],
          },
          {
            title: "Partner",
            links: ["Become a Partner", "Partner Portal", "Partner Resources"],
          },
          {
            title: "Support",
            links: ["Help Center", "Contact Us", "Terms & Conditions"],
          },
        ].map((col, i) => (
          <div key={i}>
            <h4 className="font-bold text-gray-900 mb-4">{col.title}</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              {col.links.map((link, j) => (
                <li key={j}>
                  <a href="#" className="hover:text-purple-600 transition">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="text-center text-xs text-gray-500">
        © 2025 Sara Shopy. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;