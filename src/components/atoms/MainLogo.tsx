import styled from "styled-components";

const MainLogo = () => {
  return (
    <>
      <StyledLogo src="/assets/character/main.jpg" />
    </>
  );
};

export default MainLogo;

const StyledLogo = styled.img`
  width: 192px;
  height: 128px;
`;
