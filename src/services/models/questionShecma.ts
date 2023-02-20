export type QuestionProps = {
  title: string;
  name?: string;
  choices: string[];
  type: "select" | "input" | "submit" | "select-with-describe";
  imageSrc: string;
};
