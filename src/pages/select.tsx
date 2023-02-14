import { useEffect } from "react";
import styled from "styled-components";
import HeaderLogo from "../components/atoms/HeaderLogo";
import Margin from "../components/atoms/Margin";
import Layout from "../components/Layout";
import QuestionProvider from "../components/slider/components/QuestionProvider";
import { useAuth } from "../context/auth";
import questions from "../services/static/questions.json";

export default function SelectPage() {
  const { refreshAuth } = useAuth();

  useEffect(() => {
    refreshAuth();
  }, []);
  return (
    <>
      <Layout>
        <HeaderLogo />
        <Margin size={3} />
        <QuestionProvider questions={questions}></QuestionProvider>
      </Layout>
    </>
  );
}

const StyledContainer = styled.div`
  & > img {
    margin-bottom: 114px;
  }
`;
