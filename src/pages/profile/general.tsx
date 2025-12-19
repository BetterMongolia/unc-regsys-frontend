import React from "react";
import EditProfileLayout from "~/components/EditProfileLayout";
import Head from "next/head";
import GeneralInfo from "~/containers/Profile/GeneraInfo";

const General = () => {
  return (
    <>
      <Head>
        <title>MSC | Тохиргоо</title>
      </Head>
      <GeneralInfo />
    </>
  );
};

General.getLayout = (page: React.ReactElement) => (
  <EditProfileLayout>{page}</EditProfileLayout>
);

export default General;
