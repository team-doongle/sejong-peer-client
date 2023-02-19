import styled from "styled-components";
import Layout from "../components/Layout";
import LoginForm from "../components/molecules/LoginForm";

export default function LoginPage() {
  return (
    <>
      <StyledContainer>
        <StyledWrapper>
          <img src="/assets/character/main.png" alt="main character" />
          <StyledTitle>Sejong Peer !</StyledTitle>
          <LoginForm />
        </StyledWrapper>
      </StyledContainer>
    </>
  );
}

const StyledContainer = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 300px;
`;

const StyledTitle = styled.h2`
  font-size: 20px;
  margin: 8px 0px 32px;
`;
