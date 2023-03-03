import SelectBoard from "./MatchingState.SelectBoard";
import StateDone from "./MatchingState.Done";
import StateOnGoing from "./MatchingState.OnGoing";
import { useLoaderData } from "react-router-dom";

export default function MatchingState() {
  const { state } = useLoaderData() as { state: string };

  return (
    <>
      {state === "NOT_REGISTER" ? (
        <SelectBoard />
      ) : state === "ON_GOING" ? (
        <StateOnGoing />
      ) : state === "DONE" ? (
        <StateDone />
      ) : (
        <div>{state}</div>
      )}
    </>
  );
}
