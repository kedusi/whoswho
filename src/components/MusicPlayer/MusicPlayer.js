import React, { useState, useRef, useEffect } from "react";
import {
  Wrapper,
  AudioContainer,
  AudioTime,
  TrackWrapper,
  VolumeWrapper,
  IconWrapper,
  Icon,
} from "./MusicPlayer.styles";
import { Play, Pause, Volume2 } from "react-feather";

const MusicPlayer = ({ url }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(null);
  const trackRef = useRef(null);
  const volumeRef = useRef(null);

  //https://stackoverflow.com/questions/38095650/style-input-range-to-look-like-a-progress-bar
  const updateInputStyle = (el) => {
    el.style.setProperty("--value", el.value);
    el.style.setProperty("--min", el.min === "" ? "0" : el.min);
    el.style.setProperty("--max", el.max === "" ? "100" : el.max);
    el.style.setProperty("--value", el.value);
  };

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
    updateInputStyle(e.target);
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
    updateInputStyle(e.target);
  };

  const updateTime = () => {
    setCurrentTime(audioRef.current.currentTime);
    updateInputStyle(trackRef.current);
  };

  const reset = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    audioRef.current.volume = volume;
    updateInputStyle(volumeRef.current);
  };

  // update track time every second
  let interval;
  useEffect(() => {
    if (isPlaying) {
      interval = setInterval(updateTime, 1000);
    } else if (interval) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // reset every round
  useEffect(() => reset(), [url]);

  return (
    <Wrapper>
      <AudioContainer>
        <audio ref={audioRef} id="player" src={url} type="audio/mpeg" />
        <IconWrapper>
          {!isPlaying && (
            <Icon>
              <Play style={{ marginLeft: `10px` }} onClick={play} />
            </Icon>
          )}
          {isPlaying && (
            <Icon>
              <Pause onClick={pause} />
            </Icon>
          )}
        </IconWrapper>

        <TrackWrapper>
          <input
            ref={trackRef}
            type="range"
            id="track-time"
            name="track-time"
            min="0"
            max="30"
            step="0.1"
            value={currentTime}
            onChange={seek}
          />
          <AudioTime>
            <span>{formatTime(currentTime)}</span>
            <span>0:30</span>
          </AudioTime>
        </TrackWrapper>

        <VolumeWrapper>
          <Volume2 />
          <input
            ref={volumeRef}
            type="range"
            id="volume"
            name="volume"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={changeVolume}
          />
        </VolumeWrapper>
      </AudioContainer>
    </Wrapper>
  );
};

export default MusicPlayer;
