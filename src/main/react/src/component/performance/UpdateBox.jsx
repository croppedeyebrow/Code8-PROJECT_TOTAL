import React, { useEffect, useState } from 'react';
import { UpdateZone, InputBox, Button, DescriptionInput, ImageInput, FileButton } from "../../style/performance/PerformanceUpdateStyle";
import AxiosApi from '../../axios/PerformanceAxios';
import DaumPostcode from 'react-daum-postcode';
import OutsideClickHandler from 'react-outside-click-handler';
import { storage } from '../../api/firebase';
import ModalComponent from '../../utils/ModalComponent';
import { useNavigate } from 'react-router-dom';
import NoneBtnModalComponent from '../../utils/NoneBtnModalComponent';


const UpdateBox = ({ userList }) => {
  const navigate = useNavigate();
  
  // 입력값 정보 저장
  const [ inputPerformer, setInputPerformer ] = useState([]); // 참여자
  // 닉네임 조회 정보 저장용
  const [searchResults, setSearchResults] = useState([]); // 조회된 회원 정보 저장
  const [inputValue, setInputValue] = useState(''); // 입력필드에 입력값을 저장
  const [ inputVenue, setInputVenue ] = useState(""); // 공연장소
  const [ inputDetailVenue, setInputDetailVenue ] = useState(""); // 상세공연장소
  const [ inputDate, setInputDate ] = useState(""); // 공연일시
  const [ inputPrice, setInputPrice ] = useState(""); // 공연티켓가격
  const [ inputTitle, setInputTitle ] = useState(""); // 공연제목
  // 포스터 관련
  const [file, setFile] = useState(""); // 프로필이미지 입력값
  const [url, setUrl] = useState("https://firebasestorage.googleapis.com/v0/b/chord8-22e59.appspot.com/o/%EC%9E%90%EC%82%B0%2022%403x.png?alt=media&token=cff6882e-61bd-4fe5-80b7-778dfcdebfad"); // 업로드된 이미지의 URL
  const [fileName, setFileName] = useState(''); //이미지이름
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태를 나타내는 상태 변수

  const [ inputSeat, setInputSeat ] = useState(""); // 좌석수
  const [ inputDescription, setInputDescription ] = useState(""); // 공연소개

  // 유효성 검사, 포스터이미지, 설명은 없어도 되는 값이므로 제외
  const [ isperformer, setIsPerformer ] = useState(false); // 참여자 입력유무
  const [ isvenue, setIsVenue ] = useState(false); // 공연장소 입력유무
  const [ isdetailVenue, setIsDetailVenue ] = useState(false); // 상세공연장소 입력유무
  const [ isdate, setIsDate ] = useState(false); // 공연일시 입력유무
  const [ istitle, setIsTitle ] = useState(false); // 공연제목 입력유무
  const [ isseat, setIsSeat ] = useState(false); // 좌석수 입력유무
  
  // 카카오 주소 API 관련
  const [showPostcode, setShowPostcode] = useState(false);

  // 모달 오픈 관련
  const [isModalOpen, setIsModalOpen] = useState(false);

    
  // 아래 두 줄은 내가 post를 하기 위해 작성한 거라서, 두 줄은 상황에 맞춰 변경하면 되고 참고하지 않아도 된다.
  // const [calendarlocation, setCalendarLocation] = useState("")
  // const locations = { calendarLocation: calendarlocation }
  
  useEffect(() => {
    if (inputValue) {
      const filtered = (userList || []).filter(user => 
        user.userNickname.includes(inputValue)
      );
      setSearchResults(filtered);
    }
  }, [inputValue, userList]);

  // 조회된 닉네임을 클릭하면 inputPerformer 배열에 추가
  const handleSelect = (nickname) => {
    if (inputPerformer.includes(nickname)) {
      alert('이미 선택된 회원입니다');
    } else {
      setInputPerformer([...inputPerformer, nickname]);
    }
  };
  useEffect(() => {
    // inputPerformer의 값이 변경될 때마다 이 로직이 실행됩니다.
    // 여기에 닉네임의 색상을 변경하는 로직을 넣을 수 있습니다.
  }, [inputPerformer]);

// 모든 닉네임을 지우는 함수
const clearAll = () => {
  setInputPerformer([]);
};

  // // 참여자 입력값이 변경될 때마다 회원 정보 조회
  // useEffect(() => {
  //   if (inputPerformer) {
  //     const filtered = (userList || []).filter(nickname => 
  //       nickname.userNickname.includes(inputPerformer)
  //     );
  //     console.log(filtered);
  //     setSearchResults(filtered);
  //   }
  // }, [inputPerformer, userList]);
     

  // // 조회된 닉네임을 클릭하면 inputPerformer 배열에 추가
  // const addPerformer = (nickname) => {
  //   if (!inputPerformer.includes(nickname)) {
  //     setInputPerformer([...inputPerformer, nickname]);
  //   }
  // };

  // 주소검색 API 관련
  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = ''; 

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
      }
      fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
    }

    setInputVenue(fullAddress);
    setShowPostcode(false);
  }
  
  // 포스터 이미지 업로드 관련
  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
    console.log("파일선택 완료, 이미지명: " + e.target.files[0].name);
    uploadFile(file);    
  };
  // 이미지 업로딩 상태 관련
  const uploadFile = async (file) => {
    setIsLoading(true);
    try {
      const storageRef = storage.ref();
      const fileRef = storageRef.child(file.name);
      await fileRef.put(file); // 파일 업로드를 기다립니다.
      console.log("File uploaded successfully!");
      const url = await fileRef.getDownloadURL(); // 파일 다운로드 URL을 가져옵니다.
      console.log("저장경로 확인 : " + url);
      setUrl(url);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false); // 파일 업로드가 끝났을 때 로딩 상태를 false로 설정
    }
  };

  // const handleUploadClick = () => {
  //   setIsLoading(true); // 파일 업로드가 시작될 때 로딩 상태를 true로 설정
  //   const storageRef = storage.ref();
  //   const fileRef = storageRef.child(file.name);
  //   fileRef.put(file).then(() => {
  //     console.log("File uploaded successfully!");
  //     fileRef.getDownloadURL().then((url) => {
  //       console.log("저장경로 확인 : " + url);
  //       setUrl(url);
  //       setIsLoading(false); // 파일 업로드가 끝났을 때 로딩 상태를 false로 설정
  //     });
  //   });
  // };

  
   // 공연 등록버튼 클릭 시 실행되는 함수
  const onClickSetPerformance = async () => {
    const formattedDate = inputDate.replace('T', ' ');

    

    const performanceData = await AxiosApi.setPerformance( // 공연정보 입력값 BE로 전송
      {
        performer: inputPerformer, // 참여자
        venue: inputVenue, // 주소
        detailVenue: inputDetailVenue, // 상세주소
        performanceDate: formattedDate, // 공연일시
        price: inputPrice, // 공연티켓가격
        performanceName: inputTitle, // 공연제목
        performanceImage: url, // 포스터
        seatCount: inputSeat, // 좌석수
        description: inputDescription // 공연소개
      }
    )
    console.log(performanceData); // 입력값 확인용 콘솔
    setIsModalOpen(true); // 공연 등록 완료 후 모달 열기
    // navigate('/Performance');
  // setTimeout(() => {
  //   setIsModalOpen(false); // 일정 시간 후 모달 닫기
  //   navigate('/Performance'); // /Performance 페이지로 이동
  // }, 1000); // 1초 후에 모달을 닫고 페이지를 이동합니다. 시간은 필요에 따라 조정할 수 있습니다.
  }
  const closeModalAndNavigate = () => {
    setIsModalOpen(false);
    navigate('/Performance');
  }
  
  
  
  return (
    <>
      <UpdateZone>
        <h1>공연 등록하기</h1>
        <div className="performer">
          <ModalComponent 
          open="참여자 입력" 
          content={
            <div style={{ width: '100%', height: '100%' }}> {/* 크기를 최대로 설정 */}
              <div className='title'>참여자 입력</div>
              <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
              <InputBox placeholder="선택된 닉네임" value={inputPerformer.join(', ')} readOnly />
              {searchResults.map(user => (
                <div key={user.userNickname} 
                onClick={() => handleSelect(user.userNickname)}
                style={{
                  color: inputPerformer === user.userNickname ? 'blue' : 'black',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => e.target.style.color = 'gray'}
                onMouseOut={(e) => e.target.style.color = inputPerformer === user.userNickname ? 'blue' : 'black'}>
                  {user.userNickname}
                </div>
              ))}
              <button className='eraser' onClick={clearAll}>모두 지우기</button>
            </div>
          } 
          close="닫기" 
          customButton={null}
        />
        <InputBox placeholder="선택된 닉네임" value={inputPerformer.join(', ')} readOnly />
          </div>
        <div className="inputContainer">
          
          <div className="venue">
          공연 주소
            <InputBox placeholder="주소" value={inputVenue} onClick={() => setShowPostcode(true)} readOnly />
            {showPostcode && (
              <div style={{ position: 'absolute', zIndex: 1000, width: '90%'}}>
                <OutsideClickHandler onOutsideClick={() => {setShowPostcode(false); setInputVenue('');}}>
                  <DaumPostcode onComplete={handleComplete} />
                </OutsideClickHandler>
              </div>
            )}
          </div>
          <div className="detailVenue">
            상세 주소
            <InputBox placeholder="상세주소" value={inputDetailVenue} onChange={(e) => setInputDetailVenue(e.target.value)}/>
          </div>
          <div className="date">
            일시
            <InputBox type="datetime-local"  value={inputDate} onChange={(e) => setInputDate(e.target.value)}/>
          </div>
          <div className="price">
            티켓 가격
            <InputBox placeholder="가격" value={inputPrice} onChange={(e) => setInputPrice(e.target.value)}/>
          </div>
          <div className="title">
            제목
            <InputBox placeholder="제목" value={inputTitle} onChange={(e) => setInputTitle(e.target.value)}/>
          </div>
          <div className="poster">
            포스터
            <ImageInput onChange={handleFileInputChange}/>
            {/* <FileButton onClick={() => document.getElementById('file').click()} > 파일 선택</FileButton> */}
          </div>
          <div className="uploading">
          {isLoading ? <p>파일 업로드 중...</p> : null}
          </div>
          <div className="seat">
            좌석 수
            <InputBox placeholder="좌석 수" value={inputSeat} onChange={(e) => setInputSeat(e.target.value)}/>
          </div>
          <div className="discription">
            소개
            <DescriptionInput value={inputDescription} onChange={(e) => setInputDescription(e.target.value)}/>
          </div>
        </div>
        <div className="buttonContainer">
        <Button enabled onClick={onClickSetPerformance}>등록하기</Button>
        </div>
      </UpdateZone>
      <NoneBtnModalComponent 
      isOpen={isModalOpen}
      setIsOpen={setIsModalOpen}
      content="공연 등록이 완료되었습니다."
      close={{ func: closeModalAndNavigate, text: "닫기"}} 
    />
    </>
  );
};

export default UpdateBox;