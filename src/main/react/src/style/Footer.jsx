import React, { useContext } from "react";
import styled from "styled-components";
import footerlogo from "../images/LogoSymbol_white.png";
import FooterContext from "../context/FooterContext";

const FooterBox = styled.div`
  width: 100%;
  height: 60rem;
  background: linear-gradient(
    180deg,
    rgb(0, 139.09, 255) 0%,
    rgb(97, 230, 202) 100%
  );
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
const ContentGroup = styled.div`
  width: 30%;
  margin-left : 5%;
  height: 50%;
  display: flex;
  justify-content: space-between;
`
  
const FooterLogo = styled.div`
  width: 30%;
  margin-left : 5%;
  height: 24.13rem;
  background-image: url(${footerlogo});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`
const Content = styled.div`
  width: 30%;
  height: 20rem;
`

const TextWrapper = styled.div`
  color: white;
  font-size: 1.5rem;
  font-weight: 300;

  h1{
    font-size: 1.8rem;
    font-weight: 500;
  }
`


const Footer = () => {
  const { footerData } = useContext(FooterContext);

  return (
    <>
      <FooterBox>
        <FooterLogo/>
        <ContentGroup>
          <Content>
            <TextWrapper>
              <h1>CONTENT GROUP</h1>
              <p>CONTENT</p>
              <p>CONTENT</p>
              <p>CONTENT</p>
              <p>CONTENT</p>
              <p>CONTENT</p>
            </TextWrapper>
          </Content>
          <Content>
            <TextWrapper>
            <h1>CONTENT GROUP</h1>
              <p>CONTENT</p>
              <p>CONTENT</p>
              <p>CONTENT</p>
              <p>CONTENT</p>
              <p>CONTENT</p>
            </TextWrapper>
          </Content>
          <Content>
            <TextWrapper>
            <h1>저작자표시</h1>
              {footerData}
            </TextWrapper>
          </Content>
        </ContentGroup>
      </FooterBox> 
    </>
    )
  };

export default Footer;
