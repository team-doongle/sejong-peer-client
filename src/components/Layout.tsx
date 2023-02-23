import { ReactNode } from "react";
import styled from "styled-components";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <StyledContainer>
      <StyledWrapper>{children}</StyledWrapper>
    </StyledContainer>
  );
};

export default Layout;

const StyledContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledWrapper = styled.div`
  width: 400px;
  height: 60vh;
`;
