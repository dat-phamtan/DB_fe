import React, { useEffect, useState, useRef } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa6";
import { ImCross } from "react-icons/im";
import Variants from "./Variants";
import {
  handleDeleteProduct,
  extractErrorMessage,
} from "./service/productService";
import { toast } from "react-toastify";

export const ProductDetail = ({ listProducts, setReload, reload }) => {
  // const listProducts = [
  //   {
  //     store_id: 1,
  //     product_id: 1,
  //     name: "Điện thoại Samsung Galaxy S24 Ultra 5G",
  //     detail: "AI Phone, Camera 200MP, Titan Frame",
  //     weight: 0.5,
  //     condition: "New",
  //     status: "Hidden", // Theo yêu cầu của bạn
  //     image_path: "https://placehold.co/400x400/252f3f/white?text=Samsung+S24",
  //     min_price: 1100,
  //     total_stock: 20,
  //     avg_star: 4.9,
  //   },
  //   {
  //     store_id: 1,
  //     product_id: 4,
  //     name: "Cáp Sạc Nhanh Anker PowerLine III Flow",
  //     detail: "Siêu bền, mềm mại, sạc nhanh 20W",
  //     weight: 0.1,
  //     condition: "New",
  //     status: "Hidden",
  //     image_path: "https://placehold.co/400x400/252f3f/white?text=Anker+Cable",
  //     min_price: 15,
  //     total_stock: 150,
  //     avg_star: 4.8,
  //   },

  //   {
  //     store_id: 2,
  //     product_id: 2,
  //     name: "Áo Polo Nam Coolmate Excool",
  //     detail: "Công nghệ thoáng khí, khử mùi",
  //     weight: 0.2,
  //     condition: "New",
  //     status: "Hidden",
  //     image_path:
  //       "https://placehold.co/400x400/e0e7ff/4f46e5?text=Polo+Coolmate",
  //     min_price: 12,
  //     total_stock: 200,
  //     avg_star: 4.7,
  //   },
  //   {
  //     store_id: 2,
  //     product_id: 7,
  //     name: "Giày Thể Thao Biti's Hunter X",
  //     detail: "Đế LiteFlex, quai kháng khuẩn",
  //     weight: 1.0,
  //     condition: "New",
  //     status: "Hidden",
  //     image_path:
  //       "https://placehold.co/400x400/e0e7ff/4f46e5?text=Bitis+Hunter",
  //     min_price: 45,
  //     total_stock: 80,
  //     avg_star: 4.6,
  //   },
  //   {
  //     store_id: 2,
  //     product_id: 8,
  //     name: "Áo Thun HADES Wolf Gang",
  //     detail: "Cotton 2 chiều, in lụa cao cấp",
  //     weight: 0.3,
  //     condition: "New",
  //     status: "Hidden",
  //     image_path: "https://placehold.co/400x400/e0e7ff/4f46e5?text=Hades+Tee",
  //     min_price: 25,
  //     total_stock: 50,
  //     avg_star: 4.5,
  //   },

  //   {
  //     store_id: 3,
  //     product_id: 6,
  //     name: "Nồi Chiên Không Dầu Lock&Lock 5.2L",
  //     detail: "Công nghệ Rapid Air, Giỏ chiên chống dính",
  //     weight: 5.0,
  //     condition: "New",
  //     status: "Hidden",
  //     image_path: "https://placehold.co/400x400/ecfccb/3f6212?text=LocknLock",
  //     min_price: 85,
  //     total_stock: 40,
  //     avg_star: 4.8,
  //   },
  //   {
  //     store_id: 3,
  //     product_id: 9,
  //     name: "Khô Gà Lá Chanh 500g",
  //     detail: "Thơm ngon giòn rụm, đạt chuẩn VSATTP",
  //     weight: 0.6,
  //     condition: "New",
  //     status: "Hidden",
  //     image_path: "https://placehold.co/400x400/ecfccb/3f6212?text=Kho+Ga",
  //     min_price: 8,
  //     total_stock: 500,
  //     avg_star: 4.9,
  //   },
  //   {
  //     store_id: 3,
  //     product_id: 10,
  //     name: "Gương Đứng Toàn Thân",
  //     detail: "Khung gỗ sồi, kích thước 1m6 x 50cm",
  //     weight: 8.0,
  //     condition: "New",
  //     status: "Hidden",
  //     image_path: "https://placehold.co/400x400/ecfccb/3f6212?text=Guong+Dung",
  //     min_price: 35,
  //     total_stock: 10,
  //     avg_star: 4.4,
  //   },

  //   {
  //     store_id: 4,
  //     product_id: 3,
  //     name: "Sách - Cây Cam Ngọt Của Tôi",
  //     detail: "Tiểu thuyết kinh điển về Zeze",
  //     weight: 0.4,
  //     condition: "New",
  //     status: "Hidden",
  //     image_path:
  //       "https://placehold.co/400x400/fef3c7/92400e?text=Sach+Cay+Cam",
  //     min_price: 6,
  //     total_stock: 100,
  //     avg_star: 5.0,
  //   },
  //   {
  //     store_id: 4,
  //     product_id: 5,
  //     name: "Kem Dưỡng La Roche-Posay B5+",
  //     detail: "Phục hồi da, làm dịu kích ứng",
  //     weight: 0.1,
  //     condition: "New",
  //     status: "Hidden",
  //     image_path: "https://placehold.co/400x400/fef3c7/92400e?text=B5+Baume",
  //     min_price: 18,
  //     total_stock: 200,
  //     avg_star: 4.9,
  //   },

  //   {
  //     store_id: 1,
  //     product_id: 11,
  //     name: "MacBook Air M2",
  //     detail: "Màu Midnight, 8GB/256GB",
  //     weight: 1.2,
  //     condition: "Refurbished",
  //     status: "Active",
  //     image_path: "https://placehold.co/400x400/252f3f/white?text=MacBook",
  //     min_price: 900,
  //     total_stock: 5,
  //     avg_star: 4.7,
  //   },
  //   {
  //     store_id: 3,
  //     product_id: 12,
  //     name: "Ghế Công Thái Học",
  //     detail: "Full lưới, Piston Class 4",
  //     weight: 15.0,
  //     condition: "New",
  //     status: "Active",
  //     image_path: "https://placehold.co/400x400/ecfccb/3f6212?text=Chair",
  //     min_price: 150,
  //     total_stock: 20,
  //     avg_star: 4.6,
  //   },
  // ];

  const listVariants = [
    // 1. Samsung S24 Ultra
    {
      product_id: 1,
      name: "Điện thoại Samsung Galaxy S24 Ultra 5G",
      detail: "AI Phone, Camera 200MP, Titan Frame",
      images_path: [
        "https://placehold.co/400x400/252f3f/white?text=S24+Front",
        "https://placehold.co/400x400/252f3f/white?text=S24+Back",
        "https://placehold.co/400x400/252f3f/white?text=S24+Pen",
      ],
      variants: [
        {
          SKU: "S24U-GRY-512",
          color: "Titan Grey",
          price: 1200,
          size: "512 GB",
          stock: 20,
        },
        {
          SKU: "S24U-YLW-256",
          color: "Titan Yellow",
          price: 1100,
          size: "256 GB",
          stock: 15,
        },
        {
          SKU: "S24U-VIO-1TB",
          color: "Titan Violet",
          price: 1400,
          size: "1 TB",
          stock: 5,
        },
      ],
    },

    // 2. Áo Polo Coolmate
    {
      product_id: 12,
      name: "Áo Polo Nam Coolmate Excool",
      detail: "Công nghệ thoáng khí, khử mùi",
      images_path: [
        "https://placehold.co/400x400/e0e7ff/4f46e5?text=Polo+Navy",
        "https://placehold.co/400x400/e0e7ff/4f46e5?text=Polo+Black",
        "https://placehold.co/400x400/e0e7ff/4f46e5?text=Fabric+Zoom",
      ],
      variants: [
        {
          SKU: "POLO-NAVY-L",
          color: "Navy Blue",
          price: 12,
          size: "L",
          stock: 50,
        },
        {
          SKU: "POLO-NAVY-XL",
          color: "Navy Blue",
          price: 12,
          size: "XL",
          stock: 30,
        },
        {
          SKU: "POLO-BLK-M",
          color: "Black",
          price: 12,
          size: "M",
          stock: 45,
        },
      ],
    },

    // 3. Sách Cây Cam Ngọt Của Tôi
    {
      product_id: 3,
      name: "Sách - Cây Cam Ngọt Của Tôi",
      detail: "Tiểu thuyết kinh điển về Zeze",
      images_path: [
        "https://placehold.co/400x400/fef3c7/92400e?text=Book+Cover",
        "https://placehold.co/400x400/fef3c7/92400e?text=Book+Back",
        "https://placehold.co/400x400/fef3c7/92400e?text=Page+Demo",
      ],
      variants: [
        {
          SKU: "BOOK-CAM-SOFT",
          color: "Bản Thường",
          price: 6,
          size: "Bìa Mềm",
          stock: 100,
        },
        {
          SKU: "BOOK-CAM-HARD",
          color: "Bản Đặc Biệt",
          price: 10,
          size: "Bìa Cứng",
          stock: 20,
        },
      ],
    },

    // 4. Cáp Sạc Anker
    {
      product_id: 4,
      name: "Cáp Sạc Nhanh Anker PowerLine III Flow",
      detail: "Siêu bền, mềm mại, sạc nhanh 20W",
      images_path: [
        "https://placehold.co/400x400/252f3f/white?text=Cable+White",
        "https://placehold.co/400x400/252f3f/white?text=Cable+Black",
        "https://placehold.co/400x400/252f3f/white?text=Box",
      ],
      variants: [
        {
          SKU: "ANKER-WHT-09",
          color: "Trắng",
          price: 15,
          size: "0.9m",
          stock: 80,
        },
        {
          SKU: "ANKER-BLK-18",
          color: "Đen",
          price: 18,
          size: "1.8m",
          stock: 40,
        },
      ],
    },

    // 5. Kem Dưỡng La Roche-Posay
    {
      product_id: 5,
      name: "Kem Dưỡng La Roche-Posay Cicaplast Baume B5+",
      detail: "Phục hồi da, làm dịu kích ứng",
      images_path: [
        "https://placehold.co/400x400/fef3c7/92400e?text=Tube+40ml",
        "https://placehold.co/400x400/fef3c7/92400e?text=Tube+100ml",
        "https://placehold.co/400x400/fef3c7/92400e?text=Texture",
      ],
      variants: [
        {
          SKU: "LRP-B5-40",
          color: "Trắng",
          price: 18,
          size: "40ml",
          stock: 150,
        },
        {
          SKU: "LRP-B5-100",
          color: "Trắng",
          price: 32,
          size: "100ml",
          stock: 50,
        },
      ],
    },

    // 6. Nồi Chiên Không Dầu Lock&Lock
    {
      product_id: 6,
      name: "Nồi Chiên Không Dầu Lock&Lock 5.2L",
      detail: "Công nghệ Rapid Air, Giỏ chiên chống dính",
      images_path: [
        "https://placehold.co/400x400/ecfccb/3f6212?text=Fryer+Black",
        "https://placehold.co/400x400/ecfccb/3f6212?text=Fryer+Inside",
        "https://placehold.co/400x400/ecfccb/3f6212?text=Fryer+White",
      ],
      variants: [
        {
          SKU: "LNL-FRY-BLK",
          color: "Đen Bóng",
          price: 85,
          size: "5.2L",
          stock: 25,
        },
        {
          SKU: "LNL-FRY-WHT",
          color: "Trắng Sứ",
          price: 85,
          size: "5.2L",
          stock: 15,
        },
      ],
    },

    // 7. Giày Biti's Hunter X
    {
      product_id: 7,
      name: "Giày Thể Thao Biti's Hunter X",
      detail: "Đế LiteFlex, quai kháng khuẩn",
      images_path: [
        "https://placehold.co/400x400/e0e7ff/4f46e5?text=Shoe+Side",
        "https://placehold.co/400x400/e0e7ff/4f46e5?text=Shoe+Top",
        "https://placehold.co/400x400/e0e7ff/4f46e5?text=Shoe+Sole",
      ],
      variants: [
        {
          SKU: "BITI-GRY-41",
          color: "Xám Ghi",
          price: 45,
          size: "41",
          stock: 30,
        },
        {
          SKU: "BITI-GRY-42",
          color: "Xám Ghi",
          price: 45,
          size: "42",
          stock: 25,
        },
        {
          SKU: "BITI-BLK-41",
          color: "Đen Tuyền",
          price: 45,
          size: "41",
          stock: 20,
        },
      ],
    },

    // 8. Áo Thun HADES
    {
      product_id: 8,
      name: "Áo Thun HADES Wolf Gang",
      detail: "Cotton 2 chiều, in lụa cao cấp",
      images_path: [
        "https://placehold.co/400x400/e0e7ff/4f46e5?text=Hades+Front",
        "https://placehold.co/400x400/e0e7ff/4f46e5?text=Hades+Back",
        "https://placehold.co/400x400/e0e7ff/4f46e5?text=Print+Detail",
      ],
      variants: [
        {
          SKU: "HADES-WOLF-M",
          color: "Washed Black",
          price: 25,
          size: "M",
          stock: 20,
        },
        {
          SKU: "HADES-WOLF-L",
          color: "Washed Black",
          price: 25,
          size: "L",
          stock: 30,
        },
      ],
    },

    // 9. Khô Gà Lá Chanh
    {
      product_id: 13,
      name: "Khô Gà Lá Chanh 500g",
      detail: "Thơm ngon giòn rụm, đạt chuẩn VSATTP",
      images_path: [
        "https://placehold.co/400x400/ecfccb/3f6212?text=Bag+500g",
        "https://placehold.co/400x400/ecfccb/3f6212?text=Chicken+Zoom",
        "https://placehold.co/400x400/ecfccb/3f6212?text=Jar+250g",
      ],
      variants: [
        {
          SKU: "GA-BAG-500",
          color: "Túi Zip",
          price: 8,
          size: "500g",
          stock: 400,
        },
        {
          SKU: "GA-JAR-250",
          color: "Hũ Nhựa",
          price: 5,
          size: "250g",
          stock: 100,
        },
      ],
    },

    // 10. Gương Đứng Toàn Thân
    {
      product_id: 11,
      name: "Gương Đứng Toàn Thân",
      detail: "Khung gỗ sồi, kích thước 1m6 x 50cm",
      images_path: [
        "https://placehold.co/400x400/ecfccb/3f6212?text=Mirror+Wood",
        "https://placehold.co/400x400/ecfccb/3f6212?text=Mirror+White",
        "https://placehold.co/400x400/ecfccb/3f6212?text=Room+Setup",
      ],
      variants: [
        {
          SKU: "MIRROR-WOOD-STD",
          color: "Nâu Gỗ",
          price: 35,
          size: "160x50cm",
          stock: 8,
        },
        {
          SKU: "MIRROR-WHT-STD",
          color: "Trắng",
          price: 35,
          size: "160x50cm",
          stock: 2,
        },
      ],
    },
  ];

  const [pickedProduct, setPickedProduct] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [pickedDelete, setPickedDelete] = useState(null);
  const [checkNoVariant, setCheckNoVariant] = useState(false);

  const handleDelete = async (product_id) => {
    console.log("Xóa sản phẩm có ID:", product_id);
    try {
      await handleDeleteProduct(product_id);

      toast.success("Xóa sản phẩm thành công!");
      setReload(!reload);
      setTimeout(() => {
        handleClose();
      }, 1000);
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

  const handleClose = () => {
    setCheckNoVariant(true);
    setPickedProduct(null);
    setConfirmDelete(false);
  };

  const selectedVariantData = listVariants.find(
    (item) => item.product_id === pickedProduct
  );

  const selectedProductData = listProducts.find(
    (item) => item.Product_id === pickedProduct
  );

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
      if (
        !listVariants.find((item) => item.product_id === pickedProduct) &&
        !checkNoVariant
      ) {
        toast.warning("Chưa có các biến thể cho sản phẩm này!");
        return;
      } else {
        setCheckNoVariant(false);
      }
    }
  }, [pickedProduct]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  return (
    <div>
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex justify-center items-center">
          <div className="absolute inset-0 bg-black/30"></div>

          <div className="bg-white relative h-3/5 w-1/3 shadow-2xl rounded-xl flex flex-col gap-15 p-6 animate-scaleIn">
            <p className="font-bold text-4xl flex justify-center mt-15 text-red-800">
              Confirm delete!
            </p>
            <div className="flex justify-center">
              <ImCross size={80} className="text-red-800"></ImCross>
            </div>
            <div className="flex justify-around">
              <button
                className="px-4 py-2 w-30 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium transition-colors"
                onClick={handleClose}
              >
                Cancel
              </button>
              <button
                className="px-6 py-2 w-30 rounded-xl bg-red-800 text-white hover:bg-red-900 font-medium transition-colors shadow-sm"
                onClick={() => handleDelete(pickedDelete)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {pickedProduct && selectedVariantData && (
        <Variants
          selectedVariantData={selectedVariantData}
          selectedProductData={selectedProductData}
          setReload={setReload}
          reload={reload}
          onClose={handleClose}
        />
      )}

      <div className="grid grid-cols-9 bg-gray-100 h-10 font-semibold items-center rounded-t-lg border border-gray-300">
        <p className="place-self-center">Image</p>
        <p className="col-span-2">Product name</p>
        <p className="place-self-center">Price</p>
        <p className="place-self-center">Stock</p>
        <p className="place-self-center">Condition</p>
        <p className="place-self-center">Status</p>
        <p className="place-self-center">Star</p>
        <p className="place-self-center">Delete</p>
      </div>
      <div className="flex flex-col">
        {listProducts.map((product) => {
          return (
            <div
              key={product.Product_id}
              className="grid grid-cols-9 items-center border border-x-gray-300 border-t-transparent border-b-gray-300 py-2"
              onClick={() => setPickedProduct(product.Product_id)}
            >
              <img
                src={product.Anh_dai_dien}
                alt=""
                height={60}
                width={60}
                className="place-self-center rounded-lg"
              />
              <h1 className="col-span-2">{product.Ten_san_pham}</h1>
              <p className="place-self-center">
                {formatCurrency(product.Gia_thap_nhat)}
              </p>
              <p className="place-self-center">
                {product.Tong_ton_kho === null ? 0 : product.Tong_ton_kho}
              </p>
              <p className="place-self-center">{product.Tinh_trang}</p>
              <div
                className={`place-self-center text-center min-w-20 py-1 rounded-lg ${
                  product.Trang_thai_dang === "Active"
                    ? "bg-green-100 text-green-600"
                    : product.Trang_thai_dang === "Hidden"
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-red-100 text-red-600"
                }
            `}
              >
                {product.Trang_thai_dang}
              </div>
              <div className="place-self-center flex items-center gap-1 ">
                <p>
                  {product.Diem_danh_gia_TB === null
                    ? 0
                    : product.Diem_danh_gia_TB}{" "}
                </p>
                <FaRegStar className="text-yellow-500"></FaRegStar>
              </div>
              <FaRegTrashAlt
                size={20}
                className="place-self-center text-red-500 hover:scale-130 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setConfirmDelete(true);
                  setPickedDelete(product.Product_id);
                }}
              ></FaRegTrashAlt>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductDetail;
