import styled from "styled-components";
import { useLoading } from "../../context/loadingContext";
import { handleError } from "../../utils/handleError";
import { fetchPostBreak } from "../../services/apis/match";
import Button from "../atoms/Button";
import Margin from "../atoms/Margin";
import { useMatchUser } from "./MatchingState.SelectBoard.api";
import CurrentState from "./MatchingState.CurrentState";

export default function StateOnGoing() {
  const { setIsLoading } = useLoading();
  const { userStateRefetch } = useMatchUser();
  return (
    <>
      <div style={{ textAlign: "center", lineHeight: "24px" }}>
        짝을 구하는 중입니다.
      </div>
      <CurrentState />
      <Margin size={3} />
      <Button
        value="취소하고 다시 찾기"
        onClick={async () => {
          try {
            setIsLoading(true);
            const res = await fetchPostBreak();
            if (res.status === 200) {
              userStateRefetch();
              setIsLoading(false);
            } else
              throw new Error(
                `관계 끊기 요청이 실패했습니다.\nerror code: ${res.status}`
              );
          } catch (err) {
            handleError(err);
            setIsLoading(false);
          }
        }}
      />
    </>
  );
}
