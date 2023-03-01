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
  const { data: peerCounts } = useQuery(
    ["getPool", gender, purpose, targetGender, gradeLimit, studentNumberLimit],
    () =>
      fetchGetPool({
        gender: convertData.gender(gender),
        purpose: convertData.purpose(purpose),
        targetGender: convertData.targetGender(
          targetGender,
          convertData.gender(gender)
        ),
        gradeLimit: convertData.gradeLimit(gradeLimit),
        studentNumberLimit: convertData.studentNumberLimit(studentNumberLimit),
      }),
    {
      enabled:
        gender !== "" &&
        purpose !== "" &&
        targetGender !== "" &&
        gradeLimit !== "" &&
        studentNumberLimit !== "",
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
}: {
  gender: string;
  purpose: string;
  targetGender: string;
  gradeLimit: string;
  studentNumberLimit: string;
  targetBoundary: string;
  phoneNumber: string;
}) => {
  return fetchPostPool({
    gender: convertData.gender(gender),
    purpose: convertData.purpose(purpose),
    targetGender: convertData.targetGender(
      targetGender,
      convertData.gender(gender)
    ),
    gradeLimit: convertData.gradeLimit(gradeLimit),
    studentNumberLimit: convertData.studentNumberLimit(studentNumberLimit),
    targetBoundary: convertData.targetBoundary(targetBoundary),
    phoneNumber: convertData.phoneNumber(phoneNumber),
  });
};

const convertData = {
  gender: (gender: string): FetchPostPoolRequest["gender"] => {
    const converted = gender === "남자" ? "MALE" : "FEMALE";
    constTypeCheck(genderConstArray, converted);
    return converted;
  },
  purpose: (purpose: string): FetchPostPoolRequest["purpose"] => {
    const converted = purpose === "짝선배 구하기" ? "GET_SENIOR" : "GET_JUNIOR";
    constTypeCheck(purposeConstArray, converted);
    return converted;
  },
  targetGender: (
    targetGender: string,
    myGender: FetchPostPoolRequest["gender"]
  ): FetchPostPoolRequest["targetGender"] => {
    const converted = targetGender === "동성" ? myGender : "ALL";
    constTypeCheck(targetGenderConstArray, converted);
    return converted;
  },
  gradeLimit: (choice: string): FetchPostPoolRequest["gradeLimit"] => {
    return choice === "상관없음" ? 99 : Number(choice);
  },
  studentNumberLimit: (
    choice: string
  ): FetchPostPoolRequest["studentNumberLimit"] => {
    return choice === "상관없음" ? 99 : Number(choice);
  },

  targetBoundary: (
    targetBoundary: string
  ): FetchPostPoolRequest["targetBoundary"] => {
    const converted =
      targetBoundary === "나와 같은 학과"
        ? "MAJOR"
        : targetBoundary === "나와 같은 단과대"
        ? "COLLEGE"
        : "ALL";
    constTypeCheck(targetBoundaryConstArray, converted);
    return converted;
  },

  phoneNumber: (phoneNumber: string): FetchPostPoolRequest["phoneNumber"] => {
    if (!/(010([0-9]{8}))/.test(phoneNumber))
      throw new Error(
        "휴대폰 번호가 올바르지 않습니다.\n 입력하신 정보를 확인해주세요."
      );
    return phoneNumber;
  },
};
