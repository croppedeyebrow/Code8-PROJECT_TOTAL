import { useEffect, useState } from "react";
import { Container, SideMenu, InfoBox } from "../style/AdminStyle";
import { useNavigate } from "react-router-dom";
import SignUpAxios from "../axios/SignUpAxios";

const AdminPage = () => {
  const [selectedButton, setSelectedButton] = useState("User");
  const useanvigate = useNavigate();

  useEffect(() => {
    const isAdmin = async () => {
      const res = await SignUpAxios.checkAddmin();
      console.log("어드민?", res);
      if (res.data === true) {
        alert("관리자님, 안녕하세요!");
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
          >
            Point
          </button>
          <button
            style={{
              backgroundColor:
                selectedButton === "Store" ? "var(--mainsky)" : "",
            }}
            onClick={() => setSelectedButton("Store")}
          >
            Store
          </button>
        </SideMenu>
        <InfoBox>
          <div className="top">
            <div className="left">
              <div className="title">{selectedButton}</div>
              <div className="count">
                Total a {4230} {selectedButton}
              </div>
            </div>
            <div className="right">
              <div className="buttonzone">
                <button>+Add new</button>
                <button
                  style={{ backgroundColor: "white", color: "var(--mainblue)" }}
                >
                  Export Excel
                </button>
              </div>
              <div className="buttonzone">
                <button>Graph</button>
                <button>Filter</button>
              </div>
            </div>
          </div>
          <div className="info"></div>
        </InfoBox>
      </Container>
    </>
  );
};
export default AdminPage;
