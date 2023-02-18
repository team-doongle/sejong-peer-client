export type QuestionProps = {
  title: string;
  choices: string[];
  type: "select" | "input" | "submit" | "select-with-describe";
  imageSrc: string;
};
