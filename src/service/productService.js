import axios from "axios";

//hàm tách chuỗi lỗi
export const extractErrorMessage = (rawMessage) => {
  if (!rawMessage) return "Có lỗi xảy ra!";

  const msgString =
    typeof rawMessage === "string"
      ? rawMessage
      : rawMessage.message || JSON.stringify(rawMessage);
  const match = msgString.match(/\[Lỗi:\s*(.*?)\]/);

  if (match && match[1]) {
    return match[1];
  }
  return msgString.length > 100 ? "Lỗi hệ thống (Xem console)" : msgString;
};

//insert
export const handleInsertProduct = async (productData) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/products",
      productData
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi thêm:", error);
    throw error;
  }
};

//update
export const handleUpdateProduct = async (productId, productData) => {
  try {
    const response = await axios.put(
      `http://localhost:8080/api/products/${productId}`,
      productData
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi sửa:", error);
    throw error;
  }
};

//delete
export const handleDeleteProduct = async (productId) => {
  try {
    const response = await axios.delete(
      `http://localhost:8080/api/products/${productId}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi xóa:", error);
    throw error;
  }
};

//search
export const handleSearchProduct = async (productData) => {
  try {
    const response = await axios.get(
      "http://localhost:8080/api/products/search",
      { params: productData }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu:", error);
    throw error;
  }
};
