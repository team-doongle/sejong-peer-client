export type FetchGetPoolRequest = {
  gender: "MALE" | "FEMALE";
  purpose: "GET_SENIOR" | "GET_JUNIOR";
  targetGender: "MALE" | "FEMALE" | "ALL";
};

export type FetchGetPoolResponse = {
  major: number;
  college: number;
  all: number;
};

export type FetchPostPoolRequest = {
  gender: "MALE" | "FEMALE";
  purpose: "GET_SENIOR" | "GET_JUNIOR";
  targetGender: "MALE" | "FEMALE" | "ALL";
  targetBoundary: "MAJOR" | "COLLEGE" | "ALL";
  phoneNumber: string;
};

export type FetchGetUserResponse = {
  state: "NOT_REGISTER" | "ON_GOING" | "DONE";
};
