import { lazy } from 'react'
const Dashboard = lazy(() => import('../pages/protected/Dashboard'));
let routes = [
  {
    path: '/dashboard', // the url
    component: Dashboard, // component
  },
  
  
];
export default routes
