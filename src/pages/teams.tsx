import Layout from "~/components/Layout";
import TeamList from "~/containers/TeamList";
import Head from "next/head";

const Teams = () => {
  return (
    <>
      <Head>
        <title>MSC | Багуудын жагсаалт</title>
      </Head>
      <TeamList />
    </>
  );
};

Teams.getLayout = (page: React.ReactElement) => (
  <Layout title="Багуудын жагсаалт">{page}</Layout>
);

export default Teams;
