import React, { useState, useEffect } from "react";
import { fetchData } from "../../service";

import "./Banner.css";

function Banner({ fetchUrl }) {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    fetchData(fetchUrl)
      .then(res =>
        setMovie(
          res.data.results[
            Math.floor(Math.random() * res.data.results.length - 1)
          ]
        )
      )
      .catch(err => console.log(err));
  }, []);

  function truncate(str, n) {
    return str && str.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    //   Background image
    <header
      className="banner"
      style={
        movie && {
          backgroundSize: "cover",
          backgroundImage: `url(
            ${process.env.REACT_APP_BASE_API_IMAGE_URL}${movie.backdrop_path}
        )`,
          backgroundPosition: "center center"
        }
      }
    >
      <div className="banner_contents">
        <h1 className="banner_title">
          {(movie && movie.title) ||
            (movie && movie.name) ||
            (movie && movie.original_name)}
        </h1>
        <div className="banner_buttons">
          <button className="banner_button">Play</button>
          <button className="banner_button">My List</button>
        </div>

        <h1 className="banner_description">
          {movie && truncate(movie.overview, 150)}
        </h1>
      </div>
      <div className="banne_fade_bottom" />
    </header>
  );
}

export default Banner;
