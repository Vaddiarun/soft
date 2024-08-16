import React from "react";
import { Link } from "react-router-dom";

// Reusable Card Component
const FoodCard = ({ imageUrl, title }) => (
  <div className="relative w-[250px] h-[250px] rounded-xl overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105">
    <div
      className="w-full h-full bg-cover bg-center"
      style={{ backgroundImage: `url(${imageUrl})` }}
      aria-label={title}
    ></div>
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <h1 className="text-white text-xl font-semibold">{title}</h1>
    </div>
  </div>
);

const FoodSection = () => {
  return (
    <div
      className="bg-gradient-to-r from-[#e9e4f0 ] to-[#decce3] 
                 w-full 
                 h-screen 
                 flex 
                 flex-col 
                 lg:flex-row 
                 items-center 
                 justify-center
                 bg-no-repeat
                 bg-cover 
                 gap-10 
                 p-8"
    >
      <Link to="/menu/food">
        <FoodCard
          imageUrl="https://images.squarespace-cdn.com/content/v1/5942c74e8419c2dea969f0c3/1630187019176-DFFVMYLKSZCG61O388QG/fried+pickle+burger.jpg?format=2500w"
          title="Food"
        />
      </Link>
      <Link to="/menu/softdrinks">
        <FoodCard
          imageUrl="https://lolohomekitchen.com/wp-content/uploads/2021/09/Over-the-Top-Milkshake-4-scaled.jpg"
          title="MilkShakes"
        />
      </Link>
    </div>
  );
};

export default FoodSection;
