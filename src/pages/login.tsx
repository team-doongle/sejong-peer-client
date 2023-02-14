import styled from "styled-components";
import Layout from "../components/Layout";
import LoginForm from "../components/molecules/LoginForm";
import MainLogo from "../components/atoms/MainLogo";

export default function LoginPage() {
  return (
    <Layout>
      <StyledContainer>
        <img src="/assets/character/main.png" alt="main character" />
        <StyledTitle>세종 짝짓기</StyledTitle>
        <LoginForm />
      </StyledContainer>
    </Layout>
  );
}

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 300px;
`;

const StyledTitle = styled.h2`
  font-size: 20px;
  margin: 8px 0px 32px;
`;
