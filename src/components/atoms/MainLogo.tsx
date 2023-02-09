import styled from "styled-components";

const MainLogo = () => {
  return (
    <>
      <StyledLogo src="/assets/mainLogo.png" />
    </>
  );
};

export default MainLogo;

const StyledLogo = styled.img`
  width: 160px;
  height: 160px;
`;
