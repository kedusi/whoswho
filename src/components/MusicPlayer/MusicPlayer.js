import React, { useState, useRef, useEffect } from "react";
import { Wrapper } from "./MusicPlayer.styles";
import { Play, Pause, Volume2 } from "react-feather";

const MusicPlayer = ({ url }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(null);

  const play = () => {
    audioRef.current.play();
    setIsPlaying(true);
  };

  const pause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const changeVolume = (e) => {
    audioRef.current.volume = e.target.value;
    setVolume(e.target.value);
  };

  const formatTime = (time) => {
    var mins = Math.floor(time / 60);
    if (mins < 10) {
      mins = String(mins);
    }
    var secs = Math.ceil(time % 60);
    if (secs < 10) {
      secs = "0" + String(secs);
    }
    return mins + ":" + secs;
  };

  const seek = (e) => {
    audioRef.current.currentTime = e.target.value;
    setCurrentTime(e.target.value);
  };

  const updateTime = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  let interval;
  useEffect(() => {
    if (isPlaying) {
      interval = setInterval(updateTime, 1000);
    } else if (interval) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <Wrapper>
      <audio ref={audioRef} id="player" src={url} type="audio/mpeg" />
      {!isPlaying && <Play onClick={play} />}
      {isPlaying && <Pause onClick={pause} />}
      <input
        type="range"
        id="track-time"
        name="track-time"
        min="0"
        max="30"
        step="0.1"
        value={currentTime}
        onChange={seek}
      />
      <span>{formatTime(currentTime)}</span>
      <span>0:30</span>
      <Volume2 />
      <input
        type="range"
        id="volume"
        name="volume"
        min="0"
        max="1"
        step="0.1"
        value={volume}
        onChange={changeVolume}
      />
    </Wrapper>
  );
};

export default MusicPlayer;
