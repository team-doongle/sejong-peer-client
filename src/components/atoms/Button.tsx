import styled, { css } from "styled-components";
import { color } from "../../styles/palette";

type Theme = "default" | "danger";

const Button = ({
  value,
  theme = "default",
  onClick,
  type = "button",
}: {
  value: string;
  theme?: Theme;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  type?: "button" | "submit" | "reset";
}) => {
  return (
    <>
      {onClick ? (
        <StyledButton theme={theme} onClick={onClick} type={type}>
          {value}
        </StyledButton>
      ) : (
        <StyledButton theme={theme}>{value}</StyledButton>
      )}
    </>
  );
};

export default Button;

const StyledButton = styled.button<{ theme: Theme }>`
  width: 80px;
  height: 80px;
  border: 0;
  background-color: ${color.brown};
  border-radius: 3px;
  color: white;
  flex-shrink: 0;
  &:hover {
    cursor: pointer;
  }
`;
