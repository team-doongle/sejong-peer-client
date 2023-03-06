import ReleaseNotes from "components/atoms/ReleaseNotes";
import MainLogo from "../../components/atoms/MainLogo";
import LoginForm from "../../components/molecules/LoginForm";
import Loading from "components/atoms/Loading";

export default function LoginPage() {
  return (
    <>
      <Loading />
      <div className="flex flex-col items-center justify-center h-[80vh]">
        <div className="flex flex-col items-center w-[300px]">
          <ReleaseNotes />
          <MainLogo />
          <div className="text-[20px] mt-[8px] mb-[32px] my-0">
            Sejong Peer !
          </div>
          <LoginForm />
        </div>
      </div>
    </>
  );
}
