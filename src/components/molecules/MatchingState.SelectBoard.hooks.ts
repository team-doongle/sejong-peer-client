import { useEffect } from "react";
import { handleError } from "utils/handleError";
import {
  ClientMatchProps,
  registerPool,
} from "./MatchingState.SelectBoard.api";
import { QuestionCardsProps } from "../atoms/QuestionCards";
import { questions } from "./MatchingState.SelectBoard.questions";
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
import { isLoadingState } from "components/atoms/Loading";

import { atom } from "recoil";
import { useNavigate } from "react-router-dom";

export const currentBoardState = atom<{
  index: number;
  title: keyof ClientMatchProps;
}>({
  key: "currentBoardState",
  default: {
    index: 0,
    title: "gender",
  },
});

export const disableState = atom<{
  disablePrev: boolean;
  disableNext: boolean;
}>({
  key: "disableState",
  default: { disablePrev: true, disableNext: true },
});

export const answersState = atom<ClientMatchProps>({
  key: "answersState",
  default: {
    gender: null,
    purpose: null,
    targetGender: null,
    gradeLimit: null,
    studentNumberLimit: null,
    targetBoundary: null,
    phoneNumber: null,
    kakaoId: null,
    result: null,
  },
});

export default function useSelectBoard() {
  const [currentBoard, setCurrentBoard] = useRecoilState(currentBoardState);
  const [answers, setAnswers] = useRecoilState(answersState);
  const [disable, setDisable] = useRecoilState(disableState);
  const resetCurrentBoard = useResetRecoilState(currentBoardState);
  const resetAnswers = useResetRecoilState(answersState);
  const resetDisable = useResetRecoilState(disableState);

  const navigater = useNavigate();

  const setIsLoading = useSetRecoilState(isLoadingState);

  const movePrev = () => {
    setCurrentBoard({
      ...currentBoard,
      index: currentBoard.index - 1,
      title: questions[currentBoard.index - 1].key,
    });
  };
  const moveNext = () => {
    setCurrentBoard({
      ...currentBoard,
      index: currentBoard.index + 1,
      title: questions[currentBoard.index + 1].key,
    });
  };
  const handleChoice: QuestionCardsProps["handleChoice"] = (choice, title) => {
    setAnswers({ ...answers, [title]: choice });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setIsLoading(true);

      const res = await registerPool(answers);

      if (res.status === 200) {
        setIsLoading(false);
        navigater("/");
        resetCurrentBoard();
        resetAnswers();
        resetDisable();
      } else throw new Error(`요청이 실패했습니다. error code: ${res.status}`);
    } catch (err) {
      handleError(err);
      setIsLoading(false);
    }
  };

  const checkReciveAnswer = () => !!answers[currentBoard.title];

  useEffect(() => {
    if (answers[currentBoard.title]) {
      moveNext();
    }
    setDisable({ ...disable, disableNext: !checkReciveAnswer() });
  }, [answers]);

  useEffect(() => {
    setDisable({
      ...disable,
      disablePrev: currentBoard.index <= 0,
      disableNext:
        currentBoard.index >= questions.length - 1 || !checkReciveAnswer(),
    });
  }, [currentBoard.index]);

  return { movePrev, moveNext, handleChoice, handleSubmit };
}
