import { useQuery } from "react-query";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/atoms/Button";
import ButtonLogout from "../components/atoms/ButtonLogout";
import Margin from "../components/atoms/Margin";
import Layout from "../components/Layout";
import { useLoading } from "../context/loadingContext";
import { handleError } from "../error";
import { queryClient } from "../main";
import { fetchGetUser, fetchPostBreak } from "../services/apis/match";

export default function RootPage() {
  const { data: state } = useQuery(["state"], fetchGetUser, {
    select: ({ data }) => data.state,
    notifyOnChangeProps: ["data"],
  });
  const { setIsLoading } = useLoading();
  const navigator = useNavigate();

  return (
    <>
      <Layout>
        <ButtonLogout />
        <StyledContainer>
          {state === "NOT_REGISTER" ? (
            <Navigate to="/select" replace />
          ) : state === "ON_GOING" ? (
            <div>구하고있슴둥</div>
          ) : state === "DONE" ? (
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
                      setTimeout(() => {
                        queryClient.invalidateQueries(["state"]);
                        navigator("/");
                        setIsLoading(false);
                      });
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
          ) : (
            <div>no state</div>
          )}
        </StyledContainer>
      </Layout>
    </>
  );
}

const StyledContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
