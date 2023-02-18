export const genderConstArray = ["MALE", "FEMALE"] as const;
export const purposeConstArray = ["GET_SENIOR", "GET_JUNIOR"] as const;
export const targetGenderConstArray = ["MALE", "FEMALE", "ALL"] as const;
export const targetBoundaryConstArray = ["MAJOR", "COLLEGE", "ALL"] as const;

export type FetchGetPoolRequest = {
  gender: typeof genderConstArray[number];
  purpose: typeof purposeConstArray[number];
  targetGender: typeof targetGenderConstArray[number];
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
  targetBoundary: typeof targetBoundaryConstArray[number];
  phoneNumber: string;
};

export function constTypeCheck(constArray: any, value: any) {
  return Object.values(constArray).includes(value);
}

export type FetchGetUserResponse = {
  state: "NOT_REGISTER" | "ON_GOING" | "DONE";
};
