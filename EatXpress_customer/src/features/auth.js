import req from "../axios/req";

const authentication = (authType, payload) => {
  const authOptions = {
    register: async () => {
      try {
        const response = req.post("auth/register", payload);
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    login: async () => {
      try {
        const response = req.post("auth/login", payload);
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    verifyAccount: () => {
      try {
        const response = req.post("auth/verify-email", payload);
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    forgetPassword: async () => {
      try {
        const response = req.post("auth/forget-pass", payload);
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    resetPassword: async () => {
      try {
        const response = req.post("auth/reset-password", payload);
        return response;
      } catch (error) {
        console.log(error);
      }
    },
  };
  return authOptions[authType];
};

export default authentication;
