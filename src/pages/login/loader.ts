import { path } from "pages/router";
import { redirect } from "react-router-dom";
import isAuthentificated from "utils/authentificate";

export default async function loadCheckAuthed() {
  if (isAuthentificated()) throw redirect(path.lobby);
  return null;
}
