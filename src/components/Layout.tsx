import { ReactNode } from "react";
import styled from "styled-components";

const Layout = ({ children }: { children: ReactNode }) => {
  return <StyledContainer>{children}</StyledContainer>;
};

export default Layout;

const StyledContainer = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
