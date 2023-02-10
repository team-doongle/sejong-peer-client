import { useState, useEffect } from "react";
import useSliderButton from "./useSliderButton";

interface UseQuestionProviderProps {
  questions: {
    title: string;
    choices: string[];
  }[];
}

const useQuestionProvider = ({ questions }: UseQuestionProviderProps) => {
  const [answerList, setAnswerList] = useState<string[][]>([]);

  const {
    itemIndex: questionIndex,
    disablePrev,
    disableNext,
    movePrev,
    moveNext,
    setDisableNext,
    checkGoNext,
  } = useSliderButton({ endIndex: questions.length });

  const checkReciveAnswer = () =>
    answerList[questionIndex] &&
    answerList[questionIndex].length > 0 &&
    questions.length - 1 >= questionIndex;

  const handleChoice = (choice: string[]) => {
    const newAnswerList = answerList.slice();
    newAnswerList.splice(questionIndex, 1, choice);
    setAnswerList(newAnswerList);
  };

  const onClickPrev = () => movePrev();
  const onClickNext = () => moveNext();

  useEffect(() => {
    if (answerList[questionIndex] && answerList[questionIndex].length) {
      moveNext();
    }
    setDisableNext(!(checkReciveAnswer() && checkGoNext()));
  }, [answerList]);

  useEffect(() => {
    setDisableNext(!(checkReciveAnswer() && checkGoNext()));
  }, [questionIndex]);

  return {
    questionIndex,
    disablePrev,
    disableNext,
    onClickPrev,
    onClickNext,
    handleChoice,
  };
};

export default useQuestionProvider;
