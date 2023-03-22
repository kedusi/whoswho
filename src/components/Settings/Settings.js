import React, { useState } from "react";
import { Wrapper } from "./Settings.styles";

const Settings = ({
  genres,
  selectedGenre,
  setSelectedGenre,
  numSongs,
  setNumSongs,
  numArtists,
  setNumArtists,
}) => {
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

  return (
    <Wrapper>
      <div>
        Genre:
        <select
          value={selectedGenre}
          onChange={(event) => setSelectedGenre(event.target.value)}
        >
          <option value="" />
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
        <div>
          <p>Number of Rounds:</p>
          <button onClick={decrementSongs}>-</button>
          <h1>{numSongs}</h1>
          <button onClick={incrementSongs}>+</button>
        </div>
        <div>
          <p>Number of Options:</p>
          <button onClick={decrementArtists}>-</button>
          <h1>{numArtists}</h1>
          <button onClick={incrementArtists}>+</button>
        </div>
      </div>
    </Wrapper>
  );
};

export default Settings;
