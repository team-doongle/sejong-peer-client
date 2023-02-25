export type QuestionProps = {
  title: string;
  name?: string;
  choices: string[];
  type: "select" | "input" | "submit" | "select-with-describe" | "range";
  imageSrc: string;
};
