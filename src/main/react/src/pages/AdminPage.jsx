import { useEffect, useState } from "react";
import { Container, SideMenu, InfoBox } from "../style/AdminStyle";
import { useNavigate } from "react-router-dom";
import SignUpAxios from "../axios/SignUpAxios";
import UserList from "../component/admin/UserList";
import PerformanceAxios from "../axios/PerformanceAxios";

const AdminPage = () => {
  const useanvigate = useNavigate();

  // 회원 정보 및 통계
  const [selectedButton, setSelectedButton] = useState("User");
  const [userList, setUserList] = useState([]);
  const [male, setMale] = useState([]);
  const [female, setFemale] = useState([]);
  const [userAgeList, setUserAgeList] = useState({
    twenties: [],
    thirties: [],
    forties: [],
    others: [],
  });
  // 그래프 통계를 위한 클릭 함수
  const onClick = () => {
    setSelectedButton(selectedButton + "Graph1");
    if (userList) {
      setMale(userList.filter((user) => user.userGen === "male"));
      setFemale(userList.filter((user) => user.userGen === "female"));
      const twentiesList = userList.filter(
        (data) => data.userAge >= 20 && data.userAge <= 29
      );

      const thirtiesList = userList.filter(
        (data) => data.userAge >= 30 && data.userAge <= 39
      );

      const fortiesList = userList.filter(
        (data) => data.userAge >= 40 && data.userAge <= 49
      );

      const otherList = userList.filter(
        (data) => data.userAge <= 19 || data.userAge >= 50
      );

      setUserAgeList({
        twenties: twentiesList,
        thirties: thirtiesList,
        forties: fortiesList,
        others: otherList,
      });
    }
  };

  // 유저 정보 호출 함수
  const getData = async () => {
    try {
      if (selectedButton === "User") {
        const res = await PerformanceAxios.getUserList();
        if (res.status === 200) {
          console.log("회원 정보들 : ", res);
          setUserList(res.data);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  // 관리자 체크
  useEffect(() => {
    const isAdmin = async () => {
      const res = await SignUpAxios.checkAddmin();
      console.log("어드민?", res);
      if (res.data === true) {
        alert("관리자님, 안녕하세요!");
        // 관리자일 경우 함수 실행
        getData();
      } else {
        window.localStorage.clear();
        useanvigate("/");
      }
    };

    isAdmin();
  }, [useanvigate]);

  return (
    <>
      <Container>
        <SideMenu>
          <button
            style={{
              backgroundColor:
                selectedButton === "User" ? "var(--mainsky)" : "",
            }}
            onClick={() => setSelectedButton("User")}
          >
            User
          </button>
          <button
            style={{
              backgroundColor:
                selectedButton === "Music" ? "var(--mainsky)" : "",
            }}
            onClick={() => setSelectedButton("Music")}
          >
            Music
          </button>
          <button
            style={{
              backgroundColor:
                selectedButton === "Performance" ? "var(--mainsky)" : "",
            }}
            onClick={() => setSelectedButton("Performance")}
          >
            Performance
          </button>
          <button
            style={{
              backgroundColor:
                selectedButton === "Point" ? "var(--mainsky)" : "",
            }}
            onClick={() => setSelectedButton("Point")}
          ></button>
          <button
            style={{
              backgroundColor:
                selectedButton === "Store" ? "var(--mainsky)" : "",
            }}
            onClick={() => setSelectedButton("Store")}
          ></button>
        </SideMenu>
        <InfoBox>
          <div className="top">
            <div className="left">
              <div className="title">{selectedButton}</div>
              <div className="count">
                {/* Total a {4230} {selectedButton} */}
              </div>
            </div>
            <div className="right">
              <div className="buttonzone">
                <button
                  style={{ backgroundColor: "white", color: "var(--mainblue)" }}
                >
                  Export Excel
                </button>
              </div>
              <div className="buttonzone">
                <button onClick={onClick}>Graph1</button>
                <button>Graph2</button>
              </div>
            </div>
          </div>
          <div className="info">
            <UserList
              selectedButton={selectedButton}
              male={male}
              female={female}
              userList={userList}
              userAgeList={userAgeList}
            ></UserList>
          </div>
        </InfoBox>
      </Container>
    </>
  );
};
export default AdminPage;
