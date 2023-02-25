import * as S from "./MatchingState.SelectBoard.style";
import HorizonBoard from "../atoms/HorizonBoard";
import SelectComponents from "./MatchingState.SelectBoard.Selects";
import useSelectBoard from "./MatchingState.SelectBoard.hooks";
import { questions } from "./MatchingState.SelectBoard.questions";

export default function SelectBoard() {
  const {
    questionIndex,
    handleSubmit,
    handleChoice,
    peerCounts,
    answerList,
    movePrev,
    disablePrev,
    moveNext,
    disableNext,
  } = useSelectBoard();

  return (
    <>
      <S.ImageContainer>
        <img src={questions[questionIndex].imageSrc} alt="charater" />
      </S.ImageContainer>
      <S.Title>{questions[questionIndex].title}</S.Title>
      <form onSubmit={handleSubmit}>
        <HorizonBoard
          itemComponents={SelectComponents({
            handleChoice,
            peerCounts,
            answerList,
          })}
        />
      </form>
      <S.QuestionCounter>
        <S.ButtonLeft onClick={movePrev} disabled={disablePrev} />
        {questionIndex + 1} / {questions.length}
        <S.ButtonRight onClick={moveNext} disabled={disableNext} />
      </S.QuestionCounter>
    </>
  );
}
