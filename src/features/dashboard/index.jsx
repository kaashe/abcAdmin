import React, { useEffect, useState } from 'react';
import DashboardStats from "./components/DashboardStats";
import BuildingStorefrontIcon from "@heroicons/react/24/outline/BuildingStorefrontIcon";
import CircleStackIcon from "@heroicons/react/24/outline/CircleStackIcon";
import CreditCardIcon from "@heroicons/react/24/outline/CreditCardIcon";
import ProductsCard from "../../components/Cards/ProductsCard";
import { useGetProductsQuery } from "../products/productsSlice";
import { useGetUsersQuery } from "../users/usersSlice";
import BarChart from './components/BarChart';
import LineChart from './components/LineChart';

// const statsData = [
//   {
//     title: "Active Users",
//     value: "100",
//     icon: <BuildingStorefrontIcon className="w-8 h-8" />,
//     description: "",
//   },
//   {
//     title: "Inactive Users",
//     value: "23",
//     icon: <BuildingStorefrontIcon className="w-8 h-8" />,
//     description: "",
//   },
//   {
//     title: "Total Products",
//     value: "760",
//     icon: <CreditCardIcon className="w-8 h-8" />,
//     description: "",
//   },
// ];
// const productsData = [
//   {
//     title: "Shoes",
//     price: "30",
//     icon: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
//     description: "Test products",
//   },
//   {
//     title: "Cap",
//     price: "10",
//     icon: "https://alprints.com/wp-content/uploads/2023/03/Cap-Mockup-2.jpg",
//     description: "Test products",
//   },
//   {
//     title: "Shirt",
//     price: "81",
//     icon: "https://alprints.com/wp-content/uploads/2018/09/kids-tshirt-design.jpg",
//     description: "Test Product",
//   },
// ];

function Dashboard() {
  const { data, isLoading, isError, error } = useGetProductsQuery();
  const { usersData } = useGetUsersQuery();
console.log("userdata", usersData)
  const [statsData, setStatsData] = useState([
    {
      title: "Active Users",
      value: "100",
      icon: <BuildingStorefrontIcon className="w-8 h-8" />,
      description: "",
    },
    {
      title: "Inactive Users",
      value: "23",
      icon: <BuildingStorefrontIcon className="w-8 h-8" />,
      description: "",
    },
    {
      title: "Total Products",
      value: "loading", // Initial value before data is loaded
      icon: <CreditCardIcon className="w-8 h-8" />,
      description: "",
    },
  ]);

  useEffect(() => {
    if (data && data.data && data.data.products) {
      const totalProducts = data.data.products.length;
      setStatsData(prevStatsData => prevStatsData.map(stat => 
        stat.title === "Total Products" ? { ...stat, value: totalProducts } : stat
      ));
    }
  }, [data]);

  return (
    <>
      {/** ---------------------- Balance & Rewards Section ------------------------- */}
      <div className="grid lg:grid-cols-4 mt-2 md:grid-cols-2 grid-cols-1 gap-6">
        {statsData?.map((d, k) => {
          return <DashboardStats key={k} {...d} colorIndex={k} />;
        })}
      </div>
      <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
                <LineChart />
                <BarChart />
            </div>
      {/** ---------------------- Products Cards Section ------------------------- */}
      {/* <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
      {productsData.map((d, k) => {
          return <ProductsCard key={k} {...d} colorIndex={k} />;
        })}
      
      </div> */}
    </>
  );
}

export default Dashboard;
