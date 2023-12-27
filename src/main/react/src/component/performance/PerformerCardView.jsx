import { useNavigate } from "react-router-dom"
import styled from "styled-components";

const CardView = styled.div`
  width: 40rem;
  height: 12.3rem;
  display: flex;
  align-items: center;
  margin-top: 3rem;
`

const ProfileImage = styled.img`
  width: 12.3rem;
  height: 12.3rem;
  border-radius: 50%;
  background-color: lightgray;
  &:hover {
    cursor: pointer;
    transform: scale(1.1);
    transition: transform 0.05s ease-in-out;
            }
`

const Nickname = styled.div`
  font-size: 2.3rem;
  font-weight: 500;
  margin-left: 2rem;
  color: black;
  &:hover {
    cursor: pointer;
  }
`

const PerformerCardView = ({
  profileImage,
  nickname,
}) => {
  console.log("퍼포머 카드뷰 : ", "profileImage : ", profileImage, "nickname : ", nickname)
  const navigate = useNavigate();

return (
  <>
    <CardView>
      <ProfileImage src={profileImage} alt={`${nickname} 프로필`}/>
      <Nickname>{nickname}</Nickname>

    </CardView>
  </>  
)
}

export default PerformerCardView;
