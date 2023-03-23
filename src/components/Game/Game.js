import { round } from "lodash";
import React, { useEffect, useState } from "react";
import fetchFromSpotify, { request } from "../../services/api";
import { Wrapper, OptionsWrapper } from "./Game.styles";
import MusicPlayer from "../MusicPlayer/MusicPlayer";
import GuessOption from "../GuessOption/GuessOption";
import GameResults from "../GameResults/GameResults";

const Game = ({
  songs,
  numSongs,
  numArtists,
  isHardMode,
  setShowSettings,
  setSongs,
}) => {
  // currentRound -> integer round number
  const [currentRound, setCurrentRound] = useState(0);
  const [numIncorrect, setNumIncorrect] = useState(0);
  const [choice, setChoice] = useState(null);
  // listOfSongs -> random selection of "questions"
  const [listOfSongs, setListOfSongs] = useState(songs);
  // options -> random selection of "answers" with one correct
  const [options, setOptions] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);

  const getRandom = () => {
    // temp -> songs not chosen for the round
    let temp = songs;
    // tempListSongs -> songs chosen for round
    let tempListSongs = songs;
    let counter = 0;
    while (counter < numSongs) {
      let randomIndex = Math.floor(Math.random() * temp.length);
      // flag corresponding song on tempListSongs from temp (to avoid same index edge case)
      tempListSongs.filter((s) => s === temp[randomIndex])[0].isChosen = true;
      temp = tempListSongs.filter((el) => !el.isChosen);
      counter++;
    }
    setListOfSongs(tempListSongs);
  };

  const getRandomOptions = () => {
    listOfSongs.forEach((s) => (s.isUsed = false)); // manual reset
    let setOfOptions = [];
    let chosen = listOfSongs.filter(({ isChosen }) => isChosen);
    let wrongChoices = listOfSongs.filter(({ isChosen }) => !isChosen);
    let counter = 0;
    let randomInsertionIndex = Math.floor(Math.random() * numArtists);
    while (counter < numArtists) {
      if (counter === randomInsertionIndex) {
        setOfOptions.push(chosen[currentRound]);
      } else {
        let randomIndex = Math.floor(Math.random() * wrongChoices.length);
        if (wrongChoices[randomIndex].isUsed) {
          continue;
        }
        wrongChoices[randomIndex].isUsed = true;
        setOfOptions = [...setOfOptions, wrongChoices[randomIndex]];
      }
      counter++;
    }
    setOptions(setOfOptions);
  };

  useEffect(() => {
    // initialize
    getRandom();
    moveToNextRound();
    setGameStarted(true);
  }, []);

  // game loop
  useEffect(() => {
    if (choice) {
      let timer;
      result();
      if (!isGameOver()) {
        timer = setTimeout(() => moveToNextRound(), 2000);
      } else {
        timer = setTimeout(() => setGameStarted(false), 2000);
      }
      return () => clearTimeout(timer);
    }
  }, [choice]);

  const resetGame = () => {
    setSongs([]);
    setCurrentRound(0);
    setNumIncorrect(0);
    setChoice(null);
    setListOfSongs(null);
    setShowSettings(true);
  };

  const result = () => {
    if (!choice.isChosen) setNumIncorrect(numIncorrect + 1);
  };

  const isGameOver = () => {
    // check if on last round or made a wrong guess in hard mode
    return currentRound === numSongs || (isHardMode && numIncorrect > 0);
  };

  const moveToNextRound = () => {
    setCurrentRound((prev) => prev + 1);
    setChoice(null);
    getRandomOptions();
  };

  // flatten artists
  const getNames = (artists) =>
    //artists.reduce((acc, artist) => acc + ", " + artist.name, artists[0].name);
    artists.map((a) => a.name).join(", ");

  const renderOptions = options.map((o, index) => (
    <GuessOption
      key={index}
      // options are songs with original isChosen flags
      // artists can be an array of multiple, so getNames will flatten to a comma delimited string
      name={getNames(o.artists)}
      album={o.album}
      isCorrect={o.isChosen}
      setChoice={() => setChoice(o)}
      roundOver={!!choice}
      round={currentRound}
    />
  ));

  return (
    <Wrapper>
      {currentRound === 0 && <>Loading...</>}
      {gameStarted && (
        <>
          <h1>Round {currentRound}</h1>
          {currentRound > 0 && (
            <MusicPlayer
              url={
                listOfSongs.filter((s) => s.isChosen)[currentRound - 1]
                  .preview_url
              }
            />
          )}
          <OptionsWrapper>{options.length > 0 && renderOptions}</OptionsWrapper>
        </>
      )}
      {!gameStarted && currentRound > 0 && (
        <GameResults resetGame={resetGame} />
      )}
    </Wrapper>
  );
};

export default Game;
