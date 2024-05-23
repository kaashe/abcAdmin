import { lazy } from 'react'
const Dashboard = lazy(() => import('../pages/protected/Dashboard'));
const RequestedUsers = lazy(() => import('../pages/protected/RequestedUsers'));
const Products = lazy(() => import('../pages/protected/Products'));
let routes = [
  {
    path: '/dashboard', // the url
    component: Dashboard, // component
  },
  {
    path: '/users',
    component: RequestedUsers, 
  },
  {
    path: '/products',
    component: Products, 
  },
  
  
];
export default routes
