import styled from "styled-components";

export const Wrapper = styled.div``;

export const IconWrapper = styled.div`
  svg {
    width: 100px;
    height: 100px;
  }
`;

export const AudioContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 500px;
  #track-time {
    width: 100%;
  }
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
  width: min-content;
`;
