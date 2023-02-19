import ButtonLogout from "../components/atoms/ButtonLogout";
import Layout from "../components/Layout";
import SelectBoard from "../components/molecules/SelectBoard";
import { HorizonBoardProvider } from "../context/horizonBoardContext";

export default function SelectPage() {
  return (
    <>
      <Layout>
        <ButtonLogout />
        <HorizonBoardProvider>
          <SelectBoard />
        </HorizonBoardProvider>
      </Layout>
    </>
  );
}
