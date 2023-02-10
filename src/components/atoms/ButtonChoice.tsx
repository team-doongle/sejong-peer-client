import styled, { css } from "styled-components";
import { color } from "../../styles/palette";

export default function ButtonChoice({
  value,
  onClick,
  disabled,
  isSelected,
}: {
  value?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled?: boolean;
  isSelected?: boolean;
}) {
  return (
    <>
      <StyledButton
        onClick={onClick}
        value={value}
        disabled={disabled}
        isSelected={isSelected}
      >
        {value}
      </StyledButton>
    </>
  );
}

const StyledButton = styled.button`
  user-select: none;
  width: 160px;
  height: 160px;
  margin: 6px;
  padding: 14px;
  border: 0;
  border-radius: 10px;
  &:hover {
    cursor: pointer;
  }
  background-color: ${({ isSelected }: { isSelected?: boolean }) =>
    isSelected ? color.gray3 : color.gray5};

  &:disabled {
    background-color: ${color.gray6};
    cursor: default;
  }
`;
