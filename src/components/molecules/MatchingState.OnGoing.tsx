import { handleError } from "utils/handleError";
import { fetchPostBreak } from "apis/match";
import Button from "../atoms/Button";
import Margin from "../atoms/Margin";
import { useMatchUser } from "./MatchingState.SelectBoard.api";
import CurrentState from "./MatchingState.CurrentState";
import { useSetRecoilState } from "recoil";
import { isLoadingState } from "components/atoms/Loading";
import { useNavigate } from "react-router-dom";

export default function StateOnGoing() {
  const setIsLoading = useSetRecoilState(isLoadingState);
  const { userStateRefetch } = useMatchUser();
  const navigator = useNavigate();

  return (
    <>
      <img
        src={"./assets/character/on_going.png"}
        alt="charater"
        className="w-36 h-36"
      />
      <h2 className="mb-6 text-lg">짝을 구하는 중입니다</h2>
      <CurrentState />
      <Margin size={2} />
      <Button
        value="취소하고 다시 찾기"
        onClick={async () => {
          try {
            setIsLoading(true);
            const res = await fetchPostBreak();
            if (res.status === 200) {
              userStateRefetch();
              setIsLoading(false);
              navigator("/");
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
