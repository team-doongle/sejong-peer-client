import { fetchLogout } from "apis/auth";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { isAuthState, isLoadingState } from "store/global";
import { handleError } from "utils/handleError";
import { storage } from "utils/storage";

export default function useLogout() {
  const setIsLoading = useSetRecoilState(isLoadingState);
  const setIsAuth = useSetRecoilState(isAuthState);
  const navigator = useNavigate();

  const logout = async () => {
    try {
      setIsLoading(true);
      await fetchLogout();
      storage.remove("ACCESS_TOKEN");
      setIsAuth(false);
      navigator("/login");
    } catch (err) {
      handleError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { logout };
}
