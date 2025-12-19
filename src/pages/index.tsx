import Layout from "~/components/Layout";
import AthleteList from "~/containers/AthleteList";
import Head from "next/head";
import EventList from "~/containers/EventList";

const Home: any = () => {
  return (
    <>
      <Head>
        <title>MSC | Эвэнтүүд</title>
      </Head>
      <EventList />
    </>
  );
};

Home.getLayout = (page: React.ReactElement) => (
  <Layout title="Эвэнтүүд">{page}</Layout>
);

export default Home;
