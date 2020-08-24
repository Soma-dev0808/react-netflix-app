import React, { useState, useEffect } from "react";
import { fetchData } from "../../service";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";
import "./Row.css";

// This is reusable component
function Row(props) {
  const { title, fetchUrl, isLargeRow } = props;
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState(null);
  const [currentTrailer, setCurrentTrailer] = useState(null);

  useEffect(() => {
    fetchData(fetchUrl)
      .then(res => setMovies(res.data.results))
      .catch(err => console.log(err));
  }, [fetchUrl]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1
    }
  };

  const handleClick = movie => {
    const movieTitle = movie.name ? movie.name : movie.title;
    currentTrailer === movieTitle
      ? setTrailerUrl(null)
      : movieTrailer(movieTitle || "")
          .then(url => {
            const urlParams = new URLSearchParams(new URL(url).search);
            setTrailerUrl(urlParams.get("v"));
          })
          .catch(err => {
            console.log(err);
          });
    // Set current trailer to check current playing trailer next time when click any of thumbnail
    setCurrentTrailer(movieTitle);
  };

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row_posters">
        {movies.map((movie, i) => {
          return (
            <img
              key={i}
              onClick={() => handleClick(movie)}
              className={`row_poster ${isLargeRow && "row_poster_lg"}`}
              src={`${process.env.REACT_APP_BASE_API_IMAGE_URL}${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.name}
            />
          );
        })}
      </div>
      {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
