export const genderConstArray = ["MALE", "FEMALE"] as const;
export const purposeConstArray = ["GET_SENIOR", "GET_JUNIOR"] as const;
export const targetGenderConstArray = ["MALE", "FEMALE", "ALL"] as const;
export const targetBoundaryConstArray = ["MAJOR", "COLLEGE", "ALL"] as const;

type Gender = typeof genderConstArray[number];
type Purpose = typeof purposeConstArray[number];
type TargetGender = typeof targetGenderConstArray[number];
type GradeLimit = number;
type StudentNumberLimit = number;
type TargetBoundary = typeof targetBoundaryConstArray[number];
type PhoneNumber = string;

export type FetchGetPoolRequest = {
  gender: Gender;
  purpose: Purpose;
  targetGender: TargetGender;
  gradeLimit: GradeLimit;
  studentNumberLimit: StudentNumberLimit;
};

export type FetchGetPoolResponse = {
  major: number;
  college: number;
  all: number;
};

export type FetchPostPoolRequest = {
  gender: Gender;
  purpose: Purpose;
  targetGender: TargetGender;
  gradeLimit: GradeLimit;
  studentNumberLimit: StudentNumberLimit;
  targetBoundary: TargetBoundary;
  phoneNumber: PhoneNumber;
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
