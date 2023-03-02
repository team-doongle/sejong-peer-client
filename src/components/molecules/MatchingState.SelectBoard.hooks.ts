import { useEffect, useState } from "react";
import { useHorizonBoard } from "context/horizonBoardContext";
import { handleError } from "utils/handleError";
import {
  registerPool,
  useMatchPoolCounts,
  useMatchUser,
} from "./MatchingState.SelectBoard.api";
import { QuestionCardProps } from "../atoms/QuestionCards";
import { questions } from "./MatchingState.SelectBoard.questions";
import { isLoadingState } from "store/global";
import { useSetRecoilState } from "recoil";

export default function useSelectBoard() {
  const { itemIndex: questionIndex, movePrev, moveNext } = useHorizonBoard();
  const [answerList, setAnswerList] = useState<string[]>(
    questions.map(() => "")
  );
  const [disablePrev, setDisablePrev] = useState(false);
  const [disableNext, setDisableNext] = useState(false);
  const setIsLoading = useSetRecoilState(isLoadingState);
  const { user, userStateRefetch } = useMatchUser();
  const { peerCounts } = useMatchPoolCounts({
    gender: answerList[0],
    purpose: answerList[1],
    targetGender: answerList[2],
    gradeLimit: answerList[3],
    studentNumberLimit: answerList[4],
  });

  const checkReciveAnswer = () =>
    answerList[questionIndex] &&
    answerList[questionIndex].length > 0 &&
    questions.length >= questionIndex;

  const handleChoice: QuestionCardProps["handleChoice"] = (choice) => {
    const newAnswerList = answerList.slice();
    newAnswerList.splice(questionIndex, 1, choice);
    setAnswerList(newAnswerList);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setIsLoading(true);

      const [
        gender,
        purpose,
        targetGender,
        gradeLimit,
        studentNumberLimit,
        targetBoundary,
        phoneNumber,
      ] = answerList;

      if (!user) throw new Error("no user info");

      const res = await registerPool({
        gender,
        purpose,
        targetGender,
        gradeLimit,
        studentNumberLimit,
        targetBoundary,
        phoneNumber,
      });

      if (res.status === 200) {
        userStateRefetch();
        setIsLoading(false);
      } else throw new Error(`요청이 실패했습니다. error code: ${res.status}`);
    } catch (err) {
      handleError(err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (answerList[questionIndex] && answerList[questionIndex].length) {
      moveNext();
    }
    setDisableNext(!checkReciveAnswer());
  }, [answerList]);

  useEffect(() => {
    setDisablePrev(questionIndex <= 0);
    setDisableNext(questionIndex >= questions.length - 1);
    setDisableNext(!checkReciveAnswer());
  }, [questionIndex]);

  return {
    questionIndex,
    handleSubmit,
    handleChoice,
    peerCounts,
    answerList,
    movePrev,
    disablePrev,
    moveNext,
    disableNext,
  };
}
