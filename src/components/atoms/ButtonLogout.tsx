import styled from "styled-components";
import { color } from "../../styles/palette";
import useLogout from "./ButtonLogout.hooks";

export default function ButtonLogout() {
  const { logout } = useLogout();

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
  margin-left: 8px;
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
