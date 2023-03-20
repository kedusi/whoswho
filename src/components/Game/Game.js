import React, { useEffect, useState } from "react";
import fetchFromSpotify, { request } from "../../services/api";
import { Wrapper } from "./Game.styles";

const Game = ({songs, numSongs}) => {
  const [currentRound, setCurrentRound] = useState(null);
  const [numIncorrect, setNumIncorrect] = useState(0);
  const [choice, setChoice] = useState(null);
  const [chosenSongs, setChosenSongs] = useState(songs)

  const getRandom = () => {
    let temp = songs
    let tempChosenSongs = songs
    let counter = 0
    while(counter < numSongs) {
      let randomIndex = Math.floor(Math.random() * temp.length)
      tempChosenSongs[randomIndex].isChosen = true
      temp = tempChosenSongs.filter(el => !el.isChosen)
      counter++
    }
    setChosenSongs(tempChosenSongs)
  }

  useEffect(() => {
    // initialize
    getRandom()
    console.log(chosenSongs.filter(el => el.isChosen))
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
