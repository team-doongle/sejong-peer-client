import { ReactNode } from "react";
import styled from "styled-components";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <StyledContainer>
      <div>{children}</div>
    </StyledContainer>
  );
};

export default Layout;

const StyledContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledWapper = styled.div``;
