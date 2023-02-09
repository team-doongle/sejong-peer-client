import styled from "styled-components";
import useInput from "../../hooks/useInput";
import { fetchLogin } from "../../services/api";
import Button from "../atoms/Button";
import InputBox from "../atoms/InputBox";

const LoginForm = () => {
  const { input: id, onChange: onChangeId } = useInput("");
  const { input: password, onChange: onChangePassword } = useInput("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchLogin({ id, pw: password });
  };

  return (
    <>
      <StyledForm onSubmit={handleSubmit}>
        <InputBox placeholder={"아이디"} value={id} onChange={onChangeId} />
        <InputBox
          placeholder={"비밀번호"}
          value={password}
          onChange={onChangePassword}
          type="password"
        />
        <Button value={"제출"} />
      </StyledForm>
    </>
  );
};

export default LoginForm;

const StyledForm = styled.form`
  width: 248px;
  & > input {
    margin-bottom: 16px;
  }
`;
