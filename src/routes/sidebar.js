import Squares2X2Icon from "@heroicons/react/24/outline/Squares2X2Icon";
import { TbBrandProducthunt } from "react-icons/tb";
import { FiUserCheck } from "react-icons/fi";

const iconClasses = `h-6 w-6`;

let routes = [
  {
    path: "/app/dashboard",
    icon: <Squares2X2Icon className={iconClasses} />,
    name: "Dashboard",
  },
  {
    path: "/app/products",
    icon: <TbBrandProducthunt className={iconClasses} />,
    name: "Products",
  },
  {
    path: "/app/products-category",
    icon: <TbBrandProducthunt className={iconClasses} />,
    name: "Products Category",
  },
  {
    path: "/app/size",
    icon: <FiUserCheck className={iconClasses} />,
    name: "Users",
  },
];


export default routes;
