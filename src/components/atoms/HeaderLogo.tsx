import styled from "styled-components";

const HeaderLogo = () => {
  return (
    <>
      <StyledHeaderLogo src="./assets/headerLogo.png" />
    </>
  );
};

export default HeaderLogo;

const StyledHeaderLogo = styled.img`
  width: 72px;
  height: 72px;
`;
