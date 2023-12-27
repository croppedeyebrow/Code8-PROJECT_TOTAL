import React, { useEffect, useState } from "react";
import styled from "styled-components";
import headlogo from "../images/Symbol_white.png";
import headlogo2 from "../images/Symbol_color.png";
import { Link as RouterLink, useNavigate } from "react-router-dom";

const NavContainer = styled.div`
  width: 100%;
  background-color: rgb(0, 0, 0);
  height: 6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .rightzone {
    margin-left: 4%;
    width: 35%;
    display: flex;
    justify-content: space-between;
  }

  .leftzone {
    display: flex;
    width: 35%;
    justify-content: flex-end;
    .leftinleft {
      display: flex;
      justify-content: space-between;
      width: 40%;
      margin-right: 10%;
    }
  }
`;

const HeadLogo = styled.div`
  width: 30%;
  height: 4rem;
  background-image: url(${headlogo});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  &:hover {
    cursor: pointer;
    background-image: url(${headlogo2});
  }
`;

const TextBox = styled.div`
  color: white;
  font-size: 1.5rem;
  font-weight: 300;
  &:hover {
    cursor: pointer;
    color: var(--maingreen);
  }
`;

const Link = styled(RouterLink)`
  text-decoration: none;
`;

const Header = () => {
  const [isLogIn, setIsLogIn] = useState(false);

  const navigate = useNavigate();
  const handleLogoClick = () => {
    navigate("/");
  };

  useEffect(() => {
    const checkLoginStatus = () => {
      const email = localStorage.getItem("email");
      setIsLogIn(!!email);
    };

    checkLoginStatus();

    window.addEventListener("storage", checkLoginStatus);

    return () => {
      window.removeEventListener("storage", checkLoginStatus);
    };
  }, []);

  const handleLogout = () => {
    localStorage.clear(); // 로그아웃 시 로컬 스토리지의 모든 정보를 제거합니다.
    // localStorage.removeItem('email'); // 로그아웃 시 로컬 스토리지의 이메일 정보를 제거합니다.
    // localStorage.removeItem('accessToken'); // 로그아웃 시 로컬 스토리지의 액세스토큰 정보를 제거합니다.
    // localStorage.removeItem('refreshToken'); // 로그아웃 시 로컬 스토리지의 리프레쉬토큰 정보를 제거합니다.
    setIsLogIn(false);
  };
  return (
    <NavContainer>
      <div className="rightzone">
        <Link to="/performance">
          <TextBox>공연</TextBox>
        </Link>
        <Link to="/product">
          <TextBox>STORE</TextBox>
        </Link>
        <Link to="/music-list">
          <TextBox>음원</TextBox>
        </Link>
        <Link to="/communitypage">
          <TextBox>커뮤니티</TextBox>
        </Link>
      </div>
      <HeadLogo onClick={handleLogoClick} />
      <div className="leftzone">
        <div className="leftinleft">
          {isLogIn ? (
            <>
              <TextBox onClick={handleLogout}>로그아웃</TextBox>
              <Link to="/mypage">
                <TextBox>마이페이지</TextBox>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login">
                <TextBox>로그인</TextBox>
              </Link>
              <Link to="/signup">
                <TextBox>회원가입</TextBox>
              </Link>
            </>
          )}
        </div>
      </div>
    </NavContainer>
  );
};

export default Header;
