import React, { useEffect, useState } from "react";
import fetchFromSpotify, { request } from "../../services/api";
import { Wrapper } from "./Game.styles";

const Game = (/*{songs}*/) => {
  const [currentRound, setCurrentRound] = useState(null);
  const [numIncorrect, setNumIncorrect] = useState(0);
  const [choice, setChoice] = useState(null);

  useEffect(() => {
    // initialize
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
