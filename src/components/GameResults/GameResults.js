import React, { useState } from "react";
import Confetti from "react-confetti";

const GameResults = ({ resetGame, genre, score, maxScore }) => {
  const formattedGenre = genre
    .split("-")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join("-");
  const title = `${formattedGenre} ${
    score === maxScore ? "Aficionado" : "Amateur"
  }`;

  return (
    <>
      <h1>{title}</h1>
      <span>
        Your score was {score} out of {maxScore}!
      </span>
      <button onClick={resetGame}>Restart</button>
      <Confetti recycle={false} />
    </>
  );
};

export default GameResults;
