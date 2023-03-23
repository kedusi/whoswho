import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 3rem;
`;

export const Icon = styled.div`
  background-color: white;
  border-radius: 50%;
  cursor: pointer;
  width: 160px;
  height: 160px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.25s ease;
  &:hover {
    background-color: #d9d9d9;
  }
  svg {
    width: 100px;
    height: 100px;
    color: black;
    fill: black;
  }
`;

export const AudioContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 500px;
  width: 100%;
  padding: 0 1rem;

  #track-time {
    width: 100%;
  }

  input[type="range"] {
    background: #5e5e5e;
    border-radius: 0.5em;
    height: 5px;
    cursor: pointer;

    -webkit-appearance: none;
    -moz-appearance: none;
    --range: calc(var(--max) - var(--min));
    --ratio: calc((var(--value) - var(--min)) / var(--range));
    --sx: calc(0.5 * 10px + var(--ratio) * (100% - 10px));
  }

  input[type="range"]:focus {
    outline: none;
  }

  input[type="range"]::-webkit-slider-thumb,
  input[type="range"]::-moz-range-thumb {
    width: 14px;
    height: 14px;
    border-radius: 1em;
    background: white;
    border: none;
    box-shadow: 0 0 2px black;
    margin-top: calc(3px * 0.5 - 10px * 0.5);
    -webkit-appearance: none;
    -moz-appearance: none;
  }

  input[type="range"]::-webkit-slider-runnable-track,
  input[type="range"]::-moz-range-track {
    height: 5px;
    border: none;
    border-radius: 0.5em;
    box-shadow: none;
    background: linear-gradient(white, white) 0 / var(--sx) 100% no-repeat,
      #5e5e5e;
  }

  input[type="range"]::-webkit-slider-thumb:hover,
  input[type="range"]::-moz-range-thumb:hover {
    background: #d9d9d9;
  }

  input[type="range"]:hover::-webkit-slider-runnable-track,
  input[type="range"]:hover::-moz-range-track {
    //background: #5e5e5e;
    background: linear-gradient(#1ed760, #1ed760) 0 / var(--sx) 100% no-repeat,
      #5e5e5e;
  }

  input[type="range"]::-webkit-slider-thumb:active,
  input[type="range"]::-moz-range-thumb:active {
    background: white;
  }

  input[type="range"]:active::-webkit-slider-runnable-track,
  input[type="range"]:active::-moz-range-track {
    background: linear-gradient(#17b052, #17b052) 0 / var(--sx) 100% no-repeat,
      #5e5e5e;
  }
`;

export const TrackWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 6px;
`;

export const AudioTime = styled.span`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

export const VolumeWrapper = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: min-content;
  gap: 6px;
`;
