import { useEffect } from "react";
import Head from "next/head";
import Router, { useRouter } from "next/router";

// the redirect will only happen on the client-side. This is by design,
const IndexPage: React.FC<{}> = () => {
  let router = useRouter();

  useEffect(() => {
    router.replace("/[type]", "/grocery");
  });
  return (
    <Head>
      <meta name="robots" content="noindex, nofollow" />
    </Head>
  );
};

export default IndexPage;
