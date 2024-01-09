import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import MemberInfoAxiosApi from "../axios/MemberInfoAxios";
import { jwtDecode } from "jwt-decode";
import Common from "../utils/Common.jsx";

const token = Common.getAccessToken();
const decode = token ? jwtDecode(token) : "";

// 사용자 정보를 비동기적으로 가져오는 액션 생성
export const fetchUserInfo = createAsyncThunk(
  "user/fetchUserInfo",
  async (_, { getState }) => {
    // 현재 리덕스 상태에서 이메일 가져오기
    const { email } = getState().user;
    // Axios API를 이용해서 userInfo를 가져와서 리턴
    const response = await MemberInfoAxiosApi.getUserInfo(email);
    return response.data;
  }
);

export const fetchUserMusic = createAsyncThunk(
  "user/fetchUserMusic",
  async (_, { getState }) => {
    const { userInfo } = getState().user;
    if (userInfo) {
      const response = await MemberInfoAxiosApi.getUserMusic(userInfo.id);
      return response.data;
    }
  }
);

export const fetchUserPerformance = createAsyncThunk(
  "user/fetchUserPerformance",
  async (_, { getState }) => {
    const { email } = getState().user;
    const response = await MemberInfoAxiosApi.getUserInfoByPerformanceEmail(
      email
    );
    return response.data;
  }
);


// 초기 이메일 값을 설정
const initialEmail = (() => {
  if (token) {
    try {
      console.log(decode.sub);
      return decode.sub;
    } catch (error) {
      console.error("Invalid token", error);
      return "";
    }
  }
  return "";
})();

const userSlice = createSlice({
  name: "user",
  initialState: {
    email: initialEmail,
    userInfo: null,
    userMusic: null,
    userPerformance: null,
    isLogin: !!token,
    status: "idle",
    error: null,
  },
  reducers: {
   login: (state) => {
        state.isLogin = true;
      },
      logout: (state) => {
        state.isLogin = false;
      },},
  // createAsyncThunk에서 생성한 액션들에 대한 리듀서를 정의
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        // 각각의 액션 성공 시, 상태를 업데이트
        state.userInfo = action.payload;
      })
      .addCase(fetchUserMusic.fulfilled, (state, action) => {
        state.userMusic = action.payload;
      })
      .addCase(fetchUserPerformance.fulfilled, (state, action) => {
        state.userPerformance = action.payload;
      });
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
