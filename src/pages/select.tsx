import styled from "styled-components";
import HeaderLogo from "../components/atoms/HeaderLogo";
import Layout from "../components/Layout";

export default function SelectPage() {
  return (
    <>
      <Layout>
        <HeaderLogo />
      </Layout>
    </>
  );
}

const StyledContainer = styled.div`
  & > img {
    margin-bottom: 114px;
  }
`;
