import { useQuery } from "react-query";
import { fetchGetPool, fetchGetUser, fetchPostPool } from "apis/match";
import { FetchPostPoolRequest } from "apis/match.type";

export type ClientMatchProps = {
  gender: "남자" | "여자" | null;
  purpose: "짝선배 구하기" | "짝후배 구하기" | null;
  targetGender: "동성" | "상관 없음" | null;
  gradeLimit: "1" | "2" | "3" | "4" | "상관 없음" | null;
  studentNumberLimit: "1" | "2" | "3" | "4" | "상관 없음" | null;
  targetBoundary: "나와 같은 학과" | "나와 같은 단과대" | "상관 없음" | null;
  phoneNumber: string | null;
  kakaoId: string | null;
  result: null;
};

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
  gender: ClientMatchProps["gender"] | null;
  purpose: ClientMatchProps["purpose"] | null;
  targetGender: ClientMatchProps["targetGender"] | null;
  gradeLimit: ClientMatchProps["gradeLimit"] | null;
  studentNumberLimit: ClientMatchProps["studentNumberLimit"] | null;
}) => {
  const { data: peerCounts } = useQuery(
    ["getPool", gender, purpose, targetGender, gradeLimit, studentNumberLimit],
    () =>
      fetchGetPool({
        gender: convertData.gender(gender!),
        purpose: convertData.purpose(purpose!),
        targetGender: convertData.targetGender(
          targetGender!,
          convertData.gender(gender!)
        ),
        gradeLimit: convertData.gradeLimit(gradeLimit!),
        studentNumberLimit: convertData.studentNumberLimit(studentNumberLimit!),
      }),
    {
      enabled:
        !!gender &&
        !!purpose &&
        !!targetGender &&
        !!gradeLimit &&
        !!studentNumberLimit,
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
  kakaoId,
}: ClientMatchProps) => {
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
    kakaoId: convertData.kakaoId(kakaoId),
  });
};

const convertData = {
  gender: (
    gender: ClientMatchProps["gender"]
  ): FetchPostPoolRequest["gender"] => {
    switch (gender) {
      case "남자":
        return "MALE";
      case "여자":
        return "FEMALE";
      default:
        throw new Error(`wrong type : gender ${gender}`);
    }
  },
  purpose: (
    purpose: ClientMatchProps["purpose"]
  ): FetchPostPoolRequest["purpose"] => {
    switch (purpose) {
      case "짝선배 구하기":
        return "GET_SENIOR";
      case "짝후배 구하기":
        return "GET_JUNIOR";
      default:
        throw new Error(`wrong type : purpose ${purpose}`);
    }
  },
  targetGender: (
    targetGender: ClientMatchProps["targetGender"],
    myGender: FetchPostPoolRequest["gender"]
  ): FetchPostPoolRequest["targetGender"] => {
    switch (targetGender) {
      case "동성":
        return myGender;
      case "상관 없음":
        return "ALL";
      default:
        throw new Error(`wrong type : targetGender ${targetGender}`);
    }
  },
  gradeLimit: (
    gradeLimit: ClientMatchProps["gradeLimit"]
  ): FetchPostPoolRequest["gradeLimit"] => {
    switch (gradeLimit) {
      case "1":
        return 1;
      case "2":
        return 2;
      case "3":
        return 3;
      case "4":
        return 4;
      case "상관 없음":
        return 99;
      default:
        throw new Error(`wrong type : gradeLimit ${gradeLimit}`);
    }
  },
  studentNumberLimit: (
    studentNumberLimit: ClientMatchProps["studentNumberLimit"]
  ): FetchPostPoolRequest["studentNumberLimit"] => {
    switch (studentNumberLimit) {
      case "1":
        return 1;
      case "2":
        return 2;
      case "3":
        return 3;
      case "4":
        return 4;
      case "상관 없음":
        return 99;
      default:
        throw new Error(
          `wrong type : studentNumberLimit ${studentNumberLimit}`
        );
    }
  },

  targetBoundary: (
    targetBoundary: ClientMatchProps["targetBoundary"]
  ): FetchPostPoolRequest["targetBoundary"] => {
    switch (targetBoundary) {
      case "나와 같은 학과":
        return "MAJOR";
      case "나와 같은 단과대":
        return "COLLEGE";
      case "상관 없음":
        return "ALL";
      default:
        throw new Error(`wrong type : targetBoundary ${targetBoundary}`);
    }
  },

  phoneNumber: (
    phoneNumber: ClientMatchProps["phoneNumber"]
  ): FetchPostPoolRequest["phoneNumber"] => {
    if (!phoneNumber || !/(010([0-9]{8}))/.test(phoneNumber))
      throw new Error(
        "휴대폰 번호가 올바르지 않습니다.\n 입력하신 정보를 확인해주세요."
      );
    return phoneNumber;
  },
  kakaoId: (
    kakaoId: ClientMatchProps["kakaoId"]
  ): FetchPostPoolRequest["kakaoId"] => {
    if (!kakaoId)
      throw new Error(
        "카카오 아이디가 올바르지 않습니다.\n 입력하신 정보를 확인해주세요."
      );
    return kakaoId;
  },
};

// const convertDataReverse = {
//   gender: (
//     gender: FetchPostPoolRequest["gender"]
//   ): ClientMatchProps["gender"] => {
//     switch (gender) {
//       case "MALE":
//         return "남자";
//       case "FEMALE":
//         return "여자";
//       default:
//         throw new Error(`wrong type : gender ${}`);
//     }
//   },
//   purpose: (
//     purpose: ClientMatchProps["purpose"]
//   ): FetchPostPoolRequest["purpose"] => {
//     switch (purpose) {
//       case "짝선배 구하기":
//         return "GET_SENIOR";
//       case "짝후배 구하기":
//         return "GET_JUNIOR";
//       default:
//         throw new Error(`wrong type : purpose ${}`);
//     }
//   },
//   targetGender: (
//     targetGender: ClientMatchProps["targetGender"],
//     myGender: FetchPostPoolRequest["gender"]
//   ): FetchPostPoolRequest["targetGender"] => {
//     switch (targetGender) {
//       case "동성":
//         return myGender;
//       case "상관 없음":
//         return "ALL";
//       default:
//         throw new Error(`wrong type : targetGender ${}`);
//     }
//   },
//   gradeLimit: (
//     gradeLimit: ClientMatchProps["gradeLimit"]
//   ): FetchPostPoolRequest["gradeLimit"] => {
//     switch (gradeLimit) {
//       case "1":
//         return 1;
//       case "2":
//         return 2;
//       case "3":
//         return 3;
//       case "4":
//         return 4;
//       case "상관 없음":
//         return 99;
//       default:
//         throw new Error(`wrong type : gradeLimit ${}`);
//     }
//   },
//   studentNumberLimit: (
//     studentNumberLimit: ClientMatchProps["studentNumberLimit"]
//   ): FetchPostPoolRequest["studentNumberLimit"] => {
//     switch (studentNumberLimit) {
//       case "1":
//         return 1;
//       case "2":
//         return 2;
//       case "3":
//         return 3;
//       case "4":
//         return 4;
//       case "상관 없음":
//         return 99;
//       default:
//         throw new Error(`wrong type : studentNumberLimit ${}`);
//     }
//   },

//   targetBoundary: (
//     targetBoundary: ClientMatchProps["targetBoundary"]
//   ): FetchPostPoolRequest["targetBoundary"] => {
//     switch (targetBoundary) {
//       case "나와 같은 학과":
//         return "MAJOR";
//       case "나와 같은 단과대":
//         return "COLLEGE";
//       case "상관 없음":
//         return "ALL";
//       default:
//         throw new Error(`wrong type : targetBoundary ${}`);
//     }
//   },

//   phoneNumber: (phoneNumber: string): FetchPostPoolRequest["phoneNumber"] => {
//     if (!/(010([0-9]{8}))/.test(phoneNumber))
//       throw new Error(
//         "휴대폰 번호가 올바르지 않습니다.\n 입력하신 정보를 확인해주세요."
//       );
//     return phoneNumber;
//   },
// };
