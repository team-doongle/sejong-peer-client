import { useQuery } from "react-query";
import {
  fetchGetPool,
  fetchGetUser,
  fetchPostPool,
} from "../../services/apis/match";
import {
  constTypeCheck,
  FetchPostPoolRequest,
  genderConstArray,
  purposeConstArray,
  targetBoundaryConstArray,
  targetGenderConstArray,
} from "../../services/models/matchSchema";

export const useMatchUser = () => {
  const { data: user, refetch: userStateRefetch } = useQuery(
    ["user"],
    fetchGetUser,
    {
      select: ({ data }) => data,
    }
  );

  return { user, userStateRefetch };
};

export const useMatchPoolCounts = ({
  gender,
  purpose,
  targetGender,
  gradeLimit,
  studentNumberLimit,
}: {
  gender: string;
  purpose: string;
  targetGender: string;
  gradeLimit: string;
  studentNumberLimit: string;
}) => {
  const { user } = useMatchUser();
  const { data: peerCounts } = useQuery(
    ["getPool", gender, purpose, targetGender, gradeLimit, studentNumberLimit],
    () =>
      fetchGetPool({
        gender: convertGender(gender),
        purpose: convertPurpose(purpose),
        targetGender: convertTargetGender(targetGender, gender),
        gradeLimit: convertGradeLimit(gradeLimit, user!.grade),
        studentNumberLimit: convertStudentNumberLimit(
          studentNumberLimit,
          user!.studentNumber
        ),
      }),
    {
      enabled:
        gender !== "" &&
        purpose !== "" &&
        targetGender !== "" &&
        gradeLimit !== "" &&
        studentNumberLimit !== "" &&
        !!user,
      select: ({ data }) => [data.major, data.college, data.all],
    }
  );

  return { peerCounts };
};

export const registerPool = async ({
  gender,
  purpose,
  targetGender,
  gradeLimit,
  studentNumberLimit,
  targetBoundary,
  phoneNumber,
  user,
}: {
  gender: string;
  purpose: string;
  targetGender: string;
  gradeLimit: string;
  studentNumberLimit: string;
  targetBoundary: string;
  phoneNumber: string;
  user: { studentNumber: string; grade: string; state: string };
}) => {
  return fetchPostPool({
    gender: convertGender(gender),
    purpose: convertPurpose(purpose),
    targetGender: convertTargetGender(targetGender, gender),
    gradeLimit: convertGradeLimit(gradeLimit, user!.grade),
    studentNumberLimit: convertStudentNumberLimit(
      studentNumberLimit,
      user!.studentNumber
    ),
    targetBoundary: convertTargetBoundary(targetBoundary),
    phoneNumber: convertPhoneNumber(phoneNumber),
  });
};

const convertGender = (gender: string): FetchPostPoolRequest["gender"] => {
  const converted = gender === "남자" ? "MALE" : "FEMALE";
  constTypeCheck(genderConstArray, converted);
  return converted;
};

const convertPurpose = (purpose: string): FetchPostPoolRequest["purpose"] => {
  const converted = purpose === "짝선배 구하기" ? "GET_SENIOR" : "GET_JUNIOR";
  constTypeCheck(purposeConstArray, converted);
  return converted;
};

const convertTargetGender = (
  targetGender: string,
  myGender: string
): FetchPostPoolRequest["targetGender"] => {
  const converted = targetGender === "동성" ? convertGender(myGender) : "ALL";
  constTypeCheck(targetGenderConstArray, converted);
  return converted;
};

const convertGradeLimit = (
  choice: string,
  grade: string
): FetchPostPoolRequest["gradeLimit"] => {
  return Math.abs(Number(choice)) + "";
  // TODO: 타켓 학년 선택시 숫자로 바꿔주는 로직으로 변경하기
  // return Math.abs(Number(choice) - Number(grade)) + "";
};

const convertStudentNumberLimit = (
  choice: string,
  studentNumber: string
): FetchPostPoolRequest["studentNumberLimit"] => {
  return Math.abs(Number(choice)) + "";
  // TODO: 타켓 학번 선택시 숫자로 바꿔주는 로직으로 변경하기
  // return Math.abs(Number(choice) - Number(studentNumber)) + "";
};

const convertTargetBoundary = (
  targetBoundary: string
): FetchPostPoolRequest["targetBoundary"] => {
  const converted =
    targetBoundary === "우리 학과 선베"
      ? "MAJOR"
      : targetBoundary === "우리 단과대 선배"
      ? "COLLEGE"
      : "ALL";
  constTypeCheck(targetBoundaryConstArray, converted);
  return converted;
};

const convertPhoneNumber = (
  phoneNumber: string
): FetchPostPoolRequest["phoneNumber"] => {
  if (!/(010([0-9]{8}))/.test(phoneNumber))
    throw new Error(
      "휴대폰 번호가 올바르지 않습니다.\n 입력하신 정보를 확인해주세요."
    );
  return phoneNumber;
};
