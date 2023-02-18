import Layout from "../components/Layout";
import SelectBoard from "../components/molecules/SelectBoard";
import { HorizonBoardProvider } from "../context/horizonBoardContext";

export default function SelectPage() {
  return (
    <>
      <Layout>
        <HorizonBoardProvider>
          <SelectBoard />
        </HorizonBoardProvider>
      </Layout>
    </>
  );
}
