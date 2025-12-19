import EnforceInfoLayout from "~/components/EnforceInfoLayout";
import Head from "next/head";
import ImageUpload from "~/components/UserInfoForms/ImageUpload";

const Teams: any = () => {
  return (
    <>
      <Head>
        <title>MSC | Бүртгэл</title>
      </Head>
      <ImageUpload />
    </>
  );
};

Teams.getLayout = (page: React.ReactElement) => (
  <EnforceInfoLayout>{page}</EnforceInfoLayout>
);
export default Teams;
