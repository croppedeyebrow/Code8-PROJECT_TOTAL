import React, { useContext } from "react";
import styled from "styled-components";
import footerlogo from "../images/LogoSymbol_white.png";
import FooterContext from "../context/FooterContext";

const FooterBox = styled.div`
  width: 100%;
  height: auto;
  /* height: max(40rem, min(40vw, 60rem));   */
  background: linear-gradient(
    180deg,
    rgb(0, 139.09, 255) 0%,
    rgb(97, 230, 202) 100%
  );
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 5%;
`;
const ContentGroup = styled.div`
  width: 70%;
  margin-left: 5%;
  height: auto;
  display: flex;
  justify-content: space-between;
`;

const FooterLogo = styled.div`
  width: 20%;
  min-width: 14rem;
  margin-left: 5%;
  height: 24.13rem;
  background-image: url(${footerlogo});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  @media (max-width: 768px) {
    width: 30%;
    min-width: 10rem;
    height: 16.13rem;
  }
`;
const Content = styled.div`
  width: 30%;
  height: auto;
  &.copyright{
    width: 60%;
  }
`;

const TextWrapper = styled.div`
  color: white;
  font-size: max(0.8rem, min(1vw, 1.8rem));
  font-weight: 400;
  &.copyright{
    font-size: max(0.7rem, min(1vw, 1.5rem));
  }

  h1 {
    font-size: max(1rem, min(1.2vw, 2.2rem));
    font-weight: 600;
  }
`;

const Footer = () => {
  const { footerData } = useContext(FooterContext);

  return (
    <>
      <FooterBox>
        <FooterLogo />
        <ContentGroup>
          <Content>
            <TextWrapper>
              <h1>(주) CHORD8</h1>
              <p>대표 : 조영준</p>
              <p>주소 : 서울특별시 강남구 테헤란로 14길 6</p>
              <p>전화번호 : 02-1234-5678</p>
              <p>이메일 : chord8@chord8.shop</p>
              <p>Copyright 2024. CHORD8. All rights reserved.</p>
            </TextWrapper>
          </Content>
          <Content className="copyright">
            <TextWrapper className="copyright">
              <h1>저작자표시</h1>
              {footerData}
            </TextWrapper>
          </Content>
        </ContentGroup>
      </FooterBox>
    </>
  );
};

export default Footer;
