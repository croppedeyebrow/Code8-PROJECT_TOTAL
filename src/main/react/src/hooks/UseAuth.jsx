import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import SignUpAxios from "../axios/SignUpAxios";

// 로그인 체크 커스텀 훅
const UseAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState("");
  // const navigator = useNavigate();

  useEffect(() => {
    // 로그인 상태를 체크
    const checkLoginStatus = async () => {
      try {
        // 로그인 체크
        const res = await SignUpAxios.isLogin();
        // console.log("로그인 상태 체크 :", res.data);

        if (res.data) {
          // 로그인 상태
          const email = res.data;
          setIsLoggedIn(email);
        } else {
          // alert("로그인 상태가 아닙니다.");
          // navigator("/login"); // 로그인 페이지
          setIsLoggedIn("");
        }
      } catch (e) {
        // alert("서버의 연결 불안정 혹은 토큰이 만료 되었습니다.", e);
        // navigator("/");
        setIsLoggedIn("");
      }
    };

    checkLoginStatus();
  }, [isLoggedIn]);

  return isLoggedIn;
};

export default UseAuth;
