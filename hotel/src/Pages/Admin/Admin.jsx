import React from "react";
import AdminHeader from "../../Components/AdminHeaader/AdminHeader";
import { useSelector } from "react-redux";
import MenuItem from "../../Components/MenuItem/MenuItem.jsx";

const categories = [
  "momos",
  "milkshakes",
  "falooda",
  "lassi",
  "burgers",
  "fries",
  "maggi",
  "icecream",
  "special-icecreams",
  "muds",
  "dry-fruit-shake",
  "coffee",
  "cappuccino",
  "mojito",
  "addons",
  "freshjuice",
];

export default function Admin() {
  return (
    <div className="bg-white min-h-screen">
      <AdminHeader />
      <div>
        <div className="p-1">
          {categories.map((each) => (
            <>
              <h1 className="pl-3 text-xl font-bold">{each.toUpperCase()}</h1>
              <MenuItem category={each} />
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
