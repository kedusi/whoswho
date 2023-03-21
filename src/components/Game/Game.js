import { round } from "lodash";
import React, { useEffect, useState } from "react";
import fetchFromSpotify, { request } from "../../services/api";
import { Wrapper } from "./Game.styles";
import MusicPlayer from "../MusicPlayer/MusicPlayer";
import GuessOption from "../GuessOption/GuessOption";

const Game = ({ songs, numSongs, numArtists, isHardMode }) => {
  // currentRound -> integer round number
  const [currentRound, setCurrentRound] = useState(0);
  const [numIncorrect, setNumIncorrect] = useState(0);
  const [choice, setChoice] = useState(null);
  // listOfSongs -> random selection of "questions"
  const [listOfSongs, setListOfSongs] = useState(songs);
  // options -> random selection of "answers" with one correct
  const [options, setOptions] = useState([]);

  const getRandom = () => {
    // temp -> songs not chosen for the round
    let temp = songs;
    // tempListSongs -> songs chosen for round
    let tempListSongs = songs;
    let counter = 0;
    while (counter < numSongs) {
      let randomIndex = Math.floor(Math.random() * temp.length);
      tempListSongs[randomIndex].isChosen = true;
      temp = tempListSongs.filter((el) => !el.isChosen);
      counter++;
    }
    setListOfSongs(tempListSongs.filter((el) => el.isChosen));
  };

  const getRandomOptions = () => {
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
    getRandomOptions();
    moveToNextRound();
  }, []);

  // game loop
  useEffect(() => {
    if (choice) {
      result();
      if (!isGameOver) {
        const timer = setTimeout(moveToNextRound, 1000);
        return () => clearTimeout(timer);
      }
    }
  }, [choice]);

  // playSong function (?)
  // getRandomArtists, async(?)

  const resetGame = () => {
    setCurrentRound(null);
    setNumIncorrect(0);
    setChoice(null);
    setChosenSongs(null);
  };

  const result = () => {
    if (!choice.isCorrect) setNumIncorrect(numIncorrect++);
  };

  const isGameOver = () => {
    // check if on last round or made a wrong guess in hard mode
    return currentRound === numSongs || (isHardMode && numIncorrect > 0);
  };

  const moveToNextRound = () => {
    setCurrentRound(currentRound++);
    //getRandomOptions();
  };

  const renderOptions = options.map((o, index) => (
    <GuessOption
      key={index}
      name={o.name}
      isCorrect={o.isCorrect}
      setChoice={() => setChoice(o)}
      roundOver={!!choice}
    />
  ));

  return (
    <Wrapper>
      {currentRound > 0 && (
        <MusicPlayer
          url={listOfSongs.filter((s) => s.isChosen)[currentRound - 1]}
        />
      )}
      {options.length > 0 && renderOptions}
    </Wrapper>
  );
};

export default Game;
