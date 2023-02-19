import styled from "styled-components";

export default function Loading() {
  return (
    <>
      <StyledBlack />
      <StyledContainer>
        <img src="/assets/image/loading.gif" alt="loading" />
      </StyledContainer>
    </>
  );
}

const StyledBlack = styled.div`
  background-color: black;
  opacity: 0.5;
  max-width: 100%;
  max-height: 100%;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  overflow: auto;
  position: fixed;
  user-select: none;
`;
const StyledContainer = styled.div`
  max-width: 100%;
  max-height: 100%;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  overflow: auto;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
`;
