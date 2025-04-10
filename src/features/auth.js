import req from "../axios/req";
import { NotifyError } from "../components/toast/toast";

const authentication = (authType, payload) => {
  const authOptions = {
    login: async () => {
      try {
        const response = await req.post("auth/login", payload);
        return response.data;
      } catch (error) {
        NotifyError(error.response.data.message);
      }
    },
    forgetPassword: async () => {
      try {
        const response = req.post("auth/forget-pass", payload);
        return response;
      } catch (error) {
        // console.log(error);
        // NotifyError(error);
      }
    },
    resetPassword: async () => {
      try {
        const response = req.post("auth/reset-password", payload);
        return response;
      } catch (error) {
        // console.log(error);
        // NotifyError(error);
      }
    },
    getProfile: () =>
      new Promise(async (resolve, reject) => {
        try {
          const response = await req.get("/profile");
          resolve(response);
        } catch (error) {
          reject(error);
        }
      }),
    registerVendor: () => {
      try {
        const response = req.post("/auth/register/vendor", payload);
        return response;
      } catch (error) {
        // console.log(error);
      }
    },
    verifyAccount: () => {
      try {
        const response = req.post("/auth/verify-email", payload);
        return response;
      } catch (error) {}
    },
  };
  return authOptions[authType];
};

export default authentication;
