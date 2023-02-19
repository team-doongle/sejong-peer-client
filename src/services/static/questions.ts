import { QuestionProps } from "../models/questionShecma";
import {
  FetchPostPoolRequest,
  constTypeCheck,
  genderConstArray,
  purposeConstArray,
  targetGenderConstArray,
  targetBoundaryConstArray,
} from "../../services/models/matchSchema";

export const questions: QuestionProps[] = [
  {
    title: "학우님의 성별을 선택해주세요",
    choices: ["남자", "여자"],
    type: "select",
    imageSrc: "/assets/character/1.jpg",
  },
  {
    title: "원하는 기능을 선택해주세요",
    choices: ["짝선배 구하기", "짝후배 구하기"],
    type: "select",
    imageSrc: "/assets/character/2.jpg",
  },
  {
    title: "같은 성별의 짝을 원하시나요?",
    choices: ["동성", "상관 없음"],
    type: "select",
    imageSrc: "/assets/character/3.jpg",
  },
  {
    title: "어떤 짝을 원하시나요?",
    choices: ["우리 학과 선배", "우리 단과대 선배", "상관 없음"],
    type: "select-with-describe",
    imageSrc: "/assets/character/4.jpg",
  },
  {
    title: "매칭 결과를 안내받을 전화번호를 입력해주세요",
    choices: [],
    type: "input",
    imageSrc: "/assets/character/5.jpg",
  },
  {
    title: "입력하신 정보를 확인해주세요",
    choices: [],
    type: "submit",
    imageSrc: "/assets/character/6.jpg",
  },
];

export const convertGender = (prop: string): FetchPostPoolRequest["gender"] =>
  prop === "남자" ? "MALE" : "FEMALE";
export const convertPurpose = (prop: string): FetchPostPoolRequest["purpose"] =>
  prop === "짝선배 구하기" ? "GET_SENIOR" : "GET_JUNIOR";
export const convertTargetGender = (
  prop: string,
  gender: string
): FetchPostPoolRequest["targetGender"] =>
  prop === "동성" ? convertGender(gender) : "ALL";
export const convertTargetBoundary = (
  prop: string
): FetchPostPoolRequest["targetBoundary"] =>
  prop === "우리 학과 선베"
    ? "MAJOR"
    : prop === "우리 단과대 선배"
    ? "COLLEGE"
    : "ALL";
export const convertPhoneNumber = (
  prop: string
): FetchPostPoolRequest["phoneNumber"] => prop;

export function convertAnswer(answers: any) {
  const gender = convertGender(answers[0]);
  const purpose = convertPurpose(answers[1]);
  const targetGender = convertTargetGender(answers[2], answers[0]);
  const targetBoundary = convertTargetBoundary(answers[3]);
  const phoneNumber = convertPhoneNumber(answers[4]);
  const checkValid = () => {
    return (
      constTypeCheck(genderConstArray, gender) &&
      constTypeCheck(purposeConstArray, purpose) &&
      constTypeCheck(targetGenderConstArray, targetGender) &&
      constTypeCheck(targetBoundaryConstArray, targetBoundary) &&
      /(010([0-9]{8}))/.test(phoneNumber)
    );
  };
  if (!checkValid())
    throw new Error("잘못된 응답이 있습니다.\n 입력하신 정보를 확인해주세요.");
  return {
    gender,
    purpose,
    targetGender,
    targetBoundary,
    phoneNumber,
  };
}
