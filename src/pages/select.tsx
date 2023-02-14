import Layout from "../components/Layout";
import QuestionContainer from "../components/slider/components/QuestionContainer";
import { questions } from "../services/static/questions";

export default function SelectPage() {
  return (
    <>
      <Layout>
        <QuestionContainer questions={questions}></QuestionContainer>
      </Layout>
    </>
  );
}
