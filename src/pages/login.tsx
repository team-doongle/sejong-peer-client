import styled from "styled-components";
import Layout from "../components/Layout";
import LoginForm from "../components/molecules/LoginForm";
import MainLogo from "../components/atoms/MainLogo";

export default function LoginPage() {
  return (
    <Layout>
      <StyledContainer>
        <MainLogo />
        <LoginForm />
      </StyledContainer>
    </Layout>
  );
}

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  & > img {
    margin-bottom: 104px;
  }
`;
