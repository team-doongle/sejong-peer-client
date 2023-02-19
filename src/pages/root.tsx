import { useQuery } from "react-query";
import { Navigate, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { useLoading } from "../context/loadingContext";
import { handleError } from "../error";
import { fetchGetUser, fetchPostBreak } from "../services/apis/match";

export default function RootPage() {
  const { data: state } = useQuery(["state"], fetchGetUser, {
    select: ({ data }) => data.state,
  });
  const { setIsLoading } = useLoading();
  const navigator = useNavigate();

  return (
    <>
      <Layout>
        {state === "NOT_REGISTER" ? (
          <Navigate to="/select" replace />
        ) : state === "ON_GOING" ? (
          <div>구하고있슴둥</div>
        ) : state === "DONE" ? (
          <button
            onClick={async () => {
              try {
                setIsLoading(true);
                const res = await fetchPostBreak();
                if (res.status === 200) navigator("/");
                else
                  throw new Error(
                    `관계 끊기 요청이 실패했습니다.\nerror code: ${res.status}`
                  );
              } catch (err) {
                handleError(err);
              } finally {
                setIsLoading(false);
              }
            }}
          >
            취소하기
          </button>
        ) : (
          <div>no state</div>
        )}
      </Layout>
    </>
  );
}
