import React from "react";
import Payment from "~/containers/Payment";
import Layout from "~/components/Layout";
import Head from "next/head";

const PaymentPage = () => {
  return (
    <>
      <Head>
        <title>MSC | Төлбөр</title>
      </Head>
      <Payment />
    </>
  );
};

PaymentPage.getLayout = (page: React.ReactElement) => (
  <Layout title="Төлбөр">{page}</Layout>
);

export default PaymentPage;
