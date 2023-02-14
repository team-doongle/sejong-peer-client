export type QuestionProps = {
  title: string;
  choices: string[];
  type: "select" | "input" | "submit";
  imageSrc: string;
};
