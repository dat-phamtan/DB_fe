import React, { useState } from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import { BsBoxSeam } from "react-icons/bs";
import { PiShoppingCart } from "react-icons/pi";
import { LuChartColumn } from "react-icons/lu";
import { LuSettings } from "react-icons/lu";
import { BsPeople } from "react-icons/bs";

//SIDEBAR_WIDTH = 60;

export const SideBar = () => {
  const [activeTab, setActiveTab] = useState("Products");

  const menuItems = [
    { id: "dashboard", icon: <LuLayoutDashboard />, label: "Dashboard" },
    { id: "products", icon: <BsBoxSeam />, label: "Products" },
    { id: "customers", icon: <BsPeople />, label: "Customers" },
    { id: "orders", icon: <PiShoppingCart />, label: "Orders" },
    { id: "analytics", icon: <LuChartColumn />, label: "Analytics" },
    { id: "settings", icon: <LuSettings />, label: "Settings" },
  ];
  // const clickedPage =
  return (
    <div className="grid grid-flow-col grid-rows-6 divide-y divide-gray-300 bg-white w-60 h-screen border border-gray-300 ">
      <div className="flex items-center gap-2 px-4">
        <img src="/logo_BlueShopee.png" width={50} alt="" />
        <p className="font-bold text-xl">BlueShopee</p>
      </div>

      <div className="flex flex-col gap-1 row-span-4 px-3 py-4 font-semibold">
        {menuItems.map((item) => {
          const isActive = activeTab === item.label;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.label)}
              className={`flex items-center gap-2 h-10 border border-transparent rounded-md px-2 ${
                isActive ? "bg-blue-50 text-blue-600" : ""
              }
            `}
            >
              {item.icon}
              <p>{item.label}</p>
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-4 p-5">
        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold shrink-0">
          TS
        </div>

        <div>
          <p className="font-semibold text-gray-900">Tony Stark</p>
          <p className="text-sm text-gray-500">Seller</p>
        </div>
      </div>
    </div>
  );
};
