import { useState } from "react";
import { BACKGROUND } from "../component/login/LoginComponent";
import {
  SIGNUP,
  TOP,
  Main,
  Input,
  InputTitle,
  CheckButton,
  BusynessButton,
  Gender,
  BOTTOM,
  SignUpButton,
  Agree,
  CONTAINER,
  P1,
  Input1,
} from "../component/signup/SignUpComponent";
import SignUpAxios from "../axios/SignUpAxios";
import { useNavigate } from "react-router-dom";
import SmsApi from "../api/SmsApi";
import KakaoAddr from "../api/KakaoAddrApi";
import { ModalComponent } from "../utils/ModalComponent";
import NoneBtnModalComponent from "../utils/NoneBtnModalComponent";

const SignupPage = () => {
  const navigate = useNavigate();

  // 유효성 검사
  const [isId, setIsId] = useState(false);
  const [isPw, setIsPw] = useState(false);
  const [isNickName, setIsNickName] = useState(false);
  const [isName, setIsName] = useState(false);
  const [isAddr, setIsAddr] = useState(false);
  const [isTel, setIsTel] = useState(false);
  const [isGender, setIsGender] = useState(false);
  const [isAge, setIsAge] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);

  // 약관 동의 체크
  const [firstAgree, setfirstAgree] = useState(false);
  const [secondAgree, setSecondAgree] = useState(false);

  const handleFirstAreeChange = () => {
    setfirstAgree(!firstAgree);
  };
  const handleSecondAreeChange = () => {
    setSecondAgree(!secondAgree);
  };
  const handleAllAgreeChange = () => {
    if (firstAgree === secondAgree) {
      setfirstAgree(!firstAgree);
      setSecondAgree(!secondAgree);
    } else {
      setfirstAgree(false);
      setSecondAgree(false);
    }
  };

  // 인증 번호 입력창 제어
  const [sms, setSms] = useState(false);
  const closeSms = () => {
    setSms(false);
  };

  // 주소 입력창 제어
  const [kakaoModal, setKakao] = useState(false);
  const openKakao = () => {
    setKakao(true);
  };
  const closeKakao = () => {
    setKakao(false);
    if (addr !== null) {
      setIsAddr(true);
    }
  };

  // 이메일
  const [inputEmail, setInputEmail] = useState("");
  const onChangeEmail = (e) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (emailRegex) {
      setInputEmail(e.target.value);
    }
  };

  // 인증번호 체크
  const [EPW, setEPW] = useState("");
  const onChangeEPW = (e) => {
    setEPW(e.target.value);
  };

  // 비밀번호
  const [inputPassword, setInputPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // 비밀번호 입력
  const onChangePassword = (e) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;
    const passwordCurrent = e.target.value;
    console.log("passwordCurrent:", passwordCurrent);
    setInputPassword(passwordCurrent);
    if (passwordRegex.test(passwordCurrent)) {
      setIsPw(true);
    }
  };
  // 비밀번호 확인
  const onChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    // console.log("confirmPassword : ", confirmPassword);
  };
  // 비밀번호 및 비밀번호 확인 체크
  const checkPassword = () => {
    if (inputPassword !== "" && confirmPassword !== "") {
      if (inputPassword === confirmPassword) {
        setIsConfirm(true);
        // console.log("isConfirm : ", isConfirm);
        alert("입력 정보가 동일합니다.");
        setIsPw(true);
      } else {
        alert("입력하신 비밀번호를 재확인하십시오.");
        setIsConfirm(false);
        // console.log("isConfirm : ", isConfirm);
      }
    } else {
      alert("비밀번호를 입력하시오");
    }
  };

  // 닉네임 (임시)
  const [nickName, setNickName] = useState("");
  const onChangeNickName = (e) => {
    setNickName(e.target.value);
  };

  // 이름
  const [name, setName] = useState("");
  const onChangeName = (e) => {
    setName(e.target.value);
    // console.log("name", name);
    setIsName(true);
  };

  // 주소
  const [addr, setAddr] = useState("");
  // 상세 주소
  const [addrDetail, setAddrDetail] = useState("");

  // 휴대전화 번호
  const [tel, setTel] = useState("");
  const onChangeTel = (e) => {
    setTel(e.target.value);
    // console.log("tel:", tel);
    setIsTel(true);
  };

  // 인증 번호
  const [cnum, setCnum] = useState("");
  const onChangeCnum = (event) => {
    setCnum(event.target.value);
  };

  // 성별 선택
  const [gender, setGender] = useState("");
  const onChangegender = (e) => {
    const genderType = e.target.value;
    setGender(genderType);
    // console.log("genderType:", genderType);
    // console.log("e.target.value:", e.target.value);
    setIsGender(true);
  };

  // 나이
  const [age, setAge] = useState("");
  const onChangeAge = (e) => {
    setAge(e.target.value);
    // console.log("age", age);
    setIsAge(true);
  };

  // 이메일 인증
  const onClcikCheckEmail = async () => {
    try {
      const res = await SignUpAxios.memberEmail(inputEmail);
      if (res.data === true) {
        // 입력 모달 등장
        alert("이메일 인증번호를 전송합니다.");
      } else {
        alert("이미 존재하는 이메일 혹은 존재하지 않는 이메일입니다.");
      }
    } catch (error) {
      alert("서버의 연결이 불안정 합니다.");
      console.log("이메일 입력:", error);
    }
  };

  // 입력받은 인증번호 체크
  const checkEPW = async () => {
    try {
      const res = await SignUpAxios.memberEpw(EPW);
      if (res.data === true) {
        setIsId(true);
        alert("인증 성공");
      } else {
        setIsId(false);
        alert("인증 실패");
      }
    } catch (error) {
      alert("연결 실패");
    }
  };

  // 닉네임 중복 체크
  const onClickCheckNickName = async () => {
    try {
      if (nickName !== "") {
        const checkNickName = await SignUpAxios.memberNickname(nickName);
        // 중복이 없어야 true 설정. false를 받아야 중복이 없는것.
        console.log(checkNickName.data);
        if (checkNickName.data === true) {
          alert("이미 존재하는 닉네임입니다.");
          setIsNickName(false);
        } else {
          alert("유효한 닉네임입니다.");
          setIsNickName(true);
        }
      } else {
        alert("닉네임을 입력하세요");
      }
    } catch (error) {
      alert("닉네임 입력 정보를 확인하십시오.", error);
    }
  };

  // 휴대폰 번호 인증하기
  const onClickCheckTel = () => {
    setSms(true);
  };

  // SMS를 보내는 함수
  const handleSendMessage = async () => {
    try {
      const res = await SignUpAxios.memberTel(tel);
      console.log("휴대전화 번호", tel);
      console.log(res.data);
      if (res.data.statusCode === "2000") {
        alert("문자가 발송되었습니다.");
      } else {
        alert("전화 번호를 확인하십시오!!");
      }
    } catch (error) {
      // 오류 발생 시 처리
      alert("연결이 불안정합니다.");
      console.error("SMS 전송 실패:", error);
    }
  };

  // 인증 번호를 보내는 함수
  const handleSendCnum = async () => {
    try {
      const res = await SignUpAxios.memberTelAuth(cnum);
      if (res.data === true) {
        alert("인증 성공");
        setIsTel(true);
      } else {
        alert("인증 실패");
        setIsTel(false);
      }
    } catch (error) {
      console.log("인증 연결 실패", error);
      setIsTel(false);
    }
  };

  // 사업자 번호
  const [bissNum, setBissNum] = useState("");
  const onChangeBiss = (e) => {
    setBissNum(e.target.value);
  };

  // 회원 가입
  const onClickSignUp = async () => {
    try {
      if (firstAgree === true && secondAgree === true) {
        if (
          inputEmail !== "" &&
          inputPassword !== "" &&
          nickName !== "" &&
          name !== "" &&
          addr !== "" &&
          addrDetail !== "" &&
          tel !== "" &&
          gender !== "" &&
          age !== "" &&
          isConfirm !== ""
        ) {
          const res = await SignUpAxios.signup(
            inputEmail,
            inputPassword,
            nickName,
            name,
            addr,
            addrDetail,
            tel,
            gender,
            age,
            bissNum
          );
          console.log("회원 패스워드", inputPassword);
          console.log("회원가입 결과 : ", res);
          if (res.status === 200) {
            alert("회원가입에 성공하셨습니다.");
            navigate("/login");
            // 임시
            // navigate("/");
          } else {
            alert("회원 가입에 실패하셨습니다.");
          }
        } else {
          if (isId === false) {
            alert("이메일을 확인하십시오.");
          } else if (isPw === false) {
            alert("비밀번호를 확인하십시오.");
          } else if (isNickName === false) {
            alert("닉네임을 확인하십시오.");
          } else if (isName === false) {
            alert("회원님의 성함을 입력하십시오.");
          } else if (isAddr === false) {
            alert("주소 정보를 입력하십시오.");
          } else if (isGender === false) {
            alert("성별 입력 정보를 확인하십시오.");
          } else if (isTel === false) {
            alert("전화번호를 확인하십시오.");
          } else if (isAge === false) {
            alert("연령을 입력하십시오.");
          } else {
            alert("정보를 확인하십시오.");
          }
        }
      }
    } catch (error) {
      alert("서버의 연결이 불안정합니다.");
    }
  };

  return (
    <>
      <CONTAINER>
        <BACKGROUND>
          <SIGNUP>
            <TOP>
              <p className="top-title">회원가입</p>
            </TOP>
            <Main>
              <div className="left">
                <div className="input-session">
                  <div className="input-session1">
                    <div className="input-session1-top">
                      <InputTitle>이메일(아이디)</InputTitle>
                    </div>
                    <div className="input-session1-bottom">
                      <Input
                        onChange={onChangeEmail}
                        onBlur={onChangeEmail}
                      ></Input>
                      <CheckButton onClick={onClcikCheckEmail}>
                        <ModalComponent
                          open="인증하기"
                          fontSize={"1rem"}
                          padding={0}
                          width={"100%"}
                          close="닫기"
                          openButtonStyle={{
                            bgColor: "#61e6ca",
                            height: "100%",
                            lineHeight: "0",
                            fontSize: "1rem",
                            fontWeight: "400",
                          }}
                          content={
                            <>
                              <p style={{ color: "black" }}>
                                해당 이메일로 발급된 인증번호를 입력하세요
                              </p>
                              <input type="text" onChange={onChangeEPW} />
                              <button onClick={checkEPW}>확인 </button>
                            </>
                          }
                        ></ModalComponent>
                      </CheckButton>
                    </div>
                  </div>

                  <div className="input-session1">
                    <div className="input-session1-top">
                      <InputTitle>비밀번호</InputTitle>
                    </div>
                    <div className="input-session1-bottom">
                      <Input
                        type="password"
                        onChange={onChangePassword}
                        onBlur={onChangePassword}
                        onFocus={onChangePassword}
                      ></Input>
                    </div>
                  </div>
                  <div className="input-session1">
                    <div className="input-session1-top">
                      <InputTitle>비밀번호 확인</InputTitle>
                    </div>
                    <div className="input-session1-bottom">
                      <Input
                        type="password"
                        onChange={onChangeConfirmPassword}
                        onBlur={onChangeConfirmPassword}
                        onFocus={onChangeConfirmPassword}
                      ></Input>
                      <CheckButton onClick={checkPassword}>
                        확인체크
                      </CheckButton>
                    </div>
                  </div>
                  <div className="input-session1">
                    <div className="input-session1-top">
                      <InputTitle>닉네임</InputTitle>
                    </div>
                    <div className="input-session1-bottom">
                      <Input
                        onBlur={onChangeNickName}
                        onChange={onChangeNickName}
                      ></Input>
                      <CheckButton onClick={onClickCheckNickName}>
                        중복확인
                      </CheckButton>
                    </div>
                  </div>
                  <div className="input-session1">
                    <div className="input-session1-top">
                      <InputTitle>이름</InputTitle>
                    </div>
                    <div className="input-session1-bottom">
                      <Input
                        onBlur={onChangeName}
                        onChange={onChangeName}
                      ></Input>
                    </div>
                  </div>
                  <div className="input-session1">
                    <div className="input-session1-top">
                      {/* 주소 제목 */}
                      <InputTitle>주소</InputTitle>
                    </div>
                    <div className="input-session1-bottom">
                      <Input
                        // onChange={onChangeAddr}
                        // onBlur={onChangeAddr}
                        onClick={openKakao}
                        value={addr + " " + addrDetail}
                      ></Input>

                      <CheckButton onClick={openKakao}>
                        <P1>주소찾기</P1>
                        <NoneBtnModalComponent
                          isOpen={kakaoModal}
                          setIsOpen={closeKakao}
                          close={{ text: "닫기" }}
                          content={
                            <KakaoAddr
                              kakao={kakaoModal}
                              close={closeKakao}
                              onAddress={setAddr}
                              onDetailAddress={setAddrDetail}
                            ></KakaoAddr>
                          }
                        />
                      </CheckButton>

                      {/* 카카오 주소 찾기 */}
                    </div>
                  </div>
                  <div className="input-session1">
                    <div className="input-session1-top">
                      <InputTitle>휴대폰 번호</InputTitle>
                    </div>
                    <div className="input-session1-bottom">
                      <Input
                        onChange={onChangeTel}
                        onBlur={onChangeTel}
                        onFocus={onChangeTel}
                      ></Input>
                      <CheckButton onClick={onClickCheckTel}>
                        <ModalComponent
                          open="인증하기"
                          fontSize={"1rem"}
                          padding={0}
                          width={"100%"}
                          close="닫기"
                          openButtonStyle={{
                            bgColor: "#61e6ca",
                            height: "100%",
                            lineHeight: "0.3",
                            fontSize: "1rem",
                          }}
                          content={
                            <SmsApi
                              open={sms}
                              close={closeSms}
                              tel={tel}
                              send={handleSendMessage}
                              cn={handleSendCnum}
                              onChangeCnum={onChangeCnum}
                            ></SmsApi>
                          }
                        />
                      </CheckButton>
                    </div>
                  </div>

                  <div className="input-session2">
                    <div className="session-left">
                      <div className="session-left-top">성별</div>
                      <div className="session-left-bottom">
                        <span>남</span>
                        <label>
                          <Gender
                            type="radio"
                            name="gender"
                            value="male"
                            checked={gender === "male"}
                            onChange={onChangegender}
                          />
                        </label>
                        <span>여</span>
                        <label>
                          <Gender
                            type="radio"
                            name="gender"
                            value="female"
                            checked={gender === "female"}
                            onChange={onChangegender}
                          />
                        </label>
                      </div>
                    </div>
                    <div className="session-right">
                      <div className="session-right-top">나이</div>
                      <div className="session-right-bottom">
                        <Input1
                          width="80%"
                          marginTop="-5px"
                          height="100%"
                          onChange={onChangeAge}
                          onBlur={onChangeAge}
                          onFocus={onChangeAge}
                        ></Input1>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="right">
                <div className="busyness">
                  <div className="text">
                    <div className="text-title-option">
                      사업자정보입력(선택)
                    </div>
                    <div className="text-main">
                      영리목적의 음원등록, 공연등록, 반복적인 판매 서비스를
                      이용하는 경우 사업자등록 및 인증이 필요합니다.
                    </div>
                    <br />
                    <div className="text-main">
                      입력하지 않더라도 구매 서비스 및 단발성 판매 서비스는
                      이용하실 수 있습니다.
                    </div>
                    <br />
                    <div className="text-main">
                      작성하지 않더라도 회원가입 가능하며 필요시 마이페이지에서
                      인증하실 수 있습니다.
                    </div>
                  </div>
                  <div className="input-busyness-number">
                    <div className="input-busyness-number-session">
                      <p>사업자 번호</p>
                      <Input
                        width="100%"
                        height="20%"
                        onChange={onChangeBiss}
                      ></Input>
                      <p>상호 명</p>
                      <Input width="100%" height="20%"></Input>
                    </div>
                    <div className="check-button-session">
                      <BusynessButton>확인하기</BusynessButton>
                    </div>
                  </div>
                </div>
                <div className="agreement">
                  <div className="agreement-top">약관 동의</div>
                  <div className="agreement-main">
                    <div className="agreement-main-row">
                      <span style={{ fontWeight: "900" }}>모두 동의</span>
                      <Agree
                        type="checkbox"
                        checked={firstAgree && secondAgree}
                        onChange={handleAllAgreeChange}
                      ></Agree>
                    </div>
                    <div className="agreement-main-row">
                      <span>개인정보처리방침(필수)</span>
                      <Agree
                        type="checkbox"
                        checked={firstAgree}
                        onChange={handleFirstAreeChange}
                      ></Agree>
                    </div>
                    <div className="agreement-main-row">
                      <span>이용약관(필수)</span>
                      <Agree
                        type="checkbox"
                        checked={secondAgree}
                        onChange={handleSecondAreeChange}
                      ></Agree>
                    </div>
                  </div>
                </div>
              </div>
            </Main>
            <BOTTOM>
              <SignUpButton onClick={onClickSignUp}>가입</SignUpButton>
            </BOTTOM>
          </SIGNUP>
        </BACKGROUND>
      </CONTAINER>
    </>
  );
};

export default SignupPage;
