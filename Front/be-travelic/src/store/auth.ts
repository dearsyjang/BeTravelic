import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
  user: {};
  isAuthenticated: boolean;
  accessToken: string;
  refreshToken: string;
}

interface Token {
  accessToken: string;
  refreshToken: string;
}

const initialState: AuthState = {
  user: {},
  accessToken: "",
  isAuthenticated: false,
  refreshToken: "",
};

export const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    authenticate(state, action: PayloadAction<Token>) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      console.log("진입");
      state.isAuthenticated = true;
      localStorage.setItem("accessToken", state.accessToken);
      localStorage.setItem("refershToken", state.refreshToken);
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
