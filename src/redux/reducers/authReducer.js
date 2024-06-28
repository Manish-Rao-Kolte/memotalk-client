import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const authReducer = authSlice.reducer;
export const { setUserDetails } = authSlice.actions;
export const authSelector = (state) => state.authReducer;
