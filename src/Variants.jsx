import React from "react";
import { TfiWrite } from "react-icons/tfi";

const Variants = ({ selectedVariantData, onClose }) => {
  if (!selectedVariantData) return null;
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/30" onClick={onClose}></div>

      <div className="relative bg-white w-1/3 h-full shadow-2xl overflow-y-auto animate-slide-in">
        <div className="flex flex-col">
          <img
            src={selectedVariantData.images_path[0]}
            alt=""
            className="w-full object-cover"
          />
          <div className="flex flex-col gap-5 p-5">
            <div className="flex flex-col gap-5">
              <h1 className="font-bold text-3xl">{selectedVariantData.name}</h1>
              <div className="grid grid-cols-6 items-center">
                <p className="col-span-5">{selectedVariantData.detail}</p>
                <TfiWrite
                  size={30}
                  className="text-yellow-600 hover:scale-130 cursor-pointer"
                ></TfiWrite>
              </div>
            </div>
            <div className="pt-5">
              {selectedVariantData.variants.map((variant, index) => {
                return (
                  <div
                    key={index}
                    className="border border-t-gray-300 border-x-transparent border-b-transparent"
                  >
                    <p className="font-medium">Mã sản phẩm: {variant.SKU}</p>
                    <div className="grid grid-cols-2">
                      <p>Giá: ${variant.price}</p>
                      <p>Màu: {variant.color}</p>
                      <p>Kích thước: {variant.size}</p>
                      <p>Tồn kho: {variant.stock}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Variants;
