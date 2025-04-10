import axios from "axios";
import { AppConfig } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const req = axios.create({
  baseURL: "http://localhost:5120/api/",
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

const getData = async () => {
  try {
    const value = await AsyncStorage.getItem("accessToken");
    if (value !== null) {
      // value previously stored
      return value;
    }
  } catch (e) {
    // error reading value
    console.log(e);
  }
};

req.interceptors.request.use(
  async (request) => {
    const accessToken = await getData();
    if (accessToken) {
      request.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return request;
  },
  (error) => Promise.reject(error)
);

export default req;
