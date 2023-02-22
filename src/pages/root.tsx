import styled from "styled-components";
import ButtonLogout from "../components/atoms/ButtonLogout";
import Layout from "../components/Layout";
import MatchingState from "../components/molecules/MatchingState";

export default function RootPage() {
  return (
    <Layout>
      <ButtonLogout />
      <StyledContainer>
        <MatchingState />
      </StyledContainer>
    </Layout>
  );
}

const StyledContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
