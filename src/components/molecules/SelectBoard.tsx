import styled from "styled-components";
import { fetchGetPool, fetchPostPool } from "../../services/apis/match";
import {
  convertAnswer,
  convertGender,
  convertPurpose,
  convertTargetGender,
  questions,
} from "../../services/static/questions";
import HorizonBoard from "../atoms/HorizonBoard";
import { useEffect, useState } from "react";
import QuestionCards, { QuestionCardProps } from "../atoms/QuestionCards";
import { useHorizonBoard } from "../../context/horizonBoardContext";
import InputBox from "../atoms/InputBox";
import Button from "../atoms/Button";
import { useQuery } from "react-query";

import { handleError } from "../../error";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../../context/loadingContext";

export default function SelectBoard() {
  const { itemIndex: questionIndex, movePrev, moveNext } = useHorizonBoard();
  const [answerList, setAnswerList] = useState<string[]>([]);
  const [disablePrev, setDisablePrev] = useState(false);
  const [disableNext, setDisableNext] = useState(false);
  const navigator = useNavigate();
  const { setIsLoading } = useLoading();
  const { data: peerCounts } = useQuery(
    [
      "getPool",
      convertGender(answerList[0]),
      convertPurpose(answerList[1]),
      convertTargetGender(answerList[2], answerList[0]),
    ],
    () =>
      fetchGetPool({
        gender: convertGender(answerList[0]),
        purpose: convertPurpose(answerList[1]),
        targetGender: convertTargetGender(answerList[2], answerList[0]),
      }),
    {
      enabled:
        answerList[0] !== "" && answerList[1] !== "" && answerList[2] !== "",
      select: ({ data }) => [data.major, data.college, data.all],
    }
  );

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
      const res = await fetchPostPool(convertAnswer(answerList));
      if (res.status === 200) navigator("/");
      else throw new Error(`요청이 실패했습니다. error code: ${res.status}`);
    } catch (err) {
      handleError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const SelectComponents = questions.map(({ choices, type }) => {
    switch (type) {
      case "select":
        return <QuestionCards choices={choices} handleChoice={handleChoice} />;
      case "select-with-describe":
        return (
          <QuestionCards
            choices={choices}
            handleChoice={handleChoice}
            describes={peerCounts?.map((count) =>
              count ? (
                <div>
                  현재 <span>{count}</span>명의 짝이
                  <br />
                  기다리고 있습니다.
                </div>
              ) : (
                <div>
                  해당 범위에는
                  <br /> 기다리는 짝이 없습니다.
                </div>
              )
            )}
          />
        );
      case "input":
        return (
          <InputBox
            type="tel"
            name="phone"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.target.value.length === 11) handleChoice(e.target.value);
            }}
            style={{ width: "80%" }}
          />
        );
      case "submit":
        return (
          <>
            <div>
              {answerList.map((e, key) => (
                <div style={{ margin: 10 }} key={key}>
                  {e}
                </div>
              ))}
            </div>
            <Button value="제출하기" type="submit" />
          </>
        );
    }
  });

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

  return (
    <>
      <StyledImageContainer>
        <img src={questions[questionIndex].imageSrc} alt="charater" />
      </StyledImageContainer>
      <StyledTitle>{questions[questionIndex].title}</StyledTitle>
      <form onSubmit={handleSubmit}>
        <HorizonBoard itemComponents={SelectComponents} />
      </form>
      <StyledQuestionCounter>
        <StyledButtonLeft onClick={movePrev} disabled={disablePrev} />
        {questionIndex + 1} / {questions.length}
        <StyledButtonRight onClick={moveNext} disabled={disableNext} />
      </StyledQuestionCounter>
    </>
  );
}

const StyledQuestionCounter = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
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

const StyledButton = styled.button`
  width: 50px;
  height: 20px;
  border: 0;
  background-color: white;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
  &:disabled {
    cursor: default;
  }
`;

const StyledButtonLeft = styled(StyledButton)`
  background-image: url("/assets/image/left-active.png");
  &:disabled {
    background-image: url("/assets/image/left-disable.png");
  }
`;

const StyledButtonRight = styled(StyledButton)`
  background-image: url("/assets/image/right-active.png");
  &:disabled {
    background-image: url("/assets/image/right-disable.png");
  }
`;
