import { round } from "lodash";
import React, { useEffect, useState } from "react";
import fetchFromSpotify, { request } from "../../services/api";
import { Wrapper } from "./Game.styles";

const Game = ({ songs, numSongs, numArtists }) => {
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
    console.log(setOfOptions);
  };

  useEffect(() => {
    // initialize
    getRandom();
    getRandomOptions();
    // console.log(options);
    setCurrentRound(0);
  }, []);

  // call useEffect every time choice is updated (and isn't null)
  useEffect(() => {
    if (choice) {
      // after selecting a choice, call result() and moveToNextRound()
      // recommended to use setTimeout before moveToNextRound for UX purposes
      // clearTimeout once done
    }
  }, [choice]);

  // resetGame function
  // playSong function
  // getRandomArtists, async(?)
  // result function (tally up incorrect guesses)
  // moveToNextRound function (set and play song, update choices, setChoice to null)
  // gameOver function (win or lose)

  return <Wrapper></Wrapper>;
};

export default Game;
