import React, { useEffect, useState, useRef } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa6";
import { ImCross } from "react-icons/im";
import Variants from "./Variants";
import {
  handleDeleteProduct,
  extractErrorMessage,
  getProductDetail,
} from "./service/productService";
import { toast } from "react-toastify";

export const ProductDetail = ({ listProducts, setReload, reload }) => {
  const [pickedProduct, setPickedProduct] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [pickedDelete, setPickedDelete] = useState(null);
  const [checkNoVariant, setCheckNoVariant] = useState(false);
  const [selectedVariantData, setSelectedVariantData] = useState(null);
  const [selectedProductData, setSelectedProductData] = useState(null);

  // Helper function để xử lý đường dẫn ảnh
  const processImagePath = (imagePath) => {
    if (!imagePath || typeof imagePath !== "string")
      return "/images/placeholder.jpg";

    // Lấy tên file từ đường dẫn
    const filename = imagePath
      .split(/[\/\\]/)
      .pop()
      .trim();

    if (!filename) return "/images/placeholder.jpg";

    // Trả về đường dẫn mới
    return `/images/${filename}`;
  };

  const handleDelete = async (product_id) => {
    console.log("Xóa sản phẩm có ID:", product_id);
    try {
      await handleDeleteProduct(product_id);

      toast.success("Xóa sản phẩm thành công!");
      setReload(!reload);
    } catch (error) {
      if (error.response) {
        const rawData = error.response.data;
        const cleanMessage = extractErrorMessage(rawData);
        toast.error(cleanMessage);
      } else {
        toast.error("Không kết nối được Server!");
      }
    }
    setTimeout(() => {
      handleClose();
    }, 1000);
  };

  const handleClose = () => {
    setCheckNoVariant(true);
    setPickedProduct(null);
    setConfirmDelete(false);
  };

  // fetch detail from backend and map to Variants expected shape

  const openDetail = async (product) => {
    try {
      const storeId =
        product.Store_id ?? product.StoreId ?? product.storeId ?? null;
      const data = await getProductDetail(product.Product_id, storeId);

      const prod = data.product || {};

      // ========== FIXED IMAGE PATH PROCESSING ==========
      const imagesRows = data.images || [];

      console.log("🔍 Starting to process images...");
      console.log("Images rows received:", imagesRows);

      const images_path = imagesRows
        .map((row, index) => {
          console.log(`\n--- Processing image ${index + 1} ---`);
          console.log("Row data:", row);

          if (!row || typeof row !== "object") {
            console.log("❌ Row is null/undefined or not an object");
            return null;
          }

          // ✅ TÌM KEY CHỨA ĐƯỜNG DẪN ẢNH (ƯU TIÊN THEO THỨ TỰ)
          const keys = Object.keys(row);
          console.log("Available keys:", keys);

          // Danh sách key ưu tiên theo thứ tự
          const priorityKeys = [
            "Duong_dan_anh",
            "duong_dan_anh",
            "DuongDanAnh",
            "imagePath",
            "image_path",
            "ImagePath",
            "path",
            "Path",
            "url",
            "Url",
            "URL",
          ];

          // Tìm key theo thứ tự ưu tiên
          let imgKey = null;
          for (const key of priorityKeys) {
            if (keys.includes(key)) {
              imgKey = key;
              break;
            }
          }

          // Nếu không tìm thấy, tìm key chứa từ khóa
          if (!imgKey) {
            imgKey = keys.find(
              (k) =>
                /anh|image|path|url|duong|dan/i.test(k) &&
                typeof row[k] === "string" // ✅ BẮT BUỘC PHẢI LÀ STRING
            );
          }

          console.log("Found image key:", imgKey);

          let imgPath = imgKey ? row[imgKey] : null;

          console.log("Image path extracted:", imgPath);

          // ✅ KIỂM TRA imgPath PHẢI LÀ STRING VÀ KHÔNG RỖNG
          if (
            !imgPath ||
            typeof imgPath !== "string" ||
            imgPath.trim() === ""
          ) {
            console.log("❌ Image path is invalid:", typeof imgPath, imgPath);
            return null;
          }

          // Xử lý đường dẫn ảnh
          let filename = imgPath
            .replace(/^\.\.\//, "") // Loại bỏ "../" ở đầu
            .replace(/^\.\//, "") // Loại bỏ "./" ở đầu
            .split(/[\/\\]/) // Tách theo / hoặc \
            .pop() // Lấy phần cuối (tên file)
            .trim();

          console.log("Extracted filename:", filename);

          if (!filename) {
            console.log("❌ Filename is empty");
            return null;
          }

          // Chuẩn hóa extension
          const possibleExtensions = [
            ".jpg",
            ".jpeg",
            ".png",
            ".gif",
            ".jfif",
            ".jiff",
            ".webp",
            ".bmp",
          ];

          const hasValidExt = possibleExtensions.some((ext) =>
            filename.toLowerCase().endsWith(ext)
          );

          if (!hasValidExt) {
            console.log("⚠️ No valid extension, adding .jpg");
            filename = `${filename}.jpg`;
          }

          // Tạo đường dẫn cuối cùng
          const finalPath = `/images/${filename}`;

          console.log(`✅ Final path: ${finalPath}`);
          return finalPath;
        })
        .filter(Boolean); // ✅ Loại bỏ null/undefined

      console.log("\n📸 FINAL RESULT:");
      console.log("Total images processed:", images_path.length);
      console.log("Images paths:", images_path);

      // ✅ NẾU KHÔNG CÓ ẢNH, DÙNG ẢNH ĐẠI DIỆN
      if (images_path.length === 0 && product.Anh_dai_dien) {
        console.log("⚠️ No images found, using representative image");
        const representativeImg = product.Anh_dai_dien;
        if (typeof representativeImg === "string") {
          const filename = representativeImg.split(/[\/\\]/).pop();
          if (filename) {
            images_path.push(`/images/${filename}`);
          }
        }
      }

      // ✅ NẾU VẪN KHÔNG CÓ ẢNH, DÙNG PLACEHOLDER
      if (images_path.length === 0) {
        images_path.push("/images/placeholder.jpg");
      }
      // ========== END FIXED IMAGE PATH PROCESSING ==========

      // ... rest of the code
      const variantRows = data.variants || [];
      const variants = variantRows.map((r) => {
        const priceRaw =
          r.Gia_ban ?? r.Gia ?? r.price ?? r.Price ?? r.Don_gia ?? r["Giá"];
        const stockRaw =
          r.So_luong_ton_kho ??
          r.So_luong ??
          r.Ton_kho ??
          r.stock ??
          r.Tong_ton_kho ??
          r["Tồn_kho"];
        return {
          SKU:
            r.SKU ??
            r.Sku ??
            r.Ma_variant ??
            r.Ma_san_pham ??
            r.Ma ??
            r.sku ??
            r["Mã_sku"],
          color: r.Mau_sac ?? r.Color ?? r.color ?? r.Mau ?? r["Màu"],
          price:
            priceRaw !== undefined && priceRaw !== null ? Number(priceRaw) : 0,
          size: r.Kich_thuoc ?? r.Size ?? r.size ?? r["Kích_thước"],
          stock:
            stockRaw !== undefined && stockRaw !== null ? Number(stockRaw) : 0,
        };
      });

      const name =
        prod.Ten_san_pham ??
        prod.tenSanPham ??
        prod.name ??
        product.Ten_san_pham;
      const detail =
        prod.Mo_ta_chi_tiet ??
        prod.Mo_ta ??
        prod.detail ??
        product.Mo_ta_chi_tiet;

      const mappedVariantData = {
        product_id: product.Product_id,
        name,
        detail,
        images_path, // ✅ Đã xử lý đúng
        variants: variants.length ? variants : [],
      };

      console.log("📦 Final mappedVariantData:", mappedVariantData);

      setSelectedVariantData(mappedVariantData);

      const productDataMerged =
        prod && Object.keys(prod).length
          ? { ...product, ...prod }
          : { ...product };
      productDataMerged.reviews = data.reviews || [];
      productDataMerged.categories = data.categories || [];
      setSelectedProductData(productDataMerged);
      setPickedProduct(product.Product_id);
    } catch (error) {
      console.error("Lỗi khi lấy chi tiết sản phẩm:", error);
      toast.error("Không thể tải thông tin sản phẩm!");
      setSelectedVariantData(null);
      setSelectedProductData(null);
      setPickedProduct(null);
    }
  };

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
        (!selectedVariantData || selectedVariantData.variants.length === 0) &&
        !checkNoVariant
      ) {
        toast.warning("Chưa có các biến thể cho sản phẩm này!");
        return;
      } else {
        setCheckNoVariant(false);
      }
    }
  }, [selectedVariantData]);

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
              className="grid grid-cols-9 items-center border border-x-gray-300 border-t-transparent border-b-gray-300 py-2 cursor-pointer hover:bg-gray-50"
              onClick={() => openDetail(product)}
            >
              <div className="place-self-center w-[60px] h-[60px] flex items-center justify-center">
                <img
                  src={processImagePath(product.Anh_dai_dien)}
                  alt={product.Ten_san_pham}
                  className="max-w-full max-h-full rounded-lg object-contain"
                  onError={(e) => {
                    console.error(`Failed to load image: ${e.target.src}`);
                    e.target.src = "/images/placeholder.jpg";
                  }}
                />
              </div>
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
