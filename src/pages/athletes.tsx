import Layout from "~/components/Layout";
import AthleteList from "~/containers/AthleteList";
import Head from "next/head";

const Athletes: any = () => {
  return (
    <>
      <Head>
        <title>MSC | Гишүүд</title>
      </Head>
      <AthleteList />
    </>
  );
};

Athletes.getLayout = (page: React.ReactElement) => (
  <Layout title="Гишүүдийн жагсаалт">{page}</Layout>
);

export default Athletes;
