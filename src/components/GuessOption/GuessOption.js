import React, { useState } from "react";
import { Wrapper } from "./GuessOption.styles";

const GuessOption = ({ name, isCorrect, setChoice, roundOver }) => {
  return <Wrapper onClick={setChoice}>{name}</Wrapper>;
};

export default GuessOption;
