import React, { useState, useEffect, useRef } from "react";
import InsertFrom from "./InsertFrom";
import {
  handleSearchProduct,
  extractErrorMessage,
} from "./service/productService";
import { toast } from "react-toastify";

export const TopBar = ({ setProduct, reload, setReload }) => {
  const [openForm, setOpenForm] = useState(false);
  const [requestData, setRequestData] = useState({
    storeId: "",
    tenSanPham: "",
    tenDanhMuc: "",
    giaTu: "",
    giaDen: "",
    sapXep: "",
  });

  const isFirstRender = useRef(true);
  const isSecondRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    } else if (isSecondRender.current) {
      isSecondRender.current = false;
      return;
    } else {
      handleSubmit(requestData);
    }
  }, [reload]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRequestData({
      ...requestData,
      [name]: value,
    });
  };

  const handleSubmit = async (requestData) => {
    const finalPayload = {
      tenSanPham: requestData.tenSanPham || null,
      tenDanhMuc: requestData.tenDanhMuc || null,
      storeId: requestData.storeId ? parseInt(requestData.storeId) : null,
      giaTu: requestData.giaTu ? parseFloat(requestData.giaTu) : null,
      giaDen: requestData.giaDen ? parseFloat(requestData.giaDen) : null,
      sapXep: requestData.sapXep || "Ngay_dang_DESC",
    };
    if (finalPayload.storeId === null) {
      toast.warning("Vui lòng nhập Store ID!");
      return;
    }
    console.log("Dữ liệu chuẩn sẽ gửi đi:", finalPayload);
    try {
      const data = await handleSearchProduct(finalPayload);
      setProduct(data);

      toast.success("Lọc thành công!");
    } catch (error) {
      if (error.response) {
        const rawData = error.response.data;
        const cleanMessage = extractErrorMessage(rawData);
        toast.error(cleanMessage);
      } else {
        toast.error("Không kết nối được Server!");
      }
    }
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  return (
    <div>
      {openForm && (
        <InsertFrom
          onClose={handleCloseForm}
          setReload={setReload}
          reload={reload}
        />
      )}

      <div className="flex flex-col gap-2 bg-white px-8 pt-4 border border-y-gray-300 border-x-0">
        <div className="col-span-2 flex justify-between">
          <div className="">
            <p className="font-bold text-2xl">Product Management</p>
            <p className="text-gray-500">
              Manage your inventory and product listings
            </p>
          </div>
          <div className="flex gap-6 h-10 pt-3 ">
            <button
              className="transition delay-50 duration-300 ease-in-out bg-gray-50 w-30 h-10 border border-gray-300 rounded-2xl hover:-translate-y-1 hover:scale-110 hover:bg-white"
              onClick={() => handleSubmit(requestData)}
            >
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
              name="storeId"
              value={requestData.storeId}
              onChange={handleChange}
              className="bg-gray-100 py-1.5 rounded-2xl border border-gray-300 px-2"
              placeholder="Enter store ID"
            />
          </div>

          <div className="col-span-2 flex flex-col gap-0.5">
            <p className="px-2">Product Name</p>
            <input
              type="text"
              name="tenSanPham"
              value={requestData.tenSanPham}
              onChange={handleChange}
              className="bg-gray-100 py-1.5 rounded-2xl border border-gray-300 px-2"
              placeholder="Enter product name"
            />
          </div>

          <div className="flex flex-col gap-0.5">
            <p className="px-2">Category Name</p>
            <input
              type="text"
              name="tenDanhMuc"
              value={requestData.tenDanhMuc}
              onChange={handleChange}
              className="bg-gray-100 py-1.5 rounded-2xl border border-gray-300 px-2"
              placeholder="Enter category name"
            />
          </div>

          <div className="flex flex-col gap-0.5">
            <p className="px-2">Min Price</p>
            <input
              type="number"
              name="giaTu"
              value={requestData.giaTu}
              onChange={handleChange}
              className="bg-gray-100 py-1.5 rounded-2xl border border-gray-300 px-2"
              placeholder="Min price"
            />
          </div>

          <div className="flex flex-col gap-0.5">
            <p className="px-2">Max Price</p>
            <input
              type="number"
              name="giaDen"
              value={requestData.giaDen}
              onChange={handleChange}
              className="bg-gray-100 py-1.5 rounded-2xl border border-gray-300 px-2"
              placeholder="Max price"
            />
          </div>

          <div className="flex flex-col gap-0.5 relative">
            <p className="px-2">Sort by</p>
            <select
              id=""
              name="sapXep"
              value={requestData.sapXep}
              onChange={handleChange}
              className="appearance-none bg-gray-100 py-1.5 rounded-2xl border border-gray-300 px-2 outline-none cursor-pointer"
            >
              <option value=""></option>
              <option value="Ten_ASC">Tên (A-Z) </option>
              <option value="Ten_DESC">Tên (Z-A)</option>
              <option value="Gia_ASC">Giá (Tăng dần)</option>
              <option value="Gia_DESC">Giá (Giảm dần)</option>
              <option value="Ngay_dang_ASC">Ngày đăng (Giảm dần)</option>
              <option value="Ngay_dang_DESC">Ngày đăng (Giảm dần)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
