import styled from "styled-components";
import { color } from "../../styles/palette";

const Button = ({
  value,
  onClick,
  text,
  type = "button",
}: {
  value: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  text?: string;
  type?: "button" | "submit" | "reset";
}) => {
  return (
    <>
      <StyledButton onClick={onClick} type={type} value={value}>
        {text ?? value}
      </StyledButton>
    </>
  );
};

export default Button;

const StyledButton = styled.button`
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
