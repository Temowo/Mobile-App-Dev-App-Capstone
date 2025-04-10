import axios from "axios";
import { AppConfig } from "../config";
import { store } from "../app/store/store";
import storage from "redux-persist/lib/storage";
import { NotifyError } from "../components/toast/toast";

const req = axios.create({
  baseURL: AppConfig.baseUrl,
  headers: {
    "Access-Control-Allow-Origin": "*",
    platform: "agent_web",
  },
});

req.interceptors.request.use(
  (request) => {
    console.log(store.getState())
    request.headers["Authorization"] = `Bearer ${
      store.getState().user.user?.accessToken
    }`;
    return request;
  },
  (error) => Promise.reject(error)
);

req.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // if (!error) NotifyError("Please try again later", 3000);
    // if (error.response.data.message === "Network Error")
    //   NotifyError(error.response.data.message, 3000);
    if (
      error.response?.status === 403 &&
      error.response.data.message === "jwt expired"
    ) {
      storage.removeItem("persist:root");
      window.location.replace("/");
      NotifyError("session expired, please login again", 3000);
    }
    return Promise.reject(error);
  }
);

export default req;
