import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;
axios.defaults.withCredentials = true;

export const apiCall = async (url, method, data) => {
  try {
    const axiosConfig = {
      method,
      url,
    };
    // Check if the method is GET and set params instead of data
    if (method.toLowerCase() === "get") {
      axiosConfig.params = data;
    } else {
      axiosConfig.data = data;
    }
    const response = await axios(axiosConfig);
    return response.data; // Return the data from the response
  } catch (error) {
    throw error; // Throw the error to be caught by the async thunk
  }
};
