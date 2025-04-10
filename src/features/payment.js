import req from "../axios/req";
import { NotifyError } from "../components/toast/toast";

const payment = (authType, payload) => {
  const authOptions = {
    getTransactions: async (page) => {
      try {
        const response = req.get(`payments/vendor-transactions/${page}`);
        return response;
      } catch (error) {
        console.log(error);
      }
    },
  };
  return authOptions[authType];
};

export default payment;
