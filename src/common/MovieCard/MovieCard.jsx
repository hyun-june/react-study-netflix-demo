import { Badge } from "react-bootstrap";
import "./MovieCard.style.css";
import { useMoviesIdList } from "../../hooks/useMoviesIdList";
import { Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const { data: idList, isLoading, isError, error } = useMoviesIdList();

  const showGenre = (genreIdList) => {
    if (!idList) return [];
    const genreNameList = genreIdList.map((id) => {
      const genreObj = idList.find((genre) => genre.id === id);
      return genreObj.name;
    });

    return genreNameList;
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  const moveToDetail = () => {
    navigate(`/movies/${movie.id}`);
  };

  // const findId = (id) => {
  //   const genre = idList.find((genre) => genre.id === id);
  //   return genre ? genre.name : 'Unknown';
  // };

  return (
    <div
      className="movie-card"
      onClick={moveToDetail}
      style={{
        backgroundImage: `url(
          https://media.themoviedb.org/t/p/w300_and_h450_bestv2/${movie.poster_path}
          )`,
      }}
    >
      <div className="overlay">
        <h1 className="card-title">{movie.title}</h1>
        <p className="card-p">{movie.overview}</p>
        <div className="genre-badge">
          {showGenre(movie.genre_ids).map((index) => (
            <Badge bg="danger" key={index}>
              {index}
            </Badge>
          ))}
        </div>
        <div className="sub-section">
          <div>
            <FontAwesomeIcon icon={faStar} style={{ color: "yellow" }} />
            {movie.vote_average}
          </div>

          <div className={`age-badge ${movie.adult ? "adult" : "children"}`}>
            {movie.adult ? "18" : "ALL"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
