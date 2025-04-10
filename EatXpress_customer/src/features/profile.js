import req from "../axios/req";

const profile = (actionType, payload) => {
  const profileOptions = {
    addAddress: async () => {
      try {
        const response = req.post(
          `/profile/save-address?primary=${true}`,
          payload
        );
        return response;
      } catch (error) {
        console.log("ERR", error);
      }
    },
    deleteAccount: async () => {
      try {
        const response = req.delete("/users/deleteAccount");
        return response;
      } catch (error) {
        console.log("ERR", error);
      }
    },
  };
  return profileOptions[actionType];
};

export default profile;
