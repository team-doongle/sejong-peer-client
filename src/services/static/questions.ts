import { FetchPostPoolRequest } from "../models/matchSchema";
import { QuestionProps } from "../models/questionShecma";

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
    type: "select",
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

export function makeAnswer(answers: any) {
  const getGender = (): FetchPostPoolRequest["gender"] =>
    answers[0] === "남자" ? "MALE" : "FEMALE";
  const getPurpose = (): FetchPostPoolRequest["purpose"] =>
    answers[1] === "짝선배 구하기" ? "GET_SENIOR" : "GET_JUNIOR";
  const getTargetGender = (): FetchPostPoolRequest["targetGender"] =>
    answers[2] === "동성" ? getGender() : "ALL";
  const getTargetBoundary = (): FetchPostPoolRequest["targetBoundary"] =>
    answers[3] === "우리 학과 선베"
      ? "MAJOR"
      : answers[3] === "우리 단과대 선배"
      ? "COLLEGE"
      : "ALL";
  const getPhoneNumber = (): FetchPostPoolRequest["phoneNumber"] => answers[4];
  return {
    gender: getGender(),
    purpose: getPurpose(),
    targetGender: getTargetGender(),
    targetBoundary: getTargetBoundary(),
    phoneNumber: getPhoneNumber(),
  };
}
