import req from "../axios/req";
import { NotifyError } from "../components/toast/toast";

const menu = (actionType, payload) => {
  const menuOptions = {
    addItem: async () => {
      const formData = new FormData();
      formData.append("name", payload.name);
      formData.append("price", payload.price);
      formData.append("description", payload.description);
      formData.append("mealType", payload.mealType);
      formData.append("category", payload.category);
      formData.append("file", payload.file);
      try {
        const response = req.post("menu", formData);
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    getMenuItems: async (page) => {
      try {
        const response = req.get(`menu/vendor`);
        // const response = req.get(`menu/vendor/${page}`);
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    editMenuItem: async (id) => {
      try {
        const response = req.patch(`menu/update/${id}`, payload);
        return response;
      } catch (error) {
        console.log(error);
      }
    },
    deleteMenuItem: async (id) => {
      try {
        const response = req.delete(`menu/${id}`);
        return response;
      } catch (error) {
        console.log(error);
      }
    },
  };
  return menuOptions[actionType];
};

export default menu;
