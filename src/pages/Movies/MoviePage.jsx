import React, { useState, useEffect } from "react";
import "./MoviePage.style.css";
import { useSearchMovieQuery } from "../../hooks/useSearchMovie";
import { useSearchParams } from "react-router-dom";
import { Alert, Col, Container, Row, Spinner } from "react-bootstrap";
import MovieCard from "../../common/MovieCard/MovieCard";
import ReactPaginate from "react-paginate";
import Dropdown from "react-bootstrap/Dropdown";
import { useMoviesIdList } from "../../hooks/useMoviesIdList";

// 경로 2가지
// nav바에서 클릭해서 온경우 => nowplayingMovie 보여주기
// keyword를 입력해서 온경우 => keyword와 관련된 영화들을 보여줌

// 페이지네이션 설치
// page state 만들기
// 페이지네이션 클릭할때마다 page 바꿔주기
// page 값이 바뀔때 마다 useSearchMovie에 page까지 넣어서 fetch
const MoviePage = () => {
  const [query] = useSearchParams();
  const keyword = query.get("q");
  const [page, setPage] = useState(1);
  const [selectFilter, setSelectFilter] = useState("default");
  const [selectedValue, setSelectedValue] = useState(null);

  const { data, isLoading, isError, error } = useSearchMovieQuery({
    keyword,
    page,
  });

  // console.log("🚀 ~ MoviePage ~ data:", data);
  const {
    data: idData,
    isLoading: idisLoading,
    isError: idisError,
  } = useMoviesIdList();
  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
  };

  useEffect(() => {
    setPage(1);
  }, [keyword, selectedValue]);

  const dataSort = () => {
    if (!data || !data.results) return [];
    let filterData = [...data.results];

    if (selectFilter === "popularity") {
      return filterData.sort((a, b) => b.popularity - a.popularity);
    }
    if (selectFilter === "average") {
      return filterData.sort((a, b) => b.vote_average - a.vote_average);
    }

    if (selectedValue) {
      filterData = filterData.filter((movie) =>
        movie.genre_ids.includes(selectedValue)
      );
    }

    return filterData;
  };

  if (isLoading && idisLoading) {
    return (
      <div className="spinner_wrapper">
        <Spinner
          animation="border"
          variant="danger"
          style={{ width: "5rem", height: "5rem" }}
        />
      </div>
    );
  }
  if (isError && idisError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  const selectGenre = (id) => {
    setSelectedValue(id);
  };

  return (
    <Container>
      <Row>
        <Col lg={3} xs={12}>
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              {selectFilter === "default"
                ? "기본"
                : selectFilter === "popularity"
                ? "인기순"
                : "평점순"}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {selectFilter !== "default" && (
                <Dropdown.Item onClick={() => setSelectFilter("default")}>
                  기본
                </Dropdown.Item>
              )}
              {selectFilter !== "popularity" && (
                <Dropdown.Item onClick={() => setSelectFilter("popularity")}>
                  인기순
                </Dropdown.Item>
              )}
              {selectFilter !== "average" && (
                <Dropdown.Item onClick={() => setSelectFilter("average")}>
                  평점순
                </Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
          <div className="badge-area">
            {idData?.map((item, index) => (
              <div
                className="genre-badge-btn"
                onClick={() => selectGenre(item.id)}
                key={index}
              >
                {item.name}
              </div>
            ))}
          </div>
        </Col>
        <Col lg={9} xs={12}>
          <Row>
            {/* {dataSort()?.map((movie, index) => (
              <Col className="movie-section" lg={3} xs={12} key={index}>
                <MovieCard movie={movie} key={index} />
              </Col>
            ))} */}
            {dataSort()?.length === 0 ? (
              <div className="no-result-message text-center mt-5">
                <Alert variant="warning">
                  검색 결과가 없습니다.
                  {keyword && (
                    <div>“{keyword}”에 대한 결과를 찾을 수 없습니다.</div>
                  )}
                </Alert>
              </div>
            ) : (
              dataSort()?.map((movie) => (
                <Col className="movie-section" lg={3} xs={12} key={movie.id}>
                  <MovieCard movie={movie} />
                </Col>
              ))
            )}
          </Row>
        </Col>
        <div className="pagination-area">
          {data?.total_pages > 1 && (
            <ReactPaginate
              nextLabel=">"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              pageCount={data?.total_pages}
              forcePage={page - 1}
              previousLabel="<"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakLabel="..."
              breakClassName="page-item"
              breakLinkClassName="page-link"
              containerClassName="pagination"
              activeClassName="active"
              renderOnZeroPageCount={null}
              disabledClassName="disabled"
            />
          )}
        </div>
      </Row>
    </Container>
  );
};

export default MoviePage;
