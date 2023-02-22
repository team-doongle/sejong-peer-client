import { HorizonBoardProvider } from "../../context/horizonBoardContext";
import { useMatchUserState } from "../../services/hooks/matchQueries";
import SelectBoard from "./SelectBoard";
import StateDone from "./StateDone";

export default function MatchingState() {
  const { state } = useMatchUserState();

  return (
    <>
      {state === "NOT_REGISTER" ? (
        <HorizonBoardProvider>
          <SelectBoard />
        </HorizonBoardProvider>
      ) : state === "ON_GOING" ? (
        <div>구하고있슴둥</div>
      ) : state === "DONE" ? (
        <StateDone />
      ) : (
        <div>no state</div>
      )}
    </>
  );
}
