import { fetchGetUser } from "apis/match";
import { json } from "react-router-dom";
import isAuthentificated from "utils/authentificate";

export default async function loadUserState() {
  if (!isAuthentificated()) {
    throw json("", { status: 401 });
  }

  return (await fetchGetUser()).data;
}
