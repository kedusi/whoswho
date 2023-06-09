import React, { useEffect, useState } from "react";
import fetchFromSpotify, { request } from "../services/api";
import Settings from "./Settings/Settings.js";
import Game from "./Game/Game";
import { Wrapper } from "./Home.styles";

const AUTH_ENDPOINT =
  "https://nuod0t2zoe.execute-api.us-east-2.amazonaws.com/FT-Classroom/spotify-auth-token";
const TOKEN_KEY = "whos-who-access-token";
const SAVED_SETTINGS_KEY = "saved-settings";
const SETTINGS_SAVE_DAYS = 365;
const REN_GENRES = [];
const KENNON_GENRES = ["classical", "jazz", "guitar", "show-tunes", "kids"];

const Home = () => {
  const [start, setStart] = useState(false);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [numSongs, setNumSongs] = useState(1);
  const [numArtists, setNumArtists] = useState(2);
  const [showSettings, setShowSettings] = useState(true);
  const [isHardMode, setIsHardMode] = useState(false); // possible throwaway answer from another genre?
  const [songs, setSongs] = useState([]);

  const [authLoading, setAuthLoading] = useState(false);
  const [configLoading, setConfigLoading] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    if (start) {
      fetchSongsFromGenre();
      setStart(false);
    }
  }, [start]);

  const fetchSongsFromGenre = async () => {
    const uri = `search?q=genre:${selectedGenre}&type=track&limit=30`;
    const response = await fetchFromSpotify({
      token,
      endpoint: uri,
    });
    console.log(`Fetch uri: ${uri}`);
    const songs = response.tracks.items;
    let cleanedSongs = songs.map(({ artists, preview_url, name, album }) => ({
      artists,
      preview_url,
      name,
      album: { name: album.name, url: album.images[1].url },
    }));
    console.log("Cleaned songs (1): ");
    console.log(cleanedSongs);
    let foundArtists = [];
    cleanedSongs = cleanedSongs.filter(({ artists }) => {
      let flagUsed = false;
      for (let artist of artists) {
        if (foundArtists.includes(artist.name)) {
          flagUsed = true;
          continue;
        }
      }
      if (!flagUsed) {
        for (let artist of artists) {
          foundArtists.push(artist.name);
        }
        return true;
      } else {
        flagUsed = false;
        return false;
      }
    });
    setSongs(cleanedSongs, console.log(cleanedSongs));
  };

  const loadGenres = async (t) => {
    // setConfigLoading(true);
    // const response = await fetchFromSpotify({
    //   token: t,
    //   endpoint: "recommendations/available-genre-seeds",
    // });
    // console.log(`Fetched genres: ${response.genres}`);
    // setGenres(response.genres);
    setGenres(KENNON_GENRES.concat(REN_GENRES).sort());
    setConfigLoading(false);
  };

  const loadSettings = () => {
    const savedSettingsString = localStorage.getItem(SAVED_SETTINGS_KEY);
    if (savedSettingsString) {
      const savedSettings = JSON.parse(savedSettingsString);
      if (savedSettings.expiration > Date.now()) {
        console.log("Found saved settings in localStorage");
        setNumArtists(savedSettings.numArtists);
        setNumSongs(savedSettings.numSongs);
        return;
      }
    }
  };

  useEffect(() => {
    setAuthLoading(true);

    const storedTokenString = localStorage.getItem(TOKEN_KEY);
    if (storedTokenString) {
      const storedToken = JSON.parse(storedTokenString);
      if (storedToken.expiration > Date.now()) {
        console.log("Token found in localstorage");
        setAuthLoading(false);
        setToken(storedToken.value);
        loadGenres(storedToken.value);
        loadSettings();
        return;
      }
    }
    console.log("Sending request to AWS endpoint");
    request(AUTH_ENDPOINT).then(({ access_token, expires_in }) => {
      const newToken = {
        value: access_token,
        expiration: Date.now() + (expires_in - 20) * 1000,
      };
      localStorage.setItem(TOKEN_KEY, JSON.stringify(newToken));
      setAuthLoading(false);
      setToken(newToken.value);
      loadGenres(newToken.value);
    });
  }, []);

  if (authLoading || configLoading) {
    return <div>Loading...</div>;
  }

  const startGame = () => {
    setShowSettings(false);
    const newSavedSettings = {
      numArtists,
      numSongs,
      selectedGenre,
      expiration: Date.now() + 1000 * 60 * 60 * 24 * SETTINGS_SAVE_DAYS,
    };
    localStorage.setItem(SAVED_SETTINGS_KEY, JSON.stringify(newSavedSettings));
    setStart(true);
  };

  return (
    <Wrapper>
      {showSettings && (
        <Settings
          genres={genres}
          selectedGenre={selectedGenre}
          numSongs={numSongs}
          numArtists={numArtists}
          setSelectedGenre={setSelectedGenre}
          setNumSongs={setNumSongs}
          setNumArtists={setNumArtists}
          startGame={startGame}
        />
      )}
      {songs.length > 0 && (
        <Game
          songs={songs}
          numSongs={numSongs}
          numArtists={numArtists}
          isHardMode={isHardMode}
          setShowSettings={setShowSettings}
          setSongs={setSongs}
          genre={selectedGenre}
        />
      )}
    </Wrapper>
  );
};

export default Home;
