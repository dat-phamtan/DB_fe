import React, { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import {
  handleInsertProduct,
  extractErrorMessage,
} from "./service/productService";
import { toast } from "react-toastify";

const InsertFrom = ({ onClose }) => {
  const [formData, setFormData] = useState({
    storeId: "",
    tenSanPham: "",
    moTaChiTiet: "",
    tinhTrang: "New",
    trongLuong: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    const payload = {
      ...formData,
      storeId: parseInt(formData.storeId),
      trongLuong: parseFloat(formData.trongLuong),
    };

    console.log("Dữ liệu chuẩn sẽ gửi đi:", payload);

    try {
      await handleInsertProduct(payload);

      toast.success("Thêm sản phẩm thành công!");

      setTimeout(() => {
        onClose();
      }, 2000);
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

  useEffect(() => {
    const mainContent = document.getElementById("main-content");

    if (mainContent) {
      const scrollbarWidth = mainContent.offsetWidth - mainContent.clientWidth;
      if (scrollbarWidth > 0) {
        const currentPadding = parseFloat(
          window.getComputedStyle(mainContent).paddingRight
        );

        const originalOverflow = mainContent.style.overflow;
        const originalPaddingRight = mainContent.style.paddingRight;

        mainContent.style.overflow = "hidden";
        mainContent.style.paddingRight = `${currentPadding + scrollbarWidth}px`;

        return () => {
          mainContent.style.overflow = originalOverflow;
          mainContent.style.paddingRight = originalPaddingRight;
        };
      } else {
        const originalOverflow = mainContent.style.overflow;
        mainContent.style.overflow = "hidden";
        return () => {
          mainContent.style.overflow = originalOverflow;
        };
      }
    }
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center">
      <div className="absolute inset-0 bg-black/30"></div>

      <div className="bg-white relative h-4/5 w-1/2 shadow-2xl rounded-xl flex flex-col p-6 animate-scaleIn">
        <RxCross1
          onClick={onClose}
          size={32}
          className="absolute right-4 top-4 cursor-pointer text-gray-400 hover:text-red-500 transition-colors"
        />

        <h1 className="text-2xl font-bold mb-6 text-gray-800 pt-5">
          Create new product
        </h1>

        <div className="flex flex-col gap-6 flex-1 pt-12 overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700 px-1">
                Product name
              </label>
              <input
                type="text"
                name="tenSanPham"
                value={formData.tenSanPham}
                onChange={handleChange}
                className="bg-gray-50 py-2 px-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
                placeholder="Enter product name"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700 px-1">
                Store ID
              </label>
              <input
                type="number"
                name="storeId"
                value={formData.storeId}
                onChange={handleChange}
                className="bg-gray-50 py-2 px-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
                placeholder="Ex: 1"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700 px-1">
                Detail information
              </label>
              <textarea
                rows={9}
                type="text"
                name="moTaChiTiet"
                value={formData.moTaChiTiet}
                onChange={handleChange}
                className="bg-gray-50 py-2 px-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none resize-none"
                placeholder="Enter detail information"
              />
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700 px-1">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  name="trongLuong"
                  value={formData.trongLuong}
                  onChange={handleChange}
                  step="0.1"
                  className="bg-gray-50 py-2 px-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
                  placeholder="Ex: 0.1"
                />
              </div>

              <div className="flex flex-col gap-1.5 relative">
                <label className="text-sm font-medium text-gray-700 px-1">
                  Condition
                </label>
                <select
                  className="appearance-none bg-gray-50 py-2 px-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none cursor-pointer"
                  name="tinhTrang"
                  value={formData.tinhTrang}
                  onChange={handleChange}
                >
                  <option value="New">New</option>
                  <option value="Used">Used</option>
                  <option value="Refurbished">Refurbished</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium transition-colors hover:scale-110 cursor-pointer"
          >
            Cancel
          </button>
          <button
            className="px-6 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 font-medium transition-colors shadow-sm hover:scale-110 cursor-pointer"
            onClick={handleSubmit}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default InsertFrom;
