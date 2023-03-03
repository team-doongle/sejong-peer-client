import * as S from "./MatchingState.SelectBoard.style";
import HorizonBoard from "../atoms/HorizonBoard";
import SelectComponents from "./MatchingState.SelectBoard.Selects";
import useSelectBoard, {
  currentBoardState,
  disableState,
} from "./MatchingState.SelectBoard.hooks";
import { questions } from "./MatchingState.SelectBoard.questions";
import { useRecoilValue } from "recoil";

export default function SelectBoard() {
  const { index } = useRecoilValue(currentBoardState);
  const { disablePrev, disableNext } = useRecoilValue(disableState);
  const { movePrev, moveNext, handleChoice, handleSubmit } = useSelectBoard();

  return (
    <>
      <img
        src={questions[index].imageSrc}
        alt="charater"
        className="w-36 h-36"
      />
      <h2 className="w-full text-center text-xl p-4">
        {questions[index].title}
      </h2>
      <form onSubmit={handleSubmit}>
        <HorizonBoard
          itemComponents={SelectComponents({
            handleChoice,
          })}
          itemIndex={index}
        />
      </form>
      <div className="flex justify-center items-center p-4 text-xl">
        <S.ButtonLeft onClick={movePrev} disabled={disablePrev} />
        {index + 1} / {questions.length}
        <S.ButtonRight onClick={moveNext} disabled={disableNext} />
      </div>
    </>
  );
}
