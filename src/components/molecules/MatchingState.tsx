import { useMatchUser } from "./MatchingState.SelectBoard.api";
import SelectBoard from "./MatchingState.SelectBoard";
import StateDone from "./MatchingState.Done";
import StateOnGoing from "./MatchingState.OnGoing";

export default function MatchingState() {
  const { user } = useMatchUser();

  return (
    <>
      {user?.state === "NOT_REGISTER" ? (
        <SelectBoard />
      ) : user?.state === "ON_GOING" ? (
        <StateOnGoing />
      ) : user?.state === "DONE" ? (
        <StateDone />
      ) : (
        <div>no state</div>
      )}
    </>
  );
}
