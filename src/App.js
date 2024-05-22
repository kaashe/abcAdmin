import React, { lazy, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { themeChange } from "theme-change";
import checkAuth from "./app/auth";
// pages
const Layout = lazy(() => import("./containers/Layout"));
const Login = lazy(() => import("./pages/Login"));

// Check for login and initialize
const token = checkAuth();
function App() {
  useEffect(() => {
    themeChange(false);
  }, []);
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/app/*" element={<Layout />} />
          <Route
            path="*"
            element={
              <Navigate to={token ? "/app/dashboard" : "/login"} replace />
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
