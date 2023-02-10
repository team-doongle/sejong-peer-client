import styled, { css } from "styled-components";

interface Props {
  size?: number;
  row?: boolean;
}

const Margin = styled.div<Props>`
  height: calc(${({ size }: Props) => size} * 1rem);
  min-height: calc(${({ size }: Props) => size} * 1rem);
  ${({ row, size }: Props) =>
    row &&
    css`
      height: 0;
      min-height: 0;
      width: calc(${size} * 1rem);
    `}
`;

export default Margin;
