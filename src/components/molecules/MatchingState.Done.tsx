import { handleError } from "utils/handleError";
import { fetchPostBreak } from "apis/match";
import Button from "../atoms/Button";
import Margin from "../atoms/Margin";
import { useMatchUser } from "./MatchingState.SelectBoard.api";
import CurrentState from "./MatchingState.CurrentState";
import { useSetRecoilState } from "recoil";
import { isLoadingState } from "store/global";
import Celebration from "components/atoms/Celebration";

export default function StateDone() {
  const setIsLoading = useSetRecoilState(isLoadingState);
  const { userStateRefetch } = useMatchUser();
  return (
    <>
      <Celebration />
      <img
        src={"./assets/character/done.png"}
        alt="charater"
        className="w-36 h-36"
      />
      <h2 className="text-lg">짝을 구했습니다 !</h2>
      <p className="mb-10">문자메시지를 확인해주세요</p>
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
