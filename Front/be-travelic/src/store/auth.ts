import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  user: {};
  isAuthenticated: boolean;
  token: string;
  isSurveyed: boolean;
  refreshToken: string;
}

const initialState: AuthState = {
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
    authenticate(state, action: PayloadAction<boolean>) {
      //   state.token = action.payload.token;
      //   state.refreshToken = action.payload.refreshToken;
      console.log("진입");
      state.isAuthenticated = true;
      localStorage.setItem("isAuthenticated", "true");
    },
    logout(state) {
      // state.token = null;
      state.isAuthenticated = false;
      console.log("로그아웃");
      localStorage.removeItem("isAuthenticated");
    },
    // fetchInfo(state, action) {
    //   // state.user.email = action.payload.email;
    //   // state.user.password = action.payload.password;
    // },
    deleteMember(state) {
      // state.token = null;
      //   AsyncStorage.removeItem("token"), (isAuthenticated = false);
      console.log("삭제 완료");
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
