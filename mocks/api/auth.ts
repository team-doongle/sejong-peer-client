import { rest } from "msw";

const authApi = [
  rest.post(
    `${import.meta.env.VITE_BACKEND_URL}/auth/login`,
    (_req, res, ctx) => {
      return res(ctx.json(dummy.loginRes));
    }
  ),
  rest.get(
    `${import.meta.env.VITE_BACKEND_URL}/auth/refresh`,
    (_req, res, ctx) => {
      return res(ctx.json(dummy.refreshRes));
    }
  ),
  rest.get(
    `${import.meta.env.VITE_BACKEND_URL}/auth/logout`,
    (_req, res, ctx) => {
      return res(ctx.status(200));
    }
  ),
];

export default authApi;

const dummy = {
  loginRes: { accessToken: "temp token" },
  refreshRes: { accsessToken: "temp token" },
};
