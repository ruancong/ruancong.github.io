/**
 * 发送POST请求的工具函数
 * @param {string} url - 请求地址
 * @param {Object} data - 请求数据对象
 * @returns {Promise} - 返回请求的Promise对象
 */
export const postRequestWithFormData = async (url, data = {}) => {
  // 将对象转换为 URLSearchParams 格式
  const formData = new URLSearchParams();
  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value);
  });

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("请求出错:", error);
    throw error;
  }
};
