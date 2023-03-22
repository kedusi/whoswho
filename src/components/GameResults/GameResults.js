import React, { useState } from "react";

const GameResults = ({ resetGame }) => {
  return (
    <>
      game is over
      <button onClick={resetGame}>Restart</button>
    </>
  );
};

export default GameResults;
