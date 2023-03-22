import React, { useState } from "react";
import { Wrapper } from "./GuessOption.styles";

const GuessOption = ({ name, isCorrect, setChoice, roundOver }) => {
  const borderColor =
    isCorrect && roundOver ? "green" : roundOver ? "red" : "black";
  return (
    <Wrapper onClick={setChoice} style={{ borderColor: borderColor }}>
      {name}
    </Wrapper>
  );
};

export default GuessOption;
