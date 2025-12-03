import React from "react";
import { SideBar } from "./SideBar";
import TopBar from "./TopBar";
import ProductDetail from "./ProductDetail";
import { ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="flex h-screen bg-gray-50">
        <SideBar />
        <div className="flex-1 flex flex-col">
          <TopBar />
          <div id="main-content" className="p-6 overflow-y-auto">
            <ProductDetail></ProductDetail>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
