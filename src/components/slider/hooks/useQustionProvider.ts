import { useState, useEffect } from "react";
import { QuestionProps } from "../../../services/models/questionShecma";
import { QuestionCardProps } from "../components/QuestionCards";
import useSliderButton from "./useSliderButton";

const useQuestionProvider = (questions: QuestionProps[]) => {
  const [answerList, setAnswerList] = useState<string[]>([]);

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

  const handleChoice: QuestionCardProps["handleChoice"] = (choice) => {
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
    answerList,
  };
};

export default useQuestionProvider;
