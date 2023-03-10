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
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center">
          <div className="mr-[16px]">
            <input
              placeholder={"학사정보시스템 아이디"}
              value={id}
              onChange={onChangeId}
              required
              className="mb-[16px]"
            />
            <input
              placeholder={"학사정보시스템 비밀번호"}
              value={password}
              onChange={onChangePassword}
              type="password"
              required
            />
          </div>
          <ButtonLogin value={"로그인"} type={"submit"} />
        </div>
      </form>
    </>
  );
}
