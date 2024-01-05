import { useEffect, useState } from "react";
import MypageComponent from "../component/Mypage/MypageComponent";
import depositPath from "../images/Deposit_white.svg";
import whitdrawPath from "../images/Whitdraw_white.svg";
import { ReactComponent as Heart } from "../images/HeartBox.svg";

import {
  Artist,
  ArtistContainer,
  CashInput,
  ExchangeButton,
  ExchangeContainer,
  InterBox,
  InterBoxText,
  MainHead,
  MainHeadBox,
  MainHeadText,
  MainProfile,
  MoveButton,
  MoveButtonBox,
  MyPageContainer,
  PointBox,
} from "../style/MyPageStyle";
import MemberInfoAxiosApi from "../axios/MemberInfoAxios";
import ModalComponent from "../utils/ModalComponent";
import PayComponent from "../component/Mypage/PayComponent.tsx";
import Common from "../utils/Common";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const [email, setEmail] = useState("");
  const token  = Common.getAccessToken();
  const decode = token ? jwtDecode(token) : null;
  const [userInfo, setUserInfo] = useState(null);
  const [userMusic, setUserMusic] = useState(null);
  const [userPerformance, setUserPerformance] = useState(null);
  const [amount, setAmount] = useState(0);
  const navigate = useNavigate();
  const amountChange = (e) => {
    const inputAmount = e.target.value;

    if (inputAmount < 0) {
      alert("음수는 입력하실 수 없습니다.");
      return;
    }
    setAmount(inputAmount);
  };
useEffect(() => {
  if (decode) {
    setEmail(decode.sub);
  }
}, [decode]);

  useEffect(() => {
    const fetchUserInfoAndMusic = async () => {
      try {
        const userInfoResponse = await MemberInfoAxiosApi.getUserInfo(email);
        console.log(userInfoResponse.data);
        setUserInfo(userInfoResponse.data);
        if (userInfoResponse.data) {
          const musicResponse = await MemberInfoAxiosApi.getUserMusic(
            userInfoResponse.data.id
          );
          setUserMusic(musicResponse.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    const fetchData = async () => {
      const response = await MemberInfoAxiosApi.getUserInfoByPerformanceEmail(
        email
      );
      setUserPerformance(response.data);
    };
    fetchUserInfoAndMusic();
    fetchData();
  }, [email]);
  const exchangePoints = async () => {
    try {
      const response = await MemberInfoAxiosApi.exchangePoints(email, amount);
      if (response.status === 200) {
        alert("환전이 성공적으로 완료되었습니다.");
        navigate(0);
      } else {
        alert("환전에 실패하였습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("환전 요청 중 에러가 발생했습니다:", error);
    }
  };
  return (
    <>
      <MyPageContainer>
        <MainHead>
          <MainProfile
            profile={userInfo && userInfo.profileImg}
          >
            {
              <img
                src={userMusic && userMusic[0].musicDTO.thumbnailImage}
                alt="Profile"
              />
            }
          </MainProfile>
          <ArtistContainer>
            <MainHeadBox>
              <MainHeadText>
                공연 횟수 :{" "}
                {userPerformance && userPerformance.performances.length}
              </MainHeadText>
              <MainHeadText>
                등록된 음원 : {userMusic && userMusic.length}
              </MainHeadText>
              <InterBox>
                <InterBoxText>
                  <Heart />
                  {userMusic && userMusic[0].musicDTO.heartCount}
                </InterBoxText>
              </InterBox>
            </MainHeadBox>

            <Artist>ARTIST</Artist>
          </ArtistContainer>
          <PointBox>
            <MainHeadText>
              MY 포인트
              <div>{userInfo && userInfo.userPoint}</div>
            </MainHeadText>

            <MoveButtonBox>
              {userInfo && (
                <>
                  <ModalComponent
                    open={
                      <MoveButton>
                        <div className="svg-wrapper">
                          <img src={depositPath} alt="Deposit" />
                        </div>
                        충전하기
                      </MoveButton>
                    }
                    content={
                      <PayComponent
                        email={userInfo.userEmail}
                        username={userInfo.userName}
                        phone={userInfo.userPhone}
                      />
                    }
                    openButtonStyle={{
                      bgColor: "rgba(0,0,0,0)",
                      textColor: "black",
                    }}
                    close="닫기"
                  />
                  <ModalComponent
                    open={
                      <MoveButton>
                        <div className="svg-wrapper">
                          <img src={whitdrawPath} alt="Whitdraw" />
                        </div>
                        환전하기
                      </MoveButton>
                    }
                    content={
                      <ExchangeContainer>
                        <CashInput
                          type="number"
                          value={amount}
                          onChange={amountChange}
                        />
                        <ExchangeButton onClick={exchangePoints}>
                          환전하기
                        </ExchangeButton>
                      </ExchangeContainer>
                    }
                    openButtonStyle={{
                      bgColor: "rgba(0,0,0,0)",
                      textColor: "black",
                    }}
                    close="닫기"
                  />
                </>
              )}
            </MoveButtonBox>
          </PointBox>
        </MainHead>
        <MypageComponent
          userMusic={userMusic}
          userPerformance={userPerformance}
          userInfo={userInfo}
        />
      </MyPageContainer>
    </>
  );
};
export default MyPage;
