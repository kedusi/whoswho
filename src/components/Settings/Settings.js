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
      </div>
    </Wrapper>
  );
};

export default Settings;
