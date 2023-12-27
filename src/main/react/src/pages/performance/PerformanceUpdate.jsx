import AxiosApi from "../../axios/PerformanceAxios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, UserInfo, UpdateZone, InputBox, Button } from "../../style/performance/PerformanceUpdateStyle";
import UpdateBox from "../../component/performance/UpdateBox";
import UpdateUserInfo from "../../component/performance/UpdateUserInfo";
import ModalComponent from "../../utils/ModalComponent";



const PerformanceUpdate = () => {

  // // 입력값 정보 저장
  // const [ performer, setPerformer ] = useState([]); // 참여자
  // const [ venue, setVenue ] = useState(""); // 공연장소
  // const [ detailVenue, setDetailVenue ] = useState(""); // 상세공연장소
  // const [ date, setDate ] = useState(""); // 공연일시
  // const [ title, setTitle ] = useState(""); // 공연제목
  // const [ poster, setPoster ] = useState(""); // 포스터
  // const [ seat, setSeat ] = useState(""); // 좌석수
  // const [ description, setDescription ] = useState(""); // 공연소개

  // // 유효성 검사, 포스터이미지, 설명은 없어도 되는 값이므로 제외
  // const [ isperformer, setIsPerformer ] = useState(false); // 참여자 입력유무
  // const [ isvenue, setIsVenue ] = useState(false); // 공연장소 입력유무
  // const [ isdetailVenue, setIsDetailVenue ] = useState(false); // 상세공연장소 입력유무
  // const [ isdate, setIsDate ] = useState(false); // 공연일시 입력유무
  // const [ istitle, setIsTitle ] = useState(false); // 공연제목 입력유무
  // const [ isseat, setIsSeat ] = useState(false); // 좌석수 입력유무

  const [userList, setUserList] = useState([]); // AxiosApi로 가져온 유저정보를 저장

  const navigate = useNavigate();

  const email = (window.localStorage.getItem("email"));
  console.log(email);

  useEffect(() => {
    if (!email) {
      alert("로그인이 필요합니다.");
      navigate("/login");
    }
  }, []); 

  useEffect(() => {
    // 컴포넌트가 마운트될 때 모든 회원정보를 불러옵니다.
    const fetchUserList = async () => {
        try {
            const response = await AxiosApi.getUserList();
            setUserList(response.data);
        } catch (error) {
            console.error('Error fetching performance list', error);
        }
    };
    fetchUserList();
}, []);

useEffect(() => {
  console.log(userList);
}, [userList]); // userList가 변경될 때마다 로그를 출력합니다.
  // 입력값을 서버로 전송할 부분


  return (
    <>
    <Container>
      <UpdateUserInfo userList={userList}/>
      <UpdateBox userList={userList}/>
    </Container>
    </>
  );

};

export default PerformanceUpdate;