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
    title: "학우님의 성별을 선택해주세요.",
    name: "본인 성별",
    choices: ["남자", "여자"],
    type: "select",
    imageSrc: "/assets/character/1.jpg",
  },
  {
    title: "원하시는 기능을 선택해주세요.",
    name: "기능",
    choices: ["짝선배 구하기", "짝후배 구하기"],
    type: "select",
    imageSrc: "/assets/character/2.jpg",
  },
  {
    title: "같은 성별의 짝을 원하시나요?",
    name: "짝 성별",
    choices: ["동성", "상관 없음"],
    type: "select",
    imageSrc: "/assets/character/4.jpg",
  },
  {
    title:
      "짝의 학년 범위를 설정해주세요.\n*본인학년이 1학년일 때\n선택 범위 2 선택시 최대 3학년과 매칭",
    name: "짝 학년 범위",
    choices: [],
    type: "range",
    imageSrc: "/assets/character/5.jpg",
  },
  {
    title:
      "짝의 학번 범위를 설정해주세요.\n*본인학번이 23학번일 때\n선택 범위 2 선택시 최대 21학번과 매칭",
    name: "짝 학번 범위",
    choices: [],
    type: "range",
    imageSrc: "/assets/character/3.jpg",
  },
  {
    title: "어떤 범위에서 찾길 원하시나요?",
    name: "짝 탐색 범위",
    choices: ["나와 같은 학과", "나와 같은 단과대", "상관 없음"],
    type: "select-with-describe",
    imageSrc: "/assets/character/4.jpg",
  },
  {
    title: "매칭 결과를 안내받을 전화번호를 입력해주세요",
    name: "결과 전송 받을 전화번호",
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
