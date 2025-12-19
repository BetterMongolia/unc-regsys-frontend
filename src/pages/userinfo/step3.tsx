import EnforceInfoLayout from "~/components/EnforceInfoLayout";
import Head from "next/head";
import SportInfo from "~/components/UserInfoForms/SportInfo";

const Teams: any = () => {
  return (
    <>
      <Head>
        <title>MSC | Бүртгэл</title>
      </Head>
      <SportInfo />
    </>
  );
};

Teams.getLayout = (page: React.ReactElement) => (
  <EnforceInfoLayout>{page}</EnforceInfoLayout>
);

export default Teams;
