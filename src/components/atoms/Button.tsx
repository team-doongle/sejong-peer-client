import styled, { css } from "styled-components";
import { color } from "../../styles/palette";

type Theme = "default" | "danger";

const Button = ({
  value,
  theme = "default",
  onClick,
}: {
  value: string;
  theme?: Theme;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}) => {
  return (
    <>
      {onClick ? (
        <StyledButton theme={theme} onClick={onClick}>
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
  width: 100%;
  height: 32px;
  border: 0;
  &:hover {
    cursor: pointer;
  }
  &:disabled {
    background-color: ${color.gray6};
  }
  ${(props) => {
    switch (props.theme) {
      case "default":
        return css`
          background-color: ${color.gray5};
        `;
      case "danger":
        return css`
          background-color: ${color.red};
          color: ${color.white};
        `;
    }
  }}
`;
