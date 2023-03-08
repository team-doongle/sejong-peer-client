import { ClientMatchProps } from "./MatchingState.SelectBoard.api";

export const questions: {
  title: string;
  name: string;
  choices: string[];
  type:
    | "select"
    | "input"
    | "submit"
    | "select-with-describe"
    | "range"
    | "input-id";
  imageSrc: string;
  key: keyof ClientMatchProps | "result";
}[] = [
  {
    title: "학우님의 성별을 선택해주세요.",
    name: "본인 성별",
    choices: ["남자", "여자"],
    type: "select",
    imageSrc: "/assets/character/1.jpg",
    key: "gender",
  },
  {
    title: "원하시는 기능을 선택해주세요.",
    name: "기능",
    choices: ["짝선배 구하기", "짝후배 구하기"],
    type: "select",
    imageSrc: "/assets/character/2.jpg",
    key: "purpose",
  },
  {
    title: "같은 성별의 짝을 원하시나요?",
    name: "짝 성별",
    choices: ["동성", "상관 없음"],
    type: "select",
    imageSrc: "/assets/character/3.jpg",
    key: "targetGender",
  },
  {
    title: "나와의 학년 차이는 최대 얼마까지 허용하시나요?",
    name: "학년 차이 허용 범위",
    choices: [],
    type: "range",
    imageSrc: "/assets/character/4.jpg",
    key: "gradeLimit",
  },
  {
    title: "나와의 학번 차이는 최대 얼마까지 허용하시나요?",
    name: "학번 차이 허용 범위",
    choices: [],
    type: "range",
    imageSrc: "/assets/character/5.jpg",
    key: "studentNumberLimit",
  },
  {
    title: "어떤 범위에서 찾길 원하시나요?",
    name: "짝 탐색 범위",
    choices: ["나와 같은 학과", "나와 같은 단과대", "상관 없음"],
    type: "select-with-describe",
    imageSrc: "/assets/character/6.jpg",
    key: "targetBoundary",
  },
  {
    title: "매칭 결과를 안내받을 전화번호를 입력해주세요",
    name: "결과 전송 받을 전화번호",
    choices: [],
    type: "input",
    imageSrc: "/assets/character/7.jpg",
    key: "phoneNumber",
  },
  {
    title: "짝에게 전달될 카카오톡 아이디를 입력해주세요",
    name: "카카오톡 아이디",
    choices: [],
    type: "input-id",
    imageSrc: "/assets/character/8.jpg",
    key: "kakaoId",
  },
  {
    title: "입력하신 정보를 확인해주세요",
    name: "결과 확인",
    choices: [],
    type: "submit",
    imageSrc: "/assets/character/9.jpg",
    key: "result",
  },
];
