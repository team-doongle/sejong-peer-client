import Button from "../atoms/Button";
import InputBox from "../atoms/InputBox";
import Margin from "../atoms/Margin";
import QuestionCards from "../atoms/QuestionCards";
import { questions } from "./MatchingState.SelectBoard.questions";

export default function SelectComponents({
  handleChoice,
  peerCounts,
  answerList,
}: {
  handleChoice: (choice: string) => void;
  peerCounts?: number[];
  answerList: string[];
}) {
  return questions.map(({ choices, type, name }) => {
    switch (type) {
      case "select":
        return <QuestionCards choices={choices} handleChoice={handleChoice} />;
      case "range":
        return (
          <InputBox
            type="number"
            placeholder="[예시] 2 입력 시 (본인 학번/학년 ± 2)를 범위로 탐색"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.target.value.length === 1) handleChoice(e.target.value);
            }}
            style={{ width: "80%" }}
          />
        );
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
              {answerList.map((e, i) => (
                <div key={i} style={{ display: "flex" }}>
                  <div style={{ margin: 10, width: 100 }}>
                    {questions[i].name}
                  </div>
                  <div style={{ margin: 10 }}>{e}</div>
                </div>
              ))}
            </div>
            <Margin size={2} />
            <Button value="제출하기" type="submit" />
          </>
        );
    }
  });
}
