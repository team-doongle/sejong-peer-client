export type FetchLoginRequest = {
  id: string;
  pw: string;
};

export type FetchLoginResponse = {
  accessToken: string;
};

export type FetchRefresh = {
  accessToken: string;
};
