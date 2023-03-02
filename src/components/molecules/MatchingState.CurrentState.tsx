import styled from "styled-components";
import { useMatchUser } from "./MatchingState.SelectBoard.api";

export default function CurrentState() {
  const { user } = useMatchUser();
  return (
    <>
      <div className="grid gap-4 grid-cols-2">
        <div>본인 성별</div>
        <div>{user?.gender === "MALE" ? "남자" : "여자"}</div>

        <div>기능</div>
        <div>
          {user?.purpose === "GET_SENIOR" ? "짝선배 구하기" : "짝후배 구하기"}
        </div>

        <div>짝 성별</div>
        <div>{user?.targetGender === "ALL" ? "상관없음" : "동성"}</div>

        <div>학년 차이 허용 범위</div>
        <div>{user?.gradeLimit === 99 ? "상관없음" : user?.gradeLimit}</div>

        <div>학번 차이 허용 범위</div>
        <div>
          {user?.studentNumberLimit === 99
            ? "상관없음"
            : user?.studentNumberLimit}
        </div>

        <div>짝 탐색 범위</div>
        <div>
          {user?.targetBoundary === "ALL"
            ? "상관없음"
            : user?.targetBoundary === "COLLEGE"
            ? "나와 같은 단과대"
            : "나와 같은 학과"}
        </div>

        <div>결과 전송 전화번호</div>
        <div>{user?.phoneNumber}</div>
      </div>
    </>
  );
}

const StyledFlex = styled.div`
  display: flex;
  & div {
    margin-bottom: 15px;
  }
  & div:first-child {
    margin: 0 10px;
    width: 160px;
  }

  &:first-child {
    margin-top: 30px;
  }
`;
