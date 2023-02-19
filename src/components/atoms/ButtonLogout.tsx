import styled from "styled-components";
import { useAuth } from "../../context/auth";
import { color } from "../../styles/palette";

export default function ButtonLogout() {
  const { logout } = useAuth();
  return (
    <>
      <StyledButton type="button" onClick={() => logout()}>
        로그아웃
      </StyledButton>
    </>
  );
}

const StyledButton = styled.button`
  color: ${color.gray2};
  width: 72px;
  height: 32px;
  border: 0px;
  font-size: 12px;
  margin-bottom: 16px;
  margin-left: 32px;
  background-color: white;
  background-repeat: no-repeat;
  background-position: left;
  background-image: url("/assets/image/left-small-active.png");
  &:hover {
    color: black;
    background-image: url("/assets/image/left-small-hover.png");
    cursor: pointer;
  }
`;
