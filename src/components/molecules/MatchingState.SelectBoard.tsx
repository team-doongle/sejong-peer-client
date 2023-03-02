import * as S from "./MatchingState.SelectBoard.style";
import HorizonBoard from "../atoms/HorizonBoard";
import SelectComponents from "./MatchingState.SelectBoard.Selects";
import useSelectBoard from "./MatchingState.SelectBoard.hooks";
import { questions } from "./MatchingState.SelectBoard.questions";

export default function SelectBoard() {
  const {
    handleSubmit,
    handleChoice,
    peerCounts,
    answerList,
    movePrev,
    disablePrev,
    moveNext,
    disableNext,
    itemIndex,
  } = useSelectBoard();

  return (
    <>
      <S.ImageContainer>
        <img src={questions[itemIndex].imageSrc} alt="charater" />
      </S.ImageContainer>
      <S.Title>{questions[itemIndex].title}</S.Title>
      <form onSubmit={handleSubmit}>
        <HorizonBoard
          itemComponents={SelectComponents({
            handleChoice,
            peerCounts,
            answerList,
          })}
          itemIndex={itemIndex}
        />
      </form>
      <S.QuestionCounter>
        <S.ButtonLeft onClick={movePrev} disabled={disablePrev} />
        {itemIndex + 1} / {questions.length}
        <S.ButtonRight onClick={moveNext} disabled={disableNext} />
      </S.QuestionCounter>
    </>
  );
}
