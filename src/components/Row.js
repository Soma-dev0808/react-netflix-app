import React, { useState, useEffect } from "react";
import { fetchData } from "../service";

import "./Row.css";

// This is reusable component
function Row(props) {
  const { title, fetchUrl } = props;
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchData(fetchUrl)
      .then(res => setMovies(res.data.results))
      .catch(err => console.log(err));
  }, [fetchUrl]);

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row_posters">
        {movies.map((movie, i) => (
          <img
            key={i}
            className={"row_poster"}
            src={`${process.env.REACT_APP_BASE_API_IMAGE_URL}${movie.poster_path}`}
            alt={movie.name}
          />
        ))}
      </div>
    </div>
  );
}

export default Row;
