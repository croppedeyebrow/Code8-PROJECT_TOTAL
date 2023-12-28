import { ReactComponent as Write } from "../../images/Write.svg";
import { ReactComponent as Prev } from "../../images/Prev.svg";
import { ReactComponent as Next } from "../../images/Next.svg";
import { ReactComponent as Text } from "../../images/write-svgrepo-com.svg";
import { ReactComponent as Image } from "../../images/image-svgrepo-com.svg";
import { ReactComponent as Video } from "../../images/video-camera-svgrepo-com.svg";
import {
  Pagination,
  InputContainer,
  MiddlePage,
  PageContant,
  PostBoarder,
  PostContainer,
  PostList,
  PostListTitle,
  PostPage,
  PostSection,
  PostTable,
  SendButton,
  TableBody,
  TableNormalRow,
  TableRow,
  TableRowDataDate,
  TableRowDataTitle,
  TableRowDataViews,
  TitleContent,
  TableRowDataWriter,
  Page,
  TableRowDataIcon,
} from "../../style/CommunityPostStyle";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CommunityAxiosApi from "../../axios/CommunityAxios";
import Common from "../../utils/Common";
import CommunityRankComponent from "./CommunityRankComponent";
import axios from "axios";
import SearchComponent from "./SearchComponent";

const CommunityComponent = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const categoryId = Number(useParams().categoryId);
  const validCategoryId = isNaN(categoryId) ? undefined : categoryId;
  const [totalComments, setTotalComments] = useState([]);

  const pageSize = 10;

  const checkMediaContent = (html) => {
    const parser = new DOMParser();
    const parsedHtml = parser.parseFromString(html, "text/html");
    const imgTag = parsedHtml.querySelector("img");
    const videoTag = parsedHtml.querySelector("video");
    const iframeTag = parsedHtml.querySelector("iframe");

    return {
      image: imgTag !== null,
      video: videoTag !== null || iframeTag !== null, // iframe 태그 추가
    }; // 이미지 태그와 동영상 태그가 각각 있으면 true, 없으면 false를 반환
  };
  useEffect(() => {
    // 서버에서 데이터를 가져오는 함수
    const postPage = async () => {
      const responsePages =
        validCategoryId === undefined
          ? await CommunityAxiosApi.getCommunityTotalPages(pageSize)
          : await CommunityAxiosApi.getCommunityTotalPagesByCategory(
              validCategoryId,
              pageSize
            );
      setTotalPages(responsePages.data);
    };

    postPage();
  }, [validCategoryId, currentPage, pageSize]);
  useEffect(() => {
    // 제대로 랜더링 되는지 파악하는 axios 구문 별내용은 없음
    let cancelTokenSource = axios.CancelToken.source();
    const postList = async () => {
      try {
        const rsp =
          validCategoryId === undefined
            ? await CommunityAxiosApi.getCommunityList(currentPage, pageSize, {
                cancelToken: cancelTokenSource.token,
              })
            : await CommunityAxiosApi.getCommunityListByCategory(
                validCategoryId,
                currentPage,
                pageSize,
                { cancelToken: cancelTokenSource.token }
              );
        setPosts(rsp.data);
        console.log(rsp.data);
        // 전체 댓글 수 조회
        const totalCommentsResponses = await Promise.all(
          rsp.data.map((post) => CommunityAxiosApi.getTotalComments(post.id))
        );
        const totalComments = totalCommentsResponses.map(
          (response) => response.data
        );
        setTotalComments(totalComments);
      } catch (error) {
        if (!axios.isCancel(error)) {
          console.log(error);
        }
      }
    };
    postList();
    return () => {
      cancelTokenSource.cancel();
    };
  }, [validCategoryId, currentPage, pageSize, totalPages]);

  return (
    <>
      <PostContainer>
        <PostSection>
          <CommunityRankComponent
            categoryName={
              validCategoryId !== undefined ? posts[0]?.categoryName : "전체"
            }
          />
          <InputContainer>
            <PostBoarder
              placeholder="새 글을 작성하세요"
              type="text"
              onClick={() => {
                navigate(`/communitypage/write`);
              }}
            ></PostBoarder>
            <SendButton>
              <Write />
            </SendButton>
          </InputContainer>
          <PostListTitle>
            <TitleContent>전체</TitleContent>
          </PostListTitle>
          <PostList>
            <PostTable>
              <TableBody>
                <TableRow>
                  <TableRowDataIcon></TableRowDataIcon>
                  <TableRowDataWriter>작성자</TableRowDataWriter>
                  <TableRowDataTitle>제목</TableRowDataTitle>
                  <TableRowDataDate>작성시간</TableRowDataDate>
                  <TableRowDataViews>조회수</TableRowDataViews>
                </TableRow>
                {posts.map((post) => {
                  // memberId가 있는지 확인하고, 있다면 memberId를 사용하고 없다면 기존의 로직 수행
                  const segments = post.ipAddress
                    ? post.ipAddress.split(".")
                    : "";
                  const ipAddress = segments
                    ? `${segments[0]}.${segments[1]}`
                    : "";
                  const hasMediaContent = checkMediaContent(post.content);
                  const writerInfo = post.email
                    ? post.email
                    : `${Common.truncateText(post.nickName, 10)}(${ipAddress})`;

                  return (
                    <TableNormalRow
                      key={post.id}
                      onClick={() => {
                        navigate(`/communitypage/detail/${post.id}`);
                      }}
                    >
                      <TableRowDataIcon>
                        {hasMediaContent.video ? (
                          <Video />
                        ) : hasMediaContent.image ? (
                          <Image />
                        ) : (
                          <Text />
                        )}
                      </TableRowDataIcon>
                      <TableRowDataWriter>{writerInfo}</TableRowDataWriter>
                      <TableRowDataTitle>
                        {Common.truncateText(post.title, 20)}{" "}
                        {totalComments[posts.indexOf(post)] > 0 &&
                          `(${totalComments[posts.indexOf(post)]})`}
                      </TableRowDataTitle>
                      <TableRowDataDate>
                        {Common.timeFromNow(post.regDate)}
                      </TableRowDataDate>
                      <TableRowDataViews>{post.viewCount}</TableRowDataViews>
                    </TableNormalRow>
                  );
                })}
              </TableBody>
            </PostTable>
            <SearchComponent />
            <PostPage>
              <Pagination>
                <PageContant>
                  <Prev />
                </PageContant>
                <PageContant
                  onClick={() =>
                    setCurrentPage(currentPage > 1 ? currentPage - 1 : 0)
                  }
                  disabled={currentPage === 0}
                >
                  이전
                </PageContant>
              </Pagination>
              {/* for 문처럼 페이지를 생성하기 위해 Array 인스턴스 생성, _이건 아무의미없는값이고 서서히 늘어나는 현식 */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNum) => (
                  <MiddlePage
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum - 1)}
                    active={currentPage === pageNum ? "true" : "false"}
                  >
                    <Page selected={currentPage === pageNum - 1} href="#">
                      {pageNum}
                    </Page>
                  </MiddlePage>
                )
              )}
              <Pagination>
                <PageContant
                  onClick={() =>
                    setCurrentPage(
                      currentPage < totalPages - 1
                        ? currentPage + 1
                        : currentPage
                    )
                  }
                  disabled={currentPage === totalPages - 1}
                >
                  다음
                </PageContant>
                <PageContant>
                  <Next />
                </PageContant>
              </Pagination>
            </PostPage>
          </PostList>
        </PostSection>
      </PostContainer>
    </>
  );
};

export default CommunityComponent;
