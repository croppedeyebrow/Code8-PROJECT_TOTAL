import React, { useEffect, useState } from "react";
import MusicAxiosApi from "../../axios/MusicAxios";
import { useNavigate } from "react-router-dom";
import {
  Container,
  UserInfo,
  UpdateZone,
  InputBox,
  Button,
} from "../../style/music/MusicUpdateStyle";
import UpdateBox from "../../component/musicList/UpdateBox";
import UpdateUserInfo from "../../component/musicList/UpdateUserInfo";

const MusicRegistPage = () => {
  const navigate = useNavigate();

  const email = window.localStorage.getItem("email");
  console.log(email);

  useEffect(() => {
    if (!email) {
      alert("로그인이 필요합니다.");
      navigate("/login");
    }
  }, [email]);

  if (!email) {
    // 로그인되어 있지 않은 경우
    return null; // 빈 화면 또는 로그인 안내 등으로 대체할 수 있음
  }

  return (
    <>
      <Container>
        <UpdateUserInfo />
        <UpdateBox />
      </Container>
    </>
  );
};

export default MusicRegistPage;
