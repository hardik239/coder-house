import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  auth: false,
  otp: {
    phone: "",
    hash: "",
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setOtp: (state, { payload }) => {
      const { phone, hash } = payload;
      state.otp.phone = phone;
      state.otp.hash = hash;
    },
    setAuth: (state, { payload }) => {
      const { user } = payload;
      state.user = user;
      if (user === null) {
        state.auth = false;
      } else {
        state.auth = true;
      }
    },
    logout: (state) => {
      state.auth = false;
      state.user = null;
    },
  },
});

export const { setOtp, setAuth, logout } = authSlice.actions;

export default authSlice.reducer;
