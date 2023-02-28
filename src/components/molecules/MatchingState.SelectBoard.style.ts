import styled from "styled-components";

export const QuestionCounter = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  & > img {
    width: 108px;
    height: 108px;
  }
`;

export const Title = styled.h2`
  width: 100%;
  text-align: center;
  box-sizing: border-box;
  padding: 1rem 0;
  white-space: pre-line;
`;

export const Button = styled.button`
  width: 50px;
  height: 20px;
  border: 0;
  background-color: white;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
  &:disabled {
    cursor: default;
  }
`;

export const ButtonLeft = styled(Button)`
  background-image: url("/assets/image/left-active.png");
  &:disabled {
    background-image: url("/assets/image/left-disable.png");
  }
`;

export const ButtonRight = styled(Button)`
  background-image: url("/assets/image/right-active.png");
  &:disabled {
    background-image: url("/assets/image/right-disable.png");
  }
`;
