import React, { useState, useEffect } from "react";
import { Wrapper } from "./GuessOption.styles";

const GuessOption = ({
  name,
  album,
  isCorrect,
  setChoice,
  roundOver,
  round,
}) => {
  const [isChosen, setIsChosen] = useState(false);
  const result =
    isCorrect && roundOver
      ? { backgroundColor: "rgb(30, 215, 96, 0.5)" }
      : !isCorrect && roundOver && isChosen
      ? { backgroundColor: "rgb(135, 22, 37, 0.6)" }
      : {};

  const handleClick = () => {
    setIsChosen(true);
    setChoice();
  };

  useEffect(() => setIsChosen(false), [round]);
  return (
    <Wrapper onClick={handleClick} style={result}>
      <img src={album.url} alt={name} />
      <h2>{album.name}</h2>
      {name}
    </Wrapper>
  );
};

export default GuessOption;
