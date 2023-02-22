import { useLoading } from "../../context/loadingContext";
import { handleError } from "../../error";
import { fetchPostBreak } from "../../services/apis/match";
import { useMatchUserState } from "../../services/hooks/matchQueries";
import Button from "../atoms/Button";
import Margin from "../atoms/Margin";

export default function StateDone() {
  const { setIsLoading } = useLoading();
  const { userStateRefetch } = useMatchUserState();
  return (
    <>
      <div style={{ textAlign: "center", lineHeight: "24px" }}>
        짝을 구했습니다! <br />
        문자메시지를 확인해주세요.
      </div>
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
