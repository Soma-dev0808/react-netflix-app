import React from "react";
import Row from "./components/Row";
import request from "./utils/requests";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>React Netflix app</h1>
      <Row title="NETFLIX ORIGINALS" fetchUrl={request.fetchNetflixOriginals} />
      <Row title="Trending Now" fetchUrl={request.fetchTrending} />
    </div>
  );
}

export default App;
