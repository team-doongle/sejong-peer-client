import { useQuery } from "react-query";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import { fetchGetUser, fetchPostBreak } from "../services/apis/match";

export default function RootPage() {
  const { data: state } = useQuery(["state"], fetchGetUser, {
    select: ({ data }) => data.state,
  });
  const { isAuth } = useAuth();

  return (
    <>
      {!isAuth ? (
        <Navigate to="login" replace />
      ) : state === "NOT_REGISTER" ? (
        <Navigate to="/select" replace />
      ) : state === "ON_GOING" ? (
        <div>구하고있슴둥</div>
      ) : state === "DONE" ? (
        <button onClick={() => fetchPostBreak()}>취소하기</button>
      ) : (
        <div>no state</div>
      )}
    </>
  );
}
