import { useRecoilValue } from "recoil";
import QuestionCards, { QuestionCardsProps } from "../atoms/QuestionCards";
import { useMatchPoolCounts } from "./MatchingState.SelectBoard.api";
import { answersState } from "./MatchingState.SelectBoard.hooks";
import { questions } from "./MatchingState.SelectBoard.questions";
import { useState } from "react";

export default function SelectComponents({
  handleChoice,
}: {
  handleChoice: QuestionCardsProps["handleChoice"];
}) {
  const answers = useRecoilValue(answersState);
  const { peerCounts } = useMatchPoolCounts(answers);
  const [kakaoId, setKakaoId] = useState("");

  return questions.map(({ choices, type, key }) => {
    switch (type) {
      case "select":
        return (
          <QuestionCards
            choices={choices}
            handleChoice={handleChoice}
            title={key}
          />
        );
      case "range":
        return (
          <select
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              handleChoice(e.target.value, key);
            }}
          >
            <option disabled selected>
              선택해주세요
            </option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>상관 없음</option>
          </select>
        );
      case "select-with-describe":
        return (
          <QuestionCards
            choices={choices}
            handleChoice={handleChoice}
            title={key}
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
          <input
            type="tel"
            name="phone"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const onlyNumbers = e.target.value.replace(/[^0-9]/g, "");
              e.target.value = onlyNumbers;
              if (e.target.value.length === 11) {
                e.target.blur();
                handleChoice(e.target.value, key);
              }
            }}
            maxLength={11}
            className="w-4/5"
          />
        );
      case "input-id":
        return (
          <div className="flex w-4/5">
            <input
              type="text"
              name="id"
              onChange={(e) => {
                setKakaoId(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleChoice(kakaoId, key);
                }
              }}
              maxLength={20}
            />
            <button
              type="button"
              onClick={() => handleChoice(kakaoId, key)}
              className={"btn-brown w-1/3 ml-4"}
            >
              확인
            </button>
          </div>
        );
      case "submit":
        return (
          <>
            <div className="grid gap-4 grid-cols-2 w-4/5 mb-9">
              {Object.values(answers).map((e, i) => (
                <>
                  {questions[i].type === "submit" ? null : (
                    <>
                      <div>{questions[i].name}</div>
                      <div>{e}</div>
                    </>
                  )}
                </>
              ))}
            </div>
            <p className="text-sm text-gray-600 text-center">
              제출하실 정보는 서비스 제공을 위해 일정기간 저장됩니다.
              <br />
              매칭 이후 상대방과 발생하는 분쟁에 대해서는
              <br />
              서비스 제공자가 책임질 수 없습니다.
              <br />
              해당 내용에 동의하시면 제출하기 버튼을 눌러주세요.
            </p>
            <button type="submit" className="btn-brown">
              제출하기
            </button>
          </>
        );
    }
  });
}
