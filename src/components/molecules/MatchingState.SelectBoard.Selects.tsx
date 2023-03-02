import Button from "../atoms/Button";
import InputBox from "../atoms/InputBox";
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
          <select
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              handleChoice(e.target.value);
            }}
          >
            <option disabled selected>
              선택해주세요
            </option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>상관없음</option>
          </select>
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
              const onlyNumbers = e.target.value.replace(/[^0-9]/g, "");
              e.target.value = onlyNumbers;
              if (e.target.value.length === 11) {
                e.target.blur();
                handleChoice(e.target.value);
              }
            }}
            maxlength="11"
            className="w-4/5"
          />
        );
      case "submit":
        return (
          <>
            <div className="grid gap-4 grid-cols-2 w-4/5">
              {answerList.map((e, i) => (
                <>
                  <div>{questions[i].name}</div>
                  <div>{e}</div>
                </>
              ))}
            </div>
            <Button value="제출하기" type="submit" />
          </>
        );
    }
  });
}
