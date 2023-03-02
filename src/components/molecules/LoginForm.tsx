import * as S from "./LoginForm.styles";
import ButtonLogin from "../atoms/ButtonLogin";
import useInput from "hooks/useInput";
import useLogin from "./LoginForm.hooks";

export default function LoginForm() {
  const { input: id, onChange: onChangeId } = useInput("");
  const { input: password, onChange: onChangePassword } = useInput("");
  const { login } = useLogin();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login({ id, pw: password });
  };

  return (
    <>
      <S.Form onSubmit={handleSubmit}>
        <S.Container>
          <S.Wrapper>
            <input
              placeholder={"아이디"}
              value={id}
              onChange={onChangeId}
              required
            />
            <input
              placeholder={"비밀번호"}
              value={password}
              onChange={onChangePassword}
              type="password"
              required
            />
          </S.Wrapper>
          <ButtonLogin value={"로그인"} type={"submit"} />
        </S.Container>
      </S.Form>
    </>
  );
}
