import type { NextPage } from "next";
import Head from "next/head";
import Login from "~/containers/Login";

const LoginPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>MSC | Нэвтрэх</title>
      </Head>
      <Login />
    </>
  );
};

export default LoginPage;
