import Layout from "~/components/Layout";
import Head from "next/head";
import RegisterTourney from "~/containers/RegisterTourney";
import React from "react";

const RegisterTourneyPage: any = () => {
  return (
    <>
      <Head>
        <title>MSC | Тэмцээнд бүртгүүлэх</title>
      </Head>
      <RegisterTourney />
    </>
  );
};

RegisterTourneyPage.getLayout = (page: React.ReactElement) => (
  <Layout title="Тэмцээнд бүртгүүлэх">{page}</Layout>
);

export default RegisterTourneyPage;
