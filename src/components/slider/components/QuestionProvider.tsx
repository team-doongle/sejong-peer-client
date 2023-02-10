import styled from "styled-components";
import QuestionCard from "./QuestionCard";
import useQuestionProvider from "../hooks/useQustionProvider";
import Button from "../../atoms/Button";

interface QuestionProviderProps {
  questions: {
    title: string;
    choices: string[];
  }[];
  providerWidth?: number;
}

const QuestionProvider = ({
  questions,
  providerWidth = 400,
}: QuestionProviderProps) => {
  const {
    questionIndex,
    disablePrev,
    disableNext,
    onClickPrev,
    onClickNext,
    handleChoice,
  } = useQuestionProvider({ questions });

  const handleSubmit = () => {};

  return (
    <>
      <StyledTitle>
        {questionIndex < questions.length
          ? questions[questionIndex].title
          : "주문 확인"}
      </StyledTitle>
      <StyledContainer providerWidth={providerWidth}>
        <StyledWrapper transitionX={questionIndex * providerWidth}>
          {questions.map(({ choices }, i) => (
            <StyledQuestionCardWrapper key={i}>
              <QuestionCard choices={choices} handleChoice={handleChoice} />
            </StyledQuestionCardWrapper>
          ))}
          <StyledQuestionCardWrapper>
            <Button value="제출" onClick={handleSubmit} />
          </StyledQuestionCardWrapper>
        </StyledWrapper>
      </StyledContainer>
      <StyledQuestionCounter>
        <button onClick={onClickPrev} disabled={disablePrev}>
          {"<"}
        </button>
        {questionIndex + 1} / {questions.length + 1}
        <button onClick={onClickNext} disabled={disableNext}>
          {">"}
        </button>
      </StyledQuestionCounter>
    </>
  );
};

const StyledContainer = styled.div<{ providerWidth: number }>`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  width: ${({ providerWidth }: { providerWidth: number }) => providerWidth}px;
  margin: 0 auto;
  overflow: hidden;
`;

const StyledWrapper = styled.div<{ transitionX: number }>`
  display: flex;
  align-items: center;
  width: 400px;
  transform: translate(
    ${({ transitionX }: { transitionX: number }) => -transitionX}px
  );
  transition: transform 0.5s;
  transition-delay: 0.1s;
`;

const StyledQuestionCardWrapper = styled.div`
  flex-shrink: 0;
  width: 100%;
`;

const StyledQuestionCounter = styled.div`
  text-align: center;
`;

const StyledTitle = styled.h2`
  width: 100%;
  text-align: center;
  box-sizing: border-box;
  padding: 1rem 0;
`;

export default QuestionProvider;
