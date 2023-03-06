import SelectBoard from "./MatchingState.SelectBoard";
import StateDone from "./MatchingState.Done";
import StateOnGoing from "./MatchingState.OnGoing";
import { useLoaderData } from "react-router-dom";
import StateBlocked from "./MatchingState.Blocked";
import { FetchGetUserResponse } from "apis/match.type";

export default function MatchingState() {
  const { state } = useLoaderData() as { state: FetchGetUserResponse["state"] };

  return (
    <>
      {state === "NOT_REGISTER" ? (
        <SelectBoard />
      ) : state === "ON_GOING" ? (
        <StateOnGoing />
      ) : state === "DONE" ? (
        <StateDone />
      ) : state === "BLOCKED" ? (
        <StateBlocked />
      ) : (
        <div>{state}</div>
      )}
    </>
  );
}
