import { handleError } from "utils/handleError";
import { fetchPostBreak } from "apis/match";
import Margin from "../atoms/Margin";
import { useMatchUser } from "./MatchingState.SelectBoard.api";
import CurrentState from "./MatchingState.CurrentState";
import { useSetRecoilState } from "recoil";
import Celebration from "components/atoms/Celebration";
import { isLoadingState } from "components/atoms/Loading";
import { useNavigate } from "react-router-dom";

export default function StateDone() {
  const setIsLoading = useSetRecoilState(isLoadingState);
  const { userStateRefetch } = useMatchUser();
  const navigator = useNavigate();
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
      <>
        <label
          htmlFor="my-modal"
          className="btn-brown text-center leading-[32px]"
        >
          취소하고 다시 찾기
        </label>

        <input type="checkbox" id="my-modal" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">
              매칭 취소시 패널티가 있습니다!
            </h3>
            <p className="py-4">
              매칭을 바로 취소하는 사용자에게 벌점이 부과됩니다.
              <br />
              벌점에 따라 서비스 이용이 제한됩니다.
            </p>
            <div className="modal-action">
              <label
                htmlFor="my-modal"
                className="btn-gray w-2/3 text-center leading-[32px]"
              >
                돌아가기
              </label>
              <button
                className="btn-red w-1/3"
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
              >
                매칭 취소
              </button>
            </div>
          </div>
        </div>
      </>
    </>
  );
}
