import React, { useState } from "react";
import { Wrapper, Button } from "./Settings.styles";

const Settings = ({
  genres,
  selectedGenre,
  setSelectedGenre,
  numSongs,
  setNumSongs,
  numArtists,
  setNumArtists,
  startGame,
}) => {
  const [currentGenre, setCurrentGenre] = useState("Random");

  const incrementArtists = () => {
    setNumArtists((prev) => (prev < 4 ? prev + 1 : prev));
  };
  const decrementArtists = () => {
    setNumArtists((prev) => (prev > 2 ? prev - 1 : prev));
  };
  const incrementSongs = () => {
    setNumSongs((prev) => (prev < 3 ? prev + 1 : prev));
  };
  const decrementSongs = () => {
    setNumSongs((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const collectGenre = () =>
    currentGenre === "Random"
      ? genres[Math.floor(Math.random() * genres.length)]
      : currentGenre;

  return (
    <Wrapper>
      <div>
        Genre:
        <select
          value={currentGenre}
          onChange={(event) => {
            setCurrentGenre(event.target.value);
          }}
        >
          <option value="Random">Random</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
        <div>
          <p>Number of Rounds:</p>
          <Button onClick={incrementSongs}>+</Button>
          <h1>{numSongs}</h1>
          <Button onClick={decrementSongs}>-</Button>
        </div>
        <div>
          <p>Number of Options:</p>
          <Button onClick={incrementArtists}>+</Button>
          <h1>{numArtists}</h1>
          <Button onClick={decrementArtists}>-</Button>
        </div>
      </div>

      <Button
        onClick={() => {
          setSelectedGenre(collectGenre);
          startGame();
        }}
      >
        Start
      </Button>
    </Wrapper>
  );
};

export default Settings;
