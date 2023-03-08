import { fetchLogin } from "apis/auth";
import { FetchLoginRequest } from "apis/auth.type";
import { isLoadingState } from "components/atoms/Loading";
import { path } from "pages/router";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { handleError } from "utils/handleError";
import { storage } from "utils/storage";

export default function useLogin() {
  const setIsLoading = useSetRecoilState(isLoadingState);
  const navigator = useNavigate();

  const login = async (props: FetchLoginRequest) => {
    try {
      setIsLoading(true);
      const res = await fetchLogin(props);
      const token = res.data.accessToken;
      if (!token)
        throw new Error(
          "인증에 실패했습니다.\n 세종대학교 학사포털의\n아이디와 비밀번호를 입력해주세요."
        );
      storage.set("ACCESS_TOKEN", token);
      navigator(path.lobby);
    } catch (err) {
      handleError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { login };
}
