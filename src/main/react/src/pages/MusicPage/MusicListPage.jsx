import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import FooterContext from "../../context/FooterContext";
import Searchicon from "../../images/SearchIcon.png";
import Waveform from "../../component/musicList/MusicPlayer";
import { Link } from "react-router-dom";
import MusicAxiosApi from "../../axios/MusicAxios";

const SingList = styled.div`
  width: 100%;
  height: 100rem;
  display: flex;
  position: relative;
  flex-direction: column;
  background-color: white;
`;

const SingerPost = styled.div`
  width: 100vw;
  height: 50rem;
  justify-content: center;
  display: flex;
  position: relative;
  box-shadow: 0 0.5rem rgba(0, 0, 0, 0.2);
  color: white;
`;

const SingerPostImg = styled.img`
  width: 100vw;
  height: 100%;
  display: flex;
  position: relative;
  object-fit: cover;
  overflow: hidden;
  // bottom: 20rem;
`;

const SearchBarBox = styled.div`
  display: flex;
  position: relative;
  margin-top: 5rem;
  margin-bottom: 5rem;
  background-color: white;
  width: 100vw;
  height: 17rem;
  justify-content: center;
  align-items: center;
`;

const SearchBar = styled.div`
  width: 80rem;
  height: 8rem;
  border-radius: 1.5rem;
  border: 1px solid #008bff;
  // margin-left: 15rem;
  position: relative;
  display: flex;
  background-color: #eeeeee;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 4px #00000040;
`;

const SingLIstBottom = styled.div`
  height: 150rem;
  width: 100vw;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ListNavbar = styled.div`
  width: 80vw;
  height: 6rem;
  display: flex;
  position: relative;
  flex-direction: row;
  align-items: center;
  gap: 1.5rem;
  background-color: black;
  box-shadow: 5px;
  border: 0.5rem solid #00ffa8;
  // padding-left: 10rem;
  border-radius: 1rem;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2); /* 음영 효과를 주는 box-shadow 설정 */
`;

const MusicCategory01 = styled.div`
  width: 11rem;
  height: 5.5rem;
  display: flex;
  position: relative;
  flex-direction: row;
  background-color: black;
  color: #aa9797;
  font-size: 1.8rem;
  align-items: center;
  justify-content: center;
  overflow: hidden; /* 텍스트 밑으로 확장되지 않도록 오버플로우 제어 */

  /* 호버 효과 스타일 */
  &:hover {
    color: white; /* 호버 시 텍스트 색상 변경 */
    cursor: pointer; /* 호버 시 마우스 커서 변경 */
    text-decoration: none; /* 밑줄 제거 */
  }

  &:before,
  &:after {
    content: "";
    position: absolute;
    width: 0%; /* 초기에는 화면의 절반만큼의 너비를 가짐 */
    height: 2px; /* 밑줄 높이 */
    bottom: 0;
    background-color: #61e6ca; /* 밑줄 색상 */
    transition: width 0.3s ease; /* 변화 시 애니메이션 */
  }

  &:hover:before,
  &:hover:after {
    width: 100%; /* 호버 시 전체 너비로 확장 */
    transition: width 0.3s ease; /* 변화 시 애니메이션 */
  }
`;

const MusicCategory02 = styled.div`
  width: 11rem;
  height: 5.5rem;
  display: flex;
  position: relative;
  flex-direction: row;
  background-color: black;
  color: #aa9797;
  font-size: 1.8rem;
  align-items: center;
  justify-content: center;
  overflow: hidden; /* 텍스트 밑으로 확장되지 않도록 오버플로우 제어 */

  /* 호버 효과 스타일 */
  &:hover {
    color: white; /* 호버 시 텍스트 색상 변경 */
    cursor: pointer; /* 호버 시 마우스 커서 변경 */
    text-decoration: none; /* 밑줄 제거 */
  }

  &:before,
  &:after {
    content: "";
    position: absolute;
    width: 0%; /* 초기에는 화면의 절반만큼의 너비를 가짐 */
    height: 2px; /* 밑줄 높이 */
    bottom: 0;
    background-color: #61e6ca; /* 밑줄 색상 */
    transition: width 0.3s ease; /* 변화 시 애니메이션 */
  }

  &:hover:before,
  &:hover:after {
    width: 100%; /* 호버 시 전체 너비로 확장 */
    transition: width 0.3s ease; /* 변화 시 애니메이션 */
  }
`;

const MusicCategory03 = styled.div`
  width: 11rem;
  height: 5.5rem;
  display: flex;
  position: relative;
  flex-direction: row;
  background-color: black;
  color: #aa9797;
  font-size: 1.8rem;
  align-items: center;
  justify-content: center;
  overflow: hidden; /* 텍스트 밑으로 확장되지 않도록 오버플로우 제어 */

  /* 호버 효과 스타일 */
  &:hover {
    color: white; /* 호버 시 텍스트 색상 변경 */
    cursor: pointer; /* 호버 시 마우스 커서 변경 */
    text-decoration: none; /* 밑줄 제거 */
  }

  &:before,
  &:after {
    content: "";
    position: absolute;
    width: 0%; /* 초기에는 화면의 절반만큼의 너비를 가짐 */
    height: 2px; /* 밑줄 높이 */
    bottom: 0;
    background-color: #61e6ca; /* 밑줄 색상 */
    transition: width 0.3s ease; /* 변화 시 애니메이션 */
  }

  &:hover:before,
  &:hover:after {
    width: 100%; /* 호버 시 전체 너비로 확장 */
    transition: width 0.3s ease; /* 변화 시 애니메이션 */
  }
`;

const MusicCategory04 = styled.div`
  width: 11rem;
  height: 5.5rem;
  display: flex;
  position: relative;
  flex-direction: row;
  background-color: black;
  color: #aa9797;
  font-size: 1.8rem;
  align-items: center;
  justify-content: center;
  overflow: hidden; /* 텍스트 밑으로 확장되지 않도록 오버플로우 제어 */

  /* 호버 효과 스타일 */
  &:hover {
    color: white; /* 호버 시 텍스트 색상 변경 */
    cursor: pointer; /* 호버 시 마우스 커서 변경 */
    text-decoration: none; /* 밑줄 제거 */
  }

  &:before,
  &:after {
    content: "";
    position: absolute;
    width: 0%; /* 초기에는 화면의 절반만큼의 너비를 가짐 */
    height: 2px; /* 밑줄 높이 */
    bottom: 0;
    background-color: #61e6ca; /* 밑줄 색상 */
    transition: width 0.3s ease; /* 변화 시 애니메이션 */
  }

  &:hover:before,
  &:hover:after {
    width: 100%; /* 호버 시 전체 너비로 확장 */
    transition: width 0.3s ease; /* 변화 시 애니메이션 */
  }
`;

const MusicCategory05 = styled.div`
  width: 11rem;
  height: 5.5rem;
  display: flex;
  position: relative;
  flex-direction: row;
  background-color: black;
  color: #aa9797;
  font-size: 1.8rem;
  align-items: center;
  justify-content: center;
  overflow: hidden; /* 텍스트 밑으로 확장되지 않도록 오버플로우 제어 */

  /* 호버 효과 스타일 */
  &:hover {
    color: white; /* 호버 시 텍스트 색상 변경 */
    cursor: pointer; /* 호버 시 마우스 커서 변경 */
    text-decoration: none; /* 밑줄 제거 */
  }

  &:before,
  &:after {
    content: "";
    position: absolute;
    width: 0%; /* 초기에는 화면의 절반만큼의 너비를 가짐 */
    height: 2px; /* 밑줄 높이 */
    bottom: 0;
    background-color: #61e6ca; /* 밑줄 색상 */
    transition: width 0.3s ease; /* 변화 시 애니메이션 */
  }

  &:hover:before,
  &:hover:after {
    width: 100%; /* 호버 시 전체 너비로 확장 */
    transition: width 0.3s ease; /* 변화 시 애니메이션 */
  }
`;

const ListContainer = styled.div`
  width: 80vw;
  height: 107rem;
  display: flex;
  position: relative;
  flex-direction: column;
  // border: 1px solid green;
  background-color: #171717;
`;

const ListBox = styled.div`
  width: 80vw;
  height: 10rem;
  margin-bottom: 1rem;
  // padding-left: 3rem;
  background-color: #171717;
  border: 0.2px solid white;
  display: flex;
  position: relative;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
  gap: 4rem;
`;

const MusicThumnail = styled.img`
  width: 4rem;
  height: 4rem;
  // border: 1px solid white;
  border-radius: 8rem;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;

  /* 호버 효과 스타일 */
  &:hover {
    cursor: pointer; /* 호버 시 마우스 커서 변경 */
    box-shadow: 0px 4px 8px white;
    transform: scale(1.1);
  }
`;

const MusicDet = styled.div`
  width: 15rem;
  height: 8.4rem;
  // border: 1px solid white;
  display: flex;
  position: relative;
  flex-direction: column;
`;

const SongName = styled.div`
  width: 15rem;
  height: 4.2rem;
  // border: 1px solid white;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 1.4rem;
  overflow: hidden; /* 텍스트 밑으로 확장되지 않도록 오버플로우 제어 */

  /* 호버 효과 스타일 */
  &:hover {
    color: white; /* 호버 시 텍스트 색상 변경 */
    cursor: pointer; /* 호버 시 마우스 커서 변경 */
    text-decoration: none; /* 밑줄 제거 */
  }

  &:before,
  &:after {
    content: "";
    position: absolute;
    width: 0%; /* 초기에는 화면의 절반만큼의 너비를 가짐 */
    height: 10px; /* 밑줄 높이 */
    bottom: 0;
    background-color: #61e6ca; /* 밑줄 색상 */
    transition: width 0.3s ease; /* 변화 시 애니메이션 */
  }

  &:hover:before,
  &:hover:after {
    width: 100%; /* 호버 시 전체 너비로 확장 */
    transition: width 0.3s ease; /* 변화 시 애니메이션 */
  }
`;

const SingerName = styled.div`
  width: 15rem;
  height: 4.2rem;
  // border: 1px solid white;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  color: #aaaaaa;
  font-size: 1.2rem;
`;

const MusicPlaySet = styled.div`
  width: 41rem;
  height: 6rem;
  display: flex;
  position: relative;
  // border: 1px solid white;
  color: white;
`;

const MusicTag = styled.div`
  width: 17rem;
  height: 4rem;
  // border: 1px solid white;
  color: white;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  font-weight: 400;
  font-size: 1.3rem;
`;

const PublishDay = styled.div`
  width: 5rem;
  height: 4rem;
  border: 1px solid black;
  color: #00ffa8;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  font-weight: 400;
  font-size: 1.3rem;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 8rem;
`;

const PaginationButton = styled.button`
  margin: 0 5px;
  padding: 5px 10px;
  background-color: ${(props) => (props.clicked ? "#00ffa8" : "black")};
  color: ${(props) => (props.clicked ? "black" : "white")};
  color: white;
  cursor: pointer;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2); /* 음영 효과 추가 */
  transition: box-shadow 0.3s ease-in-out, background-color 0.3s ease-in-out,
    color 0.3s ease-in-out; /* 음영 효과의 변화를 자연스럽게 설정 */

  /* 호버 효과 스타일 */
  &:hover {
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3); /* 호버 시 음영 효과 변경 */
  }
`;

const InputBox = styled.div`
  height: 8rem;
  border: none;
  position: relative;
  display: flex;
  width: 81rem;
`;

const SearchInput = styled.input`
  background-color: #ffffff;
  border: 1px solid #008bff;
  border-radius: 3rem;
  box-shadow: inset 0px 4px 4px #00000040;
  height: 5rem;
  left: 2rem;
  position: relative;
  display: flex;
  top: 14px;
  width: 72rem;
  padding: 0 2rem;
  font-size: 1.4rem;

  /* 호버 효과 스타일 */
  &:hover {
    transform: scale(1.005);
    cursor: pointer; /* 호버 시 마우스 커서 변경 */

    /* 클릭 시 테두리 없애기 */
    &:focus {
      outline: none;
    }
  }
`;

const SearchButton = styled.button`
  background-color: #008bff;
  border-radius: 2rem;
  color: white;
  height: 4rem;
  display: flex;
  position: relative;
  align-items: center;
  top: 2rem;
  right: 4rem;
  width: 4rem;
  border: none;
  transition: transform 0.3s ease; /* 호버 시 변화를 부드럽게 만들기 위한 transition 속성 */

  /* 호버 효과 스타일 */
  &:hover {
    transform: scale(1.1); /* 호버 시 크기를 1.1배로 확대 */
    cursor: pointer; /* 호버 시 마우스 커서 변경 */
  }
  /* 클릭 효과 스타일 */
  &:active {
    transform: scale(0.9); /* 클릭 시 크기를 0.9배로 축소 */
  }
`;

const SearchIcon = styled.img`
  width: 3rem;
  height: 3rem;
  position: relative;
  display: flex;
  // left: 0.4rem;
`;

const MusicList = () => {
  const { id } = useParams();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [musicinfolist, setMusicInfoList] = useState(null);
  const [promoImages, setPromoImages] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);

  //아이콘 저작권 링크.
  const { setFooterData } = useContext(FooterContext);

  useEffect(() => {
    setFooterData(
      <a
        href="https://www.flaticon.com/free-animated-icons/pause"
        title="pause animated icons"
      >
        Pause animated icons created by Freepik - Flaticon
      </a>,
      <a
        href="https://www.flaticon.com/free-animated-icons/music"
        title="music animated icons"
      >
        Music animated icons created by Freepik - Flaticon
      </a>,
      <a
        href="https://www.flaticon.com/free-icons/magnifying-glass"
        title="magnifying glass icons"
      >
        Magnifying glass icons created by Smashicons - Flaticon
      </a>
    );
  }, []);

  //카테고리별 검색
  // 기존 음악 카테고리 클릭 이벤트 핸들러에서 선택된 장르를 설정하는 함수
  const handleGenreClick = (genre) => {
    setSelectedGenre(genre);
    setCurrentPage(1); // 새로운 장르가 선택될 때 현재 페이지를 1로 재설정합니다.
  };

  //키워드별 검색

  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = () => {
    console.log("검색어:", searchValue);

    if (searchValue.trim() === "") {
      // 검색어가 비어 있을 때, 검색 결과 초기화
      setSearchResults([]);
      return;
    }

    // 검색어가 변경될 때마다 musicinfolist를 새로 필터링.
    const filteredMusicInfoList = musicinfolist.filter((item) => {
      const musicTitleIncludesKeyword = item.musicDTO.musicTitle
        .toLowerCase()
        .includes(searchValue.toLowerCase());
      const userNicknameIncludesKeyword = item.userResDto.userNickname
        .toLowerCase()
        .includes(searchValue.toLowerCase());

      return musicTitleIncludesKeyword || userNicknameIncludesKeyword;
    });

    // 필터된 결과를 musicinfolist 상태로 업데이트.
    setSearchResults(filteredMusicInfoList);

    // 검색 결과가 없을 때.
    if (filteredMusicInfoList.length === 0) {
      alert("검색 결과가 없습니다");
    }
  };

  //음악 리스트 불러오기.

  useEffect(() => {
    console.log(id);
    const getAllMusic = async () => {
      try {
        const response = await MusicAxiosApi.getAllMusic();
        console.log("음악 리스트 조회 : ", response.data);
        setMusicInfoList(response.data);
        //api호출 성공시, musicinfolist상태 업데이트

        const promoImageUrls = response.data.map(
          (item) => item.musicDTO.thumbnailImage
        );
        setPromoImages(promoImageUrls);

        // 프로모션 이미지가 있을 경우 자동 슬라이드 적용
        if (promoImageUrls.length > 0) {
          const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
              prevIndex === promoImageUrls.length - 1 ? 0 : prevIndex + 1
            );
          }, 5000); // 5초마다 슬라이드 변경

          return () => clearInterval(interval);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getAllMusic();
  }, []);

  //여기서부터 리스트 페이지네이션
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 11;
  const totalItems = 110;

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const getItemsForPage = (page) => {
    if (!musicinfolist || !Array.isArray(musicinfolist)) {
      return []; // musicinfolist가 null이거나 배열이 아닌 경우 빈 배열 반환
    }

    // 검색어를 고려한 필터링
    let filteredMusicInfoList = musicinfolist;
    if (searchValue.trim() !== "") {
      const lowerCaseSearchValue = searchValue.toLowerCase();
      filteredMusicInfoList = filteredMusicInfoList.filter(
        (item) =>
          item.musicDTO.musicTitle
            .toLowerCase()
            .includes(lowerCaseSearchValue) ||
          item.userResDto.userNickname
            .toLowerCase()
            .includes(lowerCaseSearchValue)
      );
    }

    // 장르에 따른 필터링
    filteredMusicInfoList = filteredMusicInfoList.filter(
      (item) => !selectedGenre || item.musicDTO.genre === selectedGenre
    );

    console.log("필터값 별 음악 조회 :", filteredMusicInfoList); // 필터링된 음악 목록 콘솔 출력

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

    return filteredMusicInfoList
      .slice(startIndex, endIndex)
      .map((item, index) => (
        <ListBox key={startIndex + index}>
          <Link to={`/music-info/${item.musicDTO.id}`}>
            <MusicThumnail
              alt="앨범썸네일"
              src={item.musicDTO.thumbnailImage}
            />
          </Link>
          <MusicDet>
            <SongName>{item.musicDTO.musicTitle}</SongName>
            <SingerName>{`by : ${item.userResDto.userNickname}`}</SingerName>
          </MusicDet>
          <MusicPlaySet>
            <audio
              // music={musicFiles[(startIndex + index) % musicFiles.length]}
              controls
              src={item.musicDTO.musicFile}
            />
          </MusicPlaySet>
          <MusicTag>{item.musicDTO.genre}</MusicTag>
          <PublishDay>{`발매일 : ${item.musicDTO.releaseDate}`}</PublishDay>
        </ListBox>
      ));
  };

  const currentItems = getItemsForPage(currentPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <PaginationButton
          key={i}
          onClick={() => handlePageChange(i)}
          disabled={currentPage === i}
          clicked={currentPage === i} // 클릭된 버튼의 스타일을 변경하기 위한 속성
        >
          {i}
        </PaginationButton>
      );
    }
    return pageNumbers;
  };

  return (
    <SingList>
      <SingerPost>
        <div
          style={{ width: "100%", overflow: "hidden", position: "relative" }}
        >
          <div
            style={{
              display: "flex",
              transition: "transform 0.5s ease-in-out",
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {promoImages.map((promoImg, index) => (
              <div
                key={index}
                style={{
                  flex: "0 0 auto",
                  maxWidth: "100%",
                }}
              >
                <SingerPostImg
                  alt={`Promo Image ${index + 1}`}
                  src={promoImg}
                  style={{
                    width: "100vw",
                    height: "100vh",
                    objectFit: "contain",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </SingerPost>

      <SearchBarBox>
        <SearchBar>
          {/* <SearchBox></SearchBox> */}

          <InputBox>
            <SearchInput
              type="text"
              placeholder="관심있는 인디가수의 이름이나 곡 이름을 검색하세요."
              value={searchValue}
              onChange={handleInputChange}
            />
            <SearchButton onClick={handleSearch}>
              <SearchIcon alt="검색돋보기" src={Searchicon} />
            </SearchButton>
          </InputBox>
        </SearchBar>
      </SearchBarBox>

      <SingLIstBottom>
        <ListNavbar>
          <MusicCategory01 onClick={() => handleGenreClick("발라드")}>
            발라드
          </MusicCategory01>
          <MusicCategory02 onClick={() => handleGenreClick("락/메탈")}>
            락/메탈
          </MusicCategory02>
          <MusicCategory03 onClick={() => handleGenreClick("힙합/랩")}>
            힙합/랩
          </MusicCategory03>
          <MusicCategory04 onClick={() => handleGenreClick("R&B/soul")}>
            R&B/soul
          </MusicCategory04>
          <MusicCategory05 onClick={() => handleGenreClick("포크/블루스")}>
            포크/블루스
          </MusicCategory05>
        </ListNavbar>

        <ListContainer>{currentItems}</ListContainer>

        <PaginationContainer>{renderPagination()}</PaginationContainer>
      </SingLIstBottom>
    </SingList>
  );
};

export default MusicList;
