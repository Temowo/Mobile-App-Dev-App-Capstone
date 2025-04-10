import req from "../axios/req";
import { NotifyError } from "../components/toast/toast";

const profile = (authType, payload) => {
  const authOptions = {
    updateAddress: async () => {
      try {
        const response = req.post(
          `/profile/save-address?primary=${true}`,
          payload
        );
        return response;
      } catch (error) {
        console.log("ERR", error);
        NotifyError(error.response.data.message);
        // NotifyError(error.message);
      }
    },
    changePassword: async () => {
      try {
        const response = req.post("/profile/change-password", payload);
        return response;
      } catch (error) {
        console.log(error);
        NotifyError(error.response.data.message);
      }
    },
    uploadProfileImage: async () => {
      const formData = new FormData();
      formData.append("image", payload.image);
      try {
        const response = req.post("profile/profile-image", formData);
        return response;
      } catch (error) {
        console.log(error);
        NotifyError(error.response.data.message);
      }
    },
  };
  return authOptions[authType];
};

export default profile;
