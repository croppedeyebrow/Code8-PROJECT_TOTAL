import { useState } from "react";
import CommunityAxiosApi from "../../axios/CommunityAxios";
import { useNavigate } from "react-router-dom";
import {
  SearchButton,
  SearchContainer,
  SearchInput,
  Select,
} from "../../style/CommunityPostStyle";

const SearchComponent = () => {
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("");
  const [searchType, setSearchType] = useState("titleAndContent");

  const search = async () => {
    const result = await CommunityAxiosApi.searchCommunity(searchType, keyword);

    // navigate를 사용하여 결과 페이지로 이동. 두번째 파라미터로 상태를 전달.
    console.log(result.data);
    navigate(`/community/search/${keyword}`, {
      state: { result: result.data },
    });
  };
  return (
    <>
      <SearchContainer>
        <Select onChange={(event) => setSearchType(event.target.value)}>
          <option value="titleAndContent">제목+내용</option>
          <option value="title">제목</option>
          <option value="nickname">글쓴이</option>
          <option value="comment">댓글</option>
        </Select>
        <SearchInput
          type="text"
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
          placeholder="검색어를 입력하세요"
        />
        <SearchButton onClick={search}>검색</SearchButton>
      </SearchContainer>
    </>
  );
};
export default SearchComponent;
