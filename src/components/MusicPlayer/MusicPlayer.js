import React, { useState } from "react";
import { Wrapper } from "./MusicPlayer.styles";

const MusicPlayer = ({ url }) => {
  return (
    <Wrapper>
      <audio src={url} type="audio/mpeg" controls />
    </Wrapper>
  );
};

export default MusicPlayer;
