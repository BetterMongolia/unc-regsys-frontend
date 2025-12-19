import Head from "next/head";
import General from "~/components/UserInfoForms/General";
import Layout from "~/components/Layout";

const UserInfo: any = () => {
  return (
    <>
      <Head>
        <title>MSC | Бүртгэл</title>
      </Head>
      <General />
    </>
  );
};

UserInfo.getLayout = (page: React.ReactElement) => (
  <Layout title="Хувийн мэдээлэл">{page}</Layout>
);

export default UserInfo;
