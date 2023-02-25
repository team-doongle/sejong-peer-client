export const genderConstArray = ["MALE", "FEMALE"] as const;
export const purposeConstArray = ["GET_SENIOR", "GET_JUNIOR"] as const;
export const targetGenderConstArray = ["MALE", "FEMALE", "ALL"] as const;
export const targetBoundaryConstArray = ["MAJOR", "COLLEGE", "ALL"] as const;

export type FetchGetPoolRequest = {
  gender: typeof genderConstArray[number];
  purpose: typeof purposeConstArray[number];
  targetGender: typeof targetGenderConstArray[number];
  gradeLimit: string;
  studentNumberLimit: string;
};

export type FetchGetPoolResponse = {
  major: number;
  college: number;
  all: number;
};

export type FetchPostPoolRequest = {
  gender: typeof genderConstArray[number];
  purpose: typeof purposeConstArray[number];
  targetGender: typeof targetGenderConstArray[number];
  gradeLimit: string;
  studentNumberLimit: string;
  targetBoundary: typeof targetBoundaryConstArray[number];
  phoneNumber: string;
};

export function constTypeCheck(constArray: any, value: any) {
  if (!Object.values(constArray).includes(value)) {
    console.error(constArray);
    throw new Error(
      `잘못된 입력입니다.\n 입력하신 정보를 확인해주세요.\n잘못된 입력:${value}`
    );
  }
}

export type FetchGetUserResponse = {
  state: "NOT_REGISTER" | "ON_GOING" | "DONE";
  grade: string;
  studentNumber: string;
};
