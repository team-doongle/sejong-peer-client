import styled from "styled-components";
import QuestionCards from "./QuestionCards";
import useQuestionProvider from "../hooks/useQustionProvider";
import Button from "../../atoms/Button";
import { QuestionProps } from "../../../services/models/questionShecma";
import InputBox from "../../atoms/InputBox";
import { fetchPostPool } from "../../../services/apis/match";
import { makeAnswer } from "../../../services/static/questions";

type QuestionProviderProps = {
  questions: QuestionProps[];
  providerWidth?: number;
};

export default function QuestionContainer({
  questions,
  providerWidth = 400,
}: QuestionProviderProps) {
  const {
    questionIndex,
    disablePrev,
    disableNext,
    onClickPrev,
    onClickNext,
    handleChoice,
    answerList,
  } = useQuestionProvider(questions);

  const handleSubmit = (e: any) => {
    e.preventEvent();
    fetchPostPool(makeAnswer(answerList));
  };

  return (
    <>
      <StyledImageContainer>
        <img src={questions[questionIndex].imageSrc} alt="charater" />
      </StyledImageContainer>
      <StyledTitle>{questions[questionIndex].title}</StyledTitle>
      <form onSubmit={handleSubmit}>
        <StyledContainer providerWidth={providerWidth}>
          <StyledWrapper transitionX={questionIndex * providerWidth}>
            {questions.map(({ choices, type }, i) => (
              <StyledQuestionCardWrapper key={i}>
                {type === "select" ? (
                  <QuestionCards
                    choices={choices}
                    handleChoice={handleChoice}
                  />
                ) : type === "input" ? (
                  <InputBox
                    type="tel"
                    onChange={(e: any) => {
                      if (e.target.value.length === 11)
                        handleChoice(e.target.value);
                    }}
                  />
                ) : type === "submit" ? (
                  <>
                    <>
                      {answerList.map((e) => (
                        <div>{e}</div>
                      ))}
                    </>
                    <Button value="submit" />
                  </>
                ) : null}
              </StyledQuestionCardWrapper>
            ))}
          </StyledWrapper>
        </StyledContainer>
      </form>
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
}

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

const StyledImageContainer = styled.div`
  display: flex;
  justify-content: center;
  & > img {
    width: 108px;
    height: 108px;
  }
`;

const StyledTitle = styled.h2`
  width: 100%;
  text-align: center;
  box-sizing: border-box;
  padding: 1rem 0;
`;
