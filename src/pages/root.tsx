import { Navigate } from "react-router-dom";
import { useAuth } from "../context/auth";

export default function RootPage() {
  const { isAuth } = useAuth();
  return (
    <>
      {isAuth ? (
        <Navigate to="/select" replace />
      ) : (
        <Navigate to="/login" replace />
      )}
    </>
  );
}
