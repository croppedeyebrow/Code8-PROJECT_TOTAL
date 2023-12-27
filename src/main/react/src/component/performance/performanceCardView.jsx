import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const CardView = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  align-items: flex-start;
  width: 34rem;
  height: 62rem;
  padding: 2rem;
  box-sizing: border-box;
  border-radius: 3rem;
  background-color: white;
  box-shadow: 0 0.4rem 2rem rgba(0, 0, 0, 0.15);
  line-height: 1.1;
  margin-bottom: 2rem;
  &:hover {
    transform: scale(1.05);
    transition: transform 0.2s ease-in-out; // transform 속성에 대한 전환 효과 설정
  }
`;

const Poster = styled.img`
  width: 30rem;
  height: 40rem;
  align-self: center;
  object-fit: cover;
  border-radius: 2rem;
`;

const Title = styled.h3`
  margin: 1.2rem 0 0.4rem 0;
  height: auto;
  font-size: 2rem;
  font-weight: 700;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 40rem; /* adjust this value to your liking */
`;

const Venue = styled.div`
  margin-bottom: 0.8rem;
  font-size: 1.6rem;
  font-weight: 200;
  color: black;
`;

const Performer = styled.div`
  margin-bottom: 0.5rem;
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--maindarkgreen);
`;

const PerformanceDate = styled.div`
  margin-bottom: 1rem;
  font-size: 1.6rem;
  font-weight: 400;
  color: var(--mainolive);
`;

const ButtonContainer = styled.div`
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 1rem; /* 버튼 사이의 간격 */
`;

const Button = styled.button`
  background-color: var(--mainblue);
  color: white;
  width: 10.8rem;
  height: 3.9rem;
  border-radius: 2rem;
  border: none;
  font-size: 1.6rem;
  &:hover {
    // 마우스 호버링 효과
    cursor: pointer;
    background-color: var(--mainsky);
    transform: scale(1.2);
    transition: transform 0.2s ease-in-out; // transform 속성에 대한 전환 효과 설정
  }
  &:active {
    // 클릭 효과
    background-color: blue;
  }
`;

const Status = styled.div`
  // 공연상태창 - 공연날짜가 현재날짜를 지나면 공연종료로 표시, 티켓구매버튼 비활성화
  background-color: ${(props) =>
    props.isEnded ? "var(--maindarkgreen)" : "white"};
  color: ${(props) => (props.isEnded ? "white" : "var(--mainblue)")};
  width: 10.8rem;
  height: 3.9rem;
  border-radius: 2rem;
  border: 1px solid ${(props) => (props.isEnded ? "none" : "var(--mainblue)")};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.6rem;
`;

const PerformanceCardView = ({
  performanceId,
  image,
  title,
  venue,
  performer,
  date,
  onMouseOver,
}) => {
  const navigate = useNavigate();

  // 현재 시간과 공연 시간을 비교합니다.
  const isEnded = new Date() > new Date(date);

  const handleDetailClick = () => {
    console.log(performanceId);
    navigate(`/PerformanceDetail/${performanceId}`);
  };

  const handleBookingClick = () => {
    navigate(`/booking/${performanceId}`);
  };

  // Performer 문자열 생성, 공연참여자가 1명 이상일 경우 "외" 표시
  const performerString =
    performer.length > 1
      ? `${performer[0]} 외 ${performer.length - 1}명`
      : performer[0];

  return (
    <>
      <CardView onMouseEnter={() => onMouseOver(venue)}>
        <Poster src={image} alt={`${title} 포스터`} />
        <Title>{title}</Title>
        <Venue>{venue}</Venue>
        <Performer>{performerString}</Performer>
        <PerformanceDate>{date}</PerformanceDate>
        <ButtonContainer>
          <Status isEnded={isEnded}>
            {isEnded ? "공연 종료" : "공연 예정"}
          </Status>
          <Button onClick={handleDetailClick}>자세히</Button>
          {!isEnded && <Button onClick={handleBookingClick}>예매하기</Button>}
        </ButtonContainer>
      </CardView>
    </>
  );
};

export default PerformanceCardView;
