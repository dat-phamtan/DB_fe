import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import InsertFrom from "./InsertFrom";

export const TopBar = () => {
  const [openForm, setOpenForm] = useState(false);

  const handleCloseForm = () => {
    setOpenForm(false);
  };
  return (
    <div>
      {openForm && <InsertFrom onClose={handleCloseForm} />}

      <div className="flex flex-col gap-2 bg-white px-8 pt-4 border border-y-gray-300 border-x-0">
        <div className="col-span-2 flex justify-between">
          <div className="">
            <p className="font-bold text-2xl">Product Management</p>
            <p className="text-gray-500">
              Manage your inventory and product listings
            </p>
          </div>
          <div className="flex gap-6 h-10 pt-3 ">
            <button className="transition delay-50 duration-300 ease-in-out bg-gray-50 w-30 h-10 border border-gray-300 rounded-2xl hover:-translate-y-1 hover:scale-110 hover:bg-white">
              Filter
            </button>
            <button
              className="transition delay-50 duration-300 ease-in-out bg-blue-800 text-white w-30 h-10 border border-gray-300 rounded-2xl hover:-translate-y-1 hover:scale-110 hover:bg-blue-600"
              onClick={() => setOpenForm(true)}
            >
              Add product
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-x-3 pb-2">
          <div className="flex flex-col gap-0.5">
            <p className="px-2">Store ID</p>
            <input
              type="text"
              className="bg-gray-100 py-1.5 rounded-2xl border border-gray-300 px-2"
              placeholder="Enter store ID"
            />
          </div>

          <div className="col-span-2 flex flex-col gap-0.5">
            <p className="px-2">Product Name</p>
            <input
              type="text"
              className="bg-gray-100 py-1.5 rounded-2xl border border-gray-300 px-2"
              placeholder="Enter product name"
            />
          </div>

          <div className="flex flex-col gap-0.5">
            <p className="px-2">Category Name</p>
            <input
              type="text"
              className="bg-gray-100 py-1.5 rounded-2xl border border-gray-300 px-2"
              placeholder="Enter category name"
            />
          </div>

          <div className="flex flex-col gap-0.5">
            <p className="px-2">Min Price</p>
            <input
              type="text"
              className="bg-gray-100 py-1.5 rounded-2xl border border-gray-300 px-2"
              placeholder="Min price"
            />
          </div>

          <div className="flex flex-col gap-0.5">
            <p className="px-2">Max Price</p>
            <input
              type="text"
              className="bg-gray-100 py-1.5 rounded-2xl border border-gray-300 px-2"
              placeholder="Max price"
            />
          </div>

          <div className="flex flex-col gap-0.5 relative">
            <p className="px-2">Sort by</p>
            <select
              name=""
              id=""
              className="appearance-none bg-gray-100 py-1.5 rounded-2xl border border-gray-300 px-2 outline-none cursor-pointer"
            >
              <option value=""></option>
              <option value="">Tên (A-Z) </option>
              <option value="">Tên (Z-A)</option>
              <option value="">Giá (Tăng dần)</option>
              <option value="">Giá (Giảm dần)</option>
              <option value="">Ngày đăng (Giảm dần)</option>
              <option value="">Ngày đăng (Giảm dần)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
