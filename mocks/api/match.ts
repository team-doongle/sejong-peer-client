import { rest } from "msw";

const matchApi = [
  rest.get(
    `${import.meta.env.VITE_BACKEND_URL}/match/pool`,
    (_req, res, ctx) => {
      return res(ctx.json(dummy.poolRes));
    }
  ),
  rest.post(
    `${import.meta.env.VITE_BACKEND_URL}/match/pool`,
    (_req, res, ctx) => {
      return res(ctx.status(200));
    }
  ),
  rest.get(
    `${import.meta.env.VITE_BACKEND_URL}/match/user`,
    (_req, res, ctx) => {
      return res(ctx.json(dummy.userRes));
    }
  ),
  rest.get(
    `${import.meta.env.VITE_BACKEND_URL}/match/break`,
    (_req, res, ctx) => {
      return res(ctx.status(200));
    }
  ),
];

export default matchApi;

const dummy = {
  poolRes: { major: 0, college: 2, all: 99 },
  userRes: { state: "NOT_REGISTER" },
};
