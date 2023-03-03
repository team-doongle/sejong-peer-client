import { fetchLogout } from "apis/auth";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { handleError } from "utils/handleError";
import { storage } from "utils/storage";
import { isLoadingState } from "./Loading";

export default function useLogout() {
  const setIsLoading = useSetRecoilState(isLoadingState);
  const navigator = useNavigate();

  const logout = async () => {
    try {
      setIsLoading(true);
      await fetchLogout();
      storage.remove("ACCESS_TOKEN");
      navigator("/login");
    } catch (err) {
      handleError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return { logout };
}
