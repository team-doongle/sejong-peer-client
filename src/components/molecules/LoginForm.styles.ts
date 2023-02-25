import styled from "styled-components";

export const Form = styled.form`
  & > input {
    margin-bottom: 16px;
  }
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
`;

export const Wrapper = styled.div`
  margin-right: 16px;
  & > input:first-child {
    margin-bottom: 16px;
  }
`;
