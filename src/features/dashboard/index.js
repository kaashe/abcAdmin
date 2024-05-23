import DashboardStats from "./components/DashboardStats";
import BuildingStorefrontIcon from "@heroicons/react/24/outline/BuildingStorefrontIcon";
import CircleStackIcon from "@heroicons/react/24/outline/CircleStackIcon";
import CreditCardIcon from "@heroicons/react/24/outline/CreditCardIcon";
import ProductsCard from "../../components/Cards/ProductsCard";

const statsData = [
  {
    title: "Pending Users",
    value: "10",
    icon: <BuildingStorefrontIcon className="w-8 h-8" />,
    description: "",
  },
  {
    title: "Pending Products",
    value: "0",
    icon: <CreditCardIcon className="w-8 h-8" />,
    description: "",
  },
];
const productsData = [
  {
    title: "Shoes",
    price: "30",
    icon: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
    description: "Test products",
  },
  {
    title: "Cap",
    price: "10",
    icon: "https://alprints.com/wp-content/uploads/2023/03/Cap-Mockup-2.jpg",
    description: "Test products",
  },
  {
    title: "Shirt",
    price: "81",
    icon: "https://alprints.com/wp-content/uploads/2018/09/kids-tshirt-design.jpg",
    description: "Test Product",
  },
];

function Dashboard() {
  return (
    <>
      {/** ---------------------- Balance & Rewards Section ------------------------- */}
      <div className="grid lg:grid-cols-2 mt-2 md:grid-cols-2 grid-cols-1 gap-6">
        {statsData.map((d, k) => {
          return <DashboardStats key={k} {...d} colorIndex={k} />;
        })}
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
