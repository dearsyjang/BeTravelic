import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  token: "",
  isAuthenticated: false,
  isSurveyed: false,
  refreshToken: "",
};

export const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    authenticate(state, action) {
      //   state.token = action.payload.token;
      //   state.refreshToken = action.payload.refreshToken;
      console.log("진입");
      state.isAuthenticated = true;
    },
    logout(state) {
      // state.token = null;
      state.isAuthenticated = false;
    },
    fetchInfo(state, action) {
      // state.user.email = action.payload.email;
      // state.user.password = action.payload.password;
    },
    deleteMember(state) {
      // state.token = null;
      //   AsyncStorage.removeItem("token"), (isAuthenticated = false);
      console.log("삭제 완료");
    },
  },
});

export const authActions = authSlice.actions;
