import styled from "styled-components";
import { useAuth } from "../../context/authContext";
import useInput from "../../hooks/useInput";
import ButtonLogin from "../atoms/ButtonLogin";
import InputBox from "../atoms/InputBox";

const LoginForm = () => {
  const { input: id, onChange: onChangeId } = useInput("");
  const { input: password, onChange: onChangePassword } = useInput("");
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login({ id, pw: password });
  };

  return (
    <>
      <StyledForm onSubmit={handleSubmit}>
        <StyledContainer>
          <StyledWrapper>
            <InputBox
              placeholder={"아이디"}
              value={id}
              onChange={onChangeId}
              required
            />
            <InputBox
              placeholder={"비밀번호"}
              value={password}
              onChange={onChangePassword}
              type="password"
              required
            />
          </StyledWrapper>
          <ButtonLogin value={"로그인"} type={"submit"} />
        </StyledContainer>
      </StyledForm>
    </>
  );
};

export default LoginForm;

const StyledForm = styled.form`
  & > input {
    margin-bottom: 16px;
  }
`;

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledWrapper = styled.div`
  margin-right: 16px;
  & > input:first-child {
    margin-bottom: 16px;
  }
`;
