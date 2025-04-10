import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      return {
        ...state,
        user: { ...action.payload },
        isAuthenticated: true,
      };
    },

    logout: () => {
      return {
        ...initialState,
      };
    },

    store_user_details: (state, action) => {
      return {
        ...state,
        user: {
          ...state.user,
          user: { ...action.payload.user },
          address: [...action.payload.address],
        },
      };
    },
  },
});

export const { login, logout, store_user_details } = userSlice.actions;
export default userSlice.reducer;
