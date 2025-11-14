import React from "react";
import { useNowPlayingMoviesQuery } from "../../../../hooks/useNowplayingMovies";
import { Alert, Spinner } from "react-bootstrap";
import MovieSlider from "../../../../common/MovieSlider/MovieSlider";
import { responsive } from "../../../../constants/responsive";

const NowplayingMovieSlide = () => {
  const { data, isLoading, isError, error } = useNowPlayingMoviesQuery();
  if (isLoading) {
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
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }
  return (
    <div>
      <MovieSlider
        title="NowPlaying"
        movies={data.results}
        responsive={responsive}
      />
    </div>
  );
};

export default NowplayingMovieSlide;
