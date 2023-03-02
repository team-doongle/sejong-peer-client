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
      <img
        src={questions[itemIndex].imageSrc}
        alt="charater"
        className="w-36 h-36"
      />
      <h2 className="w-full text-center text-xl p-4">
        {questions[itemIndex].title}
      </h2>
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
      <div className="flex justify-center items-center p-4 text-xl">
        <S.ButtonLeft onClick={movePrev} disabled={disablePrev} />
        {itemIndex + 1} / {questions.length}
        <S.ButtonRight onClick={moveNext} disabled={disableNext} />
      </div>
    </>
  );
}
