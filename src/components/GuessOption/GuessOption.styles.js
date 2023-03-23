import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  width: 100%;
  max-width: 300px;
  padding: 1rem;
  padding-bottom: 1.15rem;
  background-color: #212121;
  border-radius: 10px;
  margin-bottom: 1rem;
  transition: background-color 0.25s ease;

  img {
    box-shadow: 0px 10px 16px rgb(0, 0, 0, 0.65);
  }

  h2 {
    color: white;
    font-size: 1.1rem;
    margin-top: 2rem;
  }

  &:hover {
    background-color: #333333;
  }
`;
