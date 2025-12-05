import React, { useState, useEffect, useRef } from "react";
import { SideBar } from "./SideBar";
import TopBar from "./TopBar";
import ProductDetail from "./ProductDetail";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaStoreAlt, FaTools } from "react-icons/fa";

function App() {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);
  const [sideBarId, setSideBarId] = useState("products");
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
      console.log("Product:", products);
    }
  }, [products]);

  return (
    <div>
      <ToastContainer position="bottom-left" autoClose={3000} />
      <div className="flex h-screen bg-gray-50">
        <SideBar setSideBarId={setSideBarId} />

        <div className="flex-1 flex flex-col h-screen overflow-hidden">
          {sideBarId === "products" ? (
            <>
              <TopBar
                setProduct={setProducts}
                setReload={setReload}
                reload={reload}
              />
              <div id="main-content" className="p-6 overflow-y-auto flex-1">
                {products && products.length > 0 ? (
                  <ProductDetail
                    listProducts={products}
                    setReload={setReload}
                    reload={reload}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-[60vh] text-gray-400 border-2 border-dashed border-gray-300 rounded-xl bg-white/50">
                    <FaStoreAlt size={60} className="mb-4 text-gray-300" />
                    <h3 className="text-xl font-bold text-gray-600 mb-2">
                      Chưa có dữ liệu hiển thị
                    </h3>
                    <p className="text-md text-gray-500">
                      Vui lòng nhập{" "}
                      <span className="font-bold text-blue-600">Store ID</span>{" "}
                      (bắt buộc) và bấm Filter để xem danh sách sản phẩm.
                    </p>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <div className="p-8 rounded-full bg-gray-100 mb-6">
                <FaTools size={50} className="text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-600 mb-2">
                Chức năng đang phát triển
              </h3>
              <p className="text-gray-500 max-w-md text-center">
                Tính năng này sẽ sớm được ra mắt trong các bản cập nhật tiếp
                theo. Vui lòng quay lại sau!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
