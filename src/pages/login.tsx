import ReleaseNotes from "components/atoms/ReleaseNotes";
import styled from "styled-components";
import MainLogo from "../components/atoms/MainLogo";
import LoginForm from "../components/molecules/LoginForm";
import Loading from "components/atoms/Loading";

export default function LoginPage() {
  return (
    <>
      <Loading />
      <StyledContainer>
        <StyledWrapper>
          <ReleaseNotes />
          <MainLogo />
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
