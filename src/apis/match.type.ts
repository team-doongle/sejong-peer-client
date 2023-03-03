export type FetchPostPoolRequest = {
  gender: "MALE" | "FEMALE";
  purpose: "GET_SENIOR" | "GET_JUNIOR";
  targetGender: "MALE" | "FEMALE" | "ALL";
  gradeLimit: 1 | 2 | 3 | 4 | 99;
  studentNumberLimit: 1 | 2 | 3 | 4 | 99;
  targetBoundary: "MAJOR" | "COLLEGE" | "ALL";
  phoneNumber: string; // 01012341234
  kakaoId: string;
};

export type FetchGetPoolRequest = Omit<
  FetchPostPoolRequest,
  "targetBoundary" | "phoneNumber" | "kakaoId"
>;

export type FetchGetPoolResponse = {
  major: number;
  college: number;
  all: number;
};

export type FetchGetUserResponse = {
  state: "NOT_REGISTER" | "ON_GOING" | "DONE";
  grade: string;
  studentNumber: string;
  unblockTime: Date;
  matchedTime: Date;
  yellowCard: number;
} & FetchPostPoolRequest;
