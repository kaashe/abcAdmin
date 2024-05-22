import React from 'react';
import TitleCard from './TitleCard';

function ProductsCard({ title, icon, price, description, colorIndex }) {
  const COLORS = ["primary", "primary"];

  const getDescStyle = () => {
    if (description.includes("↗︎")) return "font-bold text-green-700 dark:text-green-300";
    else if (description.includes("↙")) return "font-bold text-rose-500 dark:text-red-400";
    else return "";
  }

  return (
      <div className="card card-compact w-95 bg-base-100 shadow-xl p-1">
        <figure>
          <img src={icon} alt={title} className={`w-full h-48 object-cover`} />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <p className={`text-${COLORS[colorIndex % 1]} text-2xl`}>Price:{price}</p>
          <p className={"stat-desc " + getDescStyle()}>{description}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={()=>alert('Review Sent!')}>Review Now</button>
          </div>
        </div>
      </div>
  );
}

export default ProductsCard;
