import styled from "styled-components";

// TODO: any 제거
export default function InputBox(props: any) {
  return (
    <>
      <StyledInput {...props} />
    </>
  );
}

const StyledInput = styled.input`
  width: 100%;
  height: 32px;
  border: 0px;
  border-bottom: 1px solid black;
  padding: 0 8px;
`;
