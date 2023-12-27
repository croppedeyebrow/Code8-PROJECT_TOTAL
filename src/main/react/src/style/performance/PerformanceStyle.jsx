import styled, { createGlobalStyle } from "styled-components";
import backgroundImage from "../../images/Band.jpg";

export const MediaStyle = createGlobalStyle`
  @media screen and ( min-width : 1024px) { 
    font-size: max(3px, min(0.8vw, 5px));
  } 
  @media screen and (max-width : 1023px) { 
    font-size: max(6px, min(1.2vw, 15px));
  }
  @media screen and (max-width : 767px) {  
    font-size: max(3px, min(2vw, 20px));
  }
`;

export const Container = styled.div`
  width: 100%;
  flex-wrap: wrap;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%; // 또는 필요한 높이
  .title {
      width: 100vw;
      height: 4rem;
      background: linear-gradient(to right, var(--maingreen), var(--mainblue));
      color: white;
      font-size: 2.5rem;
      font-weight: 600;
      text-align: center;
      margin: 0;
  }
`;
export const Box = styled.div`
    display: flex;
    flex-direction: row; 
    align-items: center;
    justify-content: flex-start; 
    padding: 0 3rem;

    div {
      margin-top: 9rem;
      margin-bottom: 2rem;
      color: white;
      font-size: 5rem;
      font-weight: 600;
    }
`;

export const SearchBanner = styled.div`
    width: 100vw;
    height: 34rem;
    background-image: url(${backgroundImage});
    background-size: cover;
    background-position: center;
    * {
      margin-left: 4.5rem;
    }

    

    input {
      width: 33vw;
      height: 6rem;
      border-radius: 5rem;
      font-size: 2.4rem;
      padding-left: 2rem;
      box-sizing: border-box;
    }

    button {
      width: 12.7rem;
      min-width: 12.7rem;
      height: 5.8rem;
      border-radius: 4rem;
      background-color: rgba(0, 0, 0, 0.3);
      border: 0.25rem solid white;
      color: white;
      font-size: 2.4rem;
      font-weight: 600;
      margin: 1rem;
      &:hover {
        cursor: pointer;
          transform: scale(1.1); // 크기를 10% 증가
          transition: transform 0.2s ease-in-out;
      }
      &:active {
        background-color: rgba(255, 255, 255, 0.5);
      }
    }
`;

export const Map = styled.div`
width: 80vw;
height: 40rem;
margin: 2rem;
display: flex;
justify-content: center;
border-radius: 1rem;
overflow: hidden;
align-items: center;
`;


   