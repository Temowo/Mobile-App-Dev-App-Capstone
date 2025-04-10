import actions from "./actions";

export const initialState = {
  isLoggedIn: null,
  user: {},
  basket: [],
  address: [],
  deliveryAddress: {},
};

export const reducer = (state, action) => {
  switch (action.type) {
    case actions.setUser: {
      return {
        ...state,
        user: action.payload,
      };
    }

    case actions.setAddress: {
      return {
        ...state,
        address: action.payload,
      };
    }
    case actions.setDeliveryAddress: {
      return {
        ...state,
        deliveryAddress: action.payload,
      };
    }

    case actions.addToBasket: {
      const { basket } = state;
      const { item, quantity } = action.payload;

      const index = basket.findIndex((element) => element.name === item.name);

      if (index > -1) {
        basket[index].quantity += quantity;
        return {
          ...state,
          basket,
        };
      }

      item.quantity = quantity;
      return {
        ...state,
        basket: [...basket, item],
      };
    }

    case actions.updateBasket: {
      const { basket } = state;
      const { item, quantity } = action.payload;

      const index = basket.findIndex((element) => element.name === item.name);

      if (quantity > 0) {
        item.quantity = quantity;
        basket[index] = item;
        return {
          ...state,
          basket,
        };
      } else {
        basket.splice(index, 1);
        return {
          ...state,
          basket,
        };
      }
    }

    case actions.setIsLoggedIn: {
      return { ...state, isLoggedIn: action.payload };
    }

    default:
      return state;
  }
};
