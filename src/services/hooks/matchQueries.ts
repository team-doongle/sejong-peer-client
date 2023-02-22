import { useQuery } from "react-query";
import { fetchGetPool, fetchGetUser } from "../apis/match";
import {
  convertGender,
  convertPurpose,
  convertTargetGender,
} from "../static/questions";

export const useMatchUserState = () => {
  const { data: state, refetch: userStateRefetch } = useQuery(
    ["state"],
    fetchGetUser,
    {
      select: ({ data }) => data.state,
    }
  );

  return { state, userStateRefetch };
};

export const useMatchPoolCounts = ({
  gender,
  purpose,
  targetGender,
}: {
  gender: string;
  purpose: string;
  targetGender: string;
}) => {
  const { data: peerCounts } = useQuery(
    [
      "getPool",
      convertGender(gender),
      convertPurpose(purpose),
      convertTargetGender(targetGender, gender),
    ],
    () =>
      fetchGetPool({
        gender: convertGender(gender),
        purpose: convertPurpose(purpose),
        targetGender: convertTargetGender(targetGender, gender),
      }),
    {
      enabled: gender !== "" && purpose !== "" && targetGender !== "",
      select: ({ data }) => [data.major, data.college, data.all],
    }
  );

  return { peerCounts };
};
