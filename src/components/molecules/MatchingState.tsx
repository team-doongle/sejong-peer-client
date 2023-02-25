import { HorizonBoardProvider } from "../../context/horizonBoardContext";
import { useMatchUser } from "../../services/hooks/matchQueries";
import SelectBoard from "./SelectBoard";
import StateDone from "./StateDone";

export default function MatchingState() {
  const { user } = useMatchUser();

  return (
    <>
      {user?.state === "NOT_REGISTER" ? (
        <HorizonBoardProvider>
          <SelectBoard />
        </HorizonBoardProvider>
      ) : user?.state === "ON_GOING" ? (
        <div>구하고있슴둥</div>
      ) : user?.state === "DONE" ? (
        <StateDone />
      ) : (
        <div>no state</div>
      )}
    </>
  );
}
