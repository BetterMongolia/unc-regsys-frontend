import React from "react";
import EditProfileLayout from "~/components/EditProfileLayout";
import Head from "next/head";
import PasswordChange from "~/containers/Profile/PasswordChange";

const Password = () => {
  return (
    <>
      <Head>
        <title>MSC | Нууц үг</title>
      </Head>
      <PasswordChange />
    </>
  );
};

Password.getLayout = (page: React.ReactElement) => (
  <EditProfileLayout>{page}</EditProfileLayout>
);

export default Password;
