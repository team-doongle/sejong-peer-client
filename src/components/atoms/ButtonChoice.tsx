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
  box-shadow: 1px 1px 3px gray;
  ${({ isSelected }: { isSelected?: boolean }) =>
    isSelected
      ? css`
          background-color: ${color.brown};
          color: white;
        `
      : css`
          background-color: white;
        `}
  &:disabled {
    background-color: ${color.gray6};
    cursor: default;
  }
`;
