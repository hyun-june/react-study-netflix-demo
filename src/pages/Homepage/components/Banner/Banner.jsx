import Alert from "react-bootstrap/Alert";
import "./Banner.style.css";
import { useNowPlayingMoviesQuery } from "../../../../hooks/useNowplayingMovies";
import { Spinner } from "react-bootstrap";

const Banner = () => {
  const { data, isLoading, isError, error } = useNowPlayingMoviesQuery();
  // console.log("banner", data);
  if (isLoading) {
    return (
      <div>
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
  const randomNum = Math.floor(Math.random() * 20);

  return (
    <div
      className="banner"
      style={{
        backgroundImage: `url(
          https://media.themoviedb.org/t/p/w533_and_h300_bestv2${data?.results[randomNum].poster_path}
          )`,
      }}
    >
      <div className="text-white banner-text-area">
        <h1>{data?.results[randomNum].title}</h1>
        <p>{data?.results[randomNum].overview}</p>
      </div>
    </div>
  );
};

export default Banner;
