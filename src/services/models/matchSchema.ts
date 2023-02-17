export type FetchGetPoolRequest = {
  gender: string;
  purpose: string;
  targetGender: string;
};

export type FetchGetPoolResponse = {
  major: number;
  college: number;
  all: number;
};

export type FetchPostPoolRequest = {
  gender: string;
  purpose: string;
  targetGender: string;
  phoneNumber: string;
};

export type FetchGetUserResponse = {
  state: "NOT_REGISTER" | "ON_GOING" | "DONE";
};
