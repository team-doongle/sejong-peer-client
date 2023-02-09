import styled, { css } from "styled-components";
import { color } from "../../styles/palette";

type Theme = "default" | "danger";

const Button = ({
  theme = "default",
  value,
}: {
  theme?: Theme;
  value: string;
}) => {
  return (
    <>
      <StyledButton theme={theme}>{value}</StyledButton>
    </>
  );
};

export default Button;

const StyledButton = styled.button<{ theme: Theme }>`
  width: 100%;
  height: 32px;
  border: 0;
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
