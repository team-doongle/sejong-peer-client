import { useLoaderData } from "react-router-dom";
import { FetchGetUserResponse } from "apis/match.type";

export default function StateBlocked() {
  const user = useLoaderData() as FetchGetUserResponse;

  return (
    <>
      <img
        src={"./assets/character/4.jpg"}
        alt="charater"
        className="w-36 h-36"
      />
      <h2 className="mb-6 text-lg">
        경고가 누적되어 매칭시도가 제한되었습니다
      </h2>
      <h3>제한 종료 시간</h3>
      <div>{user.unblockTime.toString()}</div>
    </>
  );
}
