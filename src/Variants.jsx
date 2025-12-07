import React, { useState } from "react";
import { TfiWrite } from "react-icons/tfi";
import { FaChevronLeft, FaChevronRight, FaStar, FaImage, FaTimes } from "react-icons/fa";
import UpdateForm from "./UpdateForm";

const Variants = ({
  selectedVariantData,
  selectedProductData,
  onClose,
  setReload,
  reload,
}) => {
  if (!selectedVariantData) return null;
  const [openForm, setOpenForm] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  const handlePrevImage = () => {
    if (selectedVariantData.images_path.length > 0) {
      setCurrentImageIndex(
        (prev) =>
          (prev - 1 + selectedVariantData.images_path.length) %
          selectedVariantData.images_path.length
      );
    }
  };

  const handleNextImage = () => {
    if (selectedVariantData.images_path.length > 0) {
      setCurrentImageIndex(
        (prev) => (prev + 1) % selectedVariantData.images_path.length
      );
    }
  };

  const handleKeyPress = (e) => {
    if (isFullscreen) {
      if (e.key === 'ArrowLeft') handlePrevImage();
      if (e.key === 'ArrowRight') handleNextImage();
      if (e.key === 'Escape') setIsFullscreen(false);
    }
  };

  React.useEffect(() => {
    if (isFullscreen) {
      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
    }
  }, [isFullscreen, currentImageIndex]);

  const formatCurrency = (value) => {
    if (!value) return "0 ₫";
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(value);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const currentImage = selectedVariantData.images_path[currentImageIndex];
  const reviews = selectedProductData.reviews || [];
  const postDate = selectedProductData.Ngay_dang || selectedProductData.ngay_dang;
  const hasMultipleImages = selectedVariantData.images_path.length > 1;

  return (
    <div>
      {openForm && (
        <UpdateForm
          selectedProductData={selectedProductData}
          onClose={handleCloseForm}
          setReload={setReload}
          reload={reload}
        />
      )}

      {/* Fullscreen Image Viewer - Shopee Style */}
      {isFullscreen && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          onClick={() => setIsFullscreen(false)}
        >
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/70 rounded-full p-3 transition z-10"
          >
            <FaTimes size={24} />
          </button>

          {/* Main Image */}
          <div className="relative w-full h-full flex items-center justify-center p-8">
            <img
              src={currentImage}
              alt="Fullscreen"
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
              onError={(e) => {
                console.error(`Failed to load fullscreen image: ${currentImage}`);
                e.target.src = '/images/placeholder.jpg';
              }}
            />

            {/* Navigation Arrows */}
            {hasMultipleImages && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevImage();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-4 shadow-2xl transition"
                >
                  <FaChevronLeft className="text-gray-800" size={24} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNextImage();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-4 shadow-2xl transition"
                >
                  <FaChevronRight className="text-gray-800" size={24} />
                </button>
              </>
            )}

            {/* Image Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm font-medium">
              {currentImageIndex + 1} / {selectedVariantData.images_path.length}
            </div>
          </div>
        </div>
      )}

      {/* Side Panel */}
      <div className="fixed inset-0 z-50 flex justify-end">
        <div className="absolute inset-0 bg-black/30" onClick={onClose}></div>

        <div className="relative bg-white w-1/3 h-full shadow-2xl overflow-y-auto animate-slide-in">
          {/* IMAGE GALLERY - Shopee Style */}
          <div className="relative bg-gray-100">
            {/* Main Image Display */}
            <div 
              className="relative w-full aspect-square bg-gray-200 flex items-center justify-center overflow-hidden cursor-zoom-in"
              onClick={() => setIsFullscreen(true)}
            >
              {currentImage ? (
                <img
                  src={currentImage}
                  alt="Product"
                  className="w-full h-full object-contain transition-transform hover:scale-105"
                  onError={(e) => {
                    console.error(`Image failed to load: ${currentImage}`);
                    const filename = currentImage.split('/').pop();
                    const alternatives = [
                      `/images/${filename}`,
                      `/images/${filename.toLowerCase()}`,
                      `/images/placeholder.jpg`,
                    ];
                    
                    const currentSrc = e.target.src;
                    const currentIndex = alternatives.findIndex(alt => 
                      currentSrc.includes(alt)
                    );
                    
                    if (currentIndex < alternatives.length - 1) {
                      e.target.src = alternatives[currentIndex + 1];
                    } else {
                      e.target.style.display = 'none';
                      const fallbackIcon = e.target.parentElement.querySelector('.fallback-icon');
                      if (fallbackIcon) {
                        fallbackIcon.style.display = 'flex';
                      }
                    }
                  }}
                />
              ) : null}
              
              {/* Fallback icon if image fails */}
              <div className="fallback-icon absolute inset-0 flex-col items-center justify-center bg-gray-100 hidden">
                <FaImage className="text-gray-400 mb-2" size={60} />
                <p className="text-gray-500 text-sm">Không thể tải ảnh</p>
              </div>

              {/* Zoom indicator */}
              <div className="absolute top-3 right-3 bg-black/60 text-white px-3 py-1.5 rounded-lg text-xs flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                </svg>
                Click to Zoom
              </div>

              {/* Navigation Arrows - Only show if multiple images */}
              {hasMultipleImages && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrevImage();
                    }}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2.5 shadow-lg transition hover:scale-110"
                  >
                    <FaChevronLeft className="text-gray-700" size={18} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNextImage();
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2.5 shadow-lg transition hover:scale-110"
                  >
                    <FaChevronRight className="text-gray-700" size={18} />
                  </button>
                </>
              )}

              {/* Image Counter Badge */}
              {hasMultipleImages && (
                <div className="absolute bottom-3 right-3 bg-black/70 text-white px-3 py-1.5 rounded-full text-sm font-medium">
                  {currentImageIndex + 1} / {selectedVariantData.images_path.length}
                </div>
              )}
            </div>

            {/* Thumbnail Gallery - Shopee Style */}
            {hasMultipleImages && (
              <div className="p-3 bg-white border-t border-gray-200">
                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                  {selectedVariantData.images_path.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg border-2 overflow-hidden transition-all ${
                        idx === currentImageIndex
                          ? "border-blue-500 shadow-lg scale-105 ring-2 ring-blue-200"
                          : "border-gray-300 hover:border-gray-400 hover:shadow-md"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = '/images/placeholder.jpg';
                        }}
                      />
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-500 text-center mt-2">
                  {selectedVariantData.images_path.length} ảnh sản phẩm
                </p>
              </div>
            )}
          </div>

          {/* PRODUCT INFO */}
          <div className="flex flex-col gap-4 p-5">
            {/* Header with Title and Edit Button */}
            <div className="flex justify-between items-start gap-3">
              <div className="flex-1">
                <h1 className="font-bold text-2xl leading-tight">
                  {selectedVariantData.name}
                </h1>
                <p className="text-gray-600 text-sm mt-1">
                  {selectedVariantData.detail}
                </p>
              </div>
              <button
                onClick={() => setOpenForm(true)}
                className="flex-shrink-0"
              >
                <TfiWrite
                  size={24}
                  className="text-yellow-600 hover:scale-110 cursor-pointer transition"
                />
              </button>
            </div>

            {/* Product Meta Info */}
            <div className="bg-gray-50 p-3 rounded-lg space-y-1 text-sm">
              <p>
                <span className="text-gray-600">Weight:</span>{" "}
                <span className="font-medium">
                  {selectedProductData.Trong_luong || selectedProductData.trongLuong || "N/A"} kg
                </span>
              </p>
              <p>
                <span className="text-gray-600">Date:</span>{" "}
                <span className="font-medium">{formatDate(postDate)}</span>
              </p>
            </div>

            {/* VARIANTS SECTION */}
            <div className="space-y-3">
              <h2 className="font-bold text-lg">Details</h2>
              {selectedVariantData.variants && selectedVariantData.variants.length > 0 ? (
                <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                  {selectedVariantData.variants.map((variant, index) => (
                    <div
                      key={index}
                      className="border border-gray-300 rounded-lg p-3 bg-white hover:shadow-md transition"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-semibold text-sm text-blue-600">
                            {variant.SKU}
                          </p>
                          <p className="text-gray-600 text-xs">SKU</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-red-600">
                            {formatCurrency(variant.price)}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-sm mb-2">
                        <div>
                          <p className="text-gray-600">Color</p>
                          <p className="font-medium">{variant.color}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Size</p>
                          <p className="font-medium">{variant.size}</p>
                        </div>
                      </div>

                      <div className="border-t pt-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Inventory:</span>
                          <span
                            className={`font-semibold ${
                              variant.stock > 0
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {variant.stock > 0
                              ? `${variant.stock} products`
                              : "Hết hàng"}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm italic">
                  Chưa có phân loại nào
                </p>
              )}
            </div>

            {/* REVIEWS SECTION */}
            {reviews && reviews.length > 0 && (
              <div className="space-y-3 border-t pt-4">
                <h2 className="font-bold text-lg">Customer Reviews</h2>
                <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                  {reviews.slice(0, 5).map((review, index) => (
                    <div
                      key={index}
                      className="border border-gray-300 rounded-lg p-3 bg-blue-50"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <FaStar
                                key={i}
                                size={12}
                                className={
                                  i < review.So_sao
                                    ? "text-yellow-400"
                                    : "text-gray-300"
                                }
                              />
                            ))}
                          </div>
                          <span className="font-medium text-xs text-gray-600">
                            ({review.So_sao} stars)
                          </span>
                        </div>
                        <span className="text-xs text-gray-500">
                          {formatDate(review.Ngay_danh_gia)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 mb-2">
                        {review.Noi_dung_binh_luan || "Không có nội dung"}
                      </p>
                      {review.Kich_thuoc && (
                        <p className="text-xs text-gray-500">
                          Variant: {review.Kich_thuoc}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Variants;