import req from "../axios/req";
import { NotifyError } from "../components/toast/toast";

const order = (authType, payload) => {
  const authOptions = {
    getOrders: async (page) => {
      try {
        const response = req.get(`/orders/vendors/${page}`);
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    acceptOrder: async (id) => {
      try {
        const response = req.get(`/orders/accept-order/${id}`);
        return response;
      } catch (error) {
        console.log(error);
        // NotifyError(error.message);
      }
    },
    cancelOrder: async (id) => {
      try {
        const response = req.get(`/orders/cancel-order/${id}`);
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    completeOrder: async (id) => {
      try {
        const response = req.get(`/orders/complete-order/${id}`);
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    getOrderStats: async () => {
      try {
        const response = req.get("orders/stats/vendor");
        return response;
      } catch (error) {
        console.log(error);
      }
    },
  };
  return authOptions[authType];
};

export default order;
