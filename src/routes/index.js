import { lazy } from "react";
import ProductCategory from "../features/products/product-category";
const Dashboard = lazy(() => import("../pages/protected/Dashboard"));
const Products = lazy(() => import("../pages/protected/Products"));
const Users = lazy(() => import("../pages/protected/Users"));
const Withdraw = lazy(() => import("../pages/protected/Withdraw"));
let routes = [
  {
    path: "/dashboard", // the url
    component: Dashboard, // component
  },
  {
    path: "/products",
    component: Products,
  },
  {
    path: "/products-category",
    component: ProductCategory,
  },
  {
    path: "/user",
    component: Users,
  },
  {
    path: "/withdraw",
    component: Withdraw,
  },
];
export default routes;
