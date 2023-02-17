import { FetchGetUserResponse } from "../services/models/matchSchema";

export type MatchContextProps = {
  getStatus: () => FetchGetUserResponse;
};
