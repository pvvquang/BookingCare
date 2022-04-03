import axios from "axios";
import apiMapMain from "./apiMap";

const BASE_URL = process.env.VUE_APP_BASE_URL || "";

const request = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

const config = (method, url, data, header) => {
  let obj = {
    method,
    url,
  };
  if (data) {
    if (method === "get") {
      obj["params"] = data;
    } else {
      obj["data"] = data;
    }
  }
  if (header) {
    obj["headers"] = header;
  }
  return obj;
};

const apiMap = { ...apiMapMain(config) };

const api = async (apiName, apiParams) => {
  const config = apiMap[apiName](apiParams);

  try {
    const { data } = await request(config);
    return {
      success: true,
      data: data.data,
    };
  } catch (error) {
    if (error?.response?.status == 401 || error?.response?.status === 403) {
      location.reload();
      return;
    }
    return {
      success: false,
      data: error,
    };
  }
};

export default api;
