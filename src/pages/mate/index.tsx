import ButtonLogout from "components/atoms/ButtonLogout";
import Loading from "components/atoms/Loading";
import MatchingState from "components/molecules/MatchingState";

export default function MatePage() {
  return (
    <>
      <Loading />
      <div className="flex flex-col items-center justify-center mt-5">
        <div className="w-[356px]">
          <ButtonLogout />
          <div className="flex flex-col items-center justify-center h-full">
            <MatchingState />
          </div>
        </div>
      </div>
    </>
  );
}
