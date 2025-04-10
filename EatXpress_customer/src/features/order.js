import req from "../axios/req";

const order = (orderType, payload) => {
  const orderOptions = {
    getVendors: async () => {
      try {
        const response = req.get("admin/vendors");
        return response;
      } catch (error) {
        // console.log("ERROR:", error);
      }
    },
    getMenu: async () => {
      try {
        const response = req.get(`menu/1`);
        // const response = req.get(`menu/vendor_menu/${payload}`);
        return response;
      } catch (error) {
        console.log("Error:", error);
      }
    },
    getOrders: async () => {
      try {
        const response = req.get("orders/users");
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    createOrder: async () => {
      try {
        const response = req.post("orders", payload);
        return response;
      } catch (error) {
        console.log(error);
      }
    },
  };
  return orderOptions[orderType];
};

export default order;
