import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import { handleError } from "../error";
import { queryClient } from "../main";
import { fetchGetUser, fetchPostBreak } from "../services/apis/match";

export default function RootPage() {
  const { data: state } = useQuery(["state"], fetchGetUser, {
    select: ({ data }) => data.state,
  });
  const navigator = useNavigate();

  return (
    <>
      {state === "NOT_REGISTER" ? (
        <Navigate to="/select" replace />
      ) : state === "ON_GOING" ? (
        <div>구하고있슴둥</div>
      ) : state === "DONE" ? (
        <button
          onClick={async () => {
            try {
              const res = await fetchPostBreak();
              if (res.status === 200) navigator("/");
              else
                throw new Error(
                  `관계 끊기 요청이 실패했습니다.\nerror code: ${res.status}`
                );
            } catch (err) {
              handleError(err);
            }
          }}
        >
          취소하기
        </button>
      ) : (
        <div>no state</div>
      )}
    </>
  );
}
