import { DOMAIN } from "@/lib/constants";
import Head from "next/head";

export type MetaProps = {
  title?: string;
  description?: string;
  image?: string;
};

const Meta: React.FC<MetaProps> = ({
  title = "Mes Notes",
  description = "Mes Notes is an application for your daily notes.",
  image = `${DOMAIN}/api/og`,
}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.ico" />

      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta itemProp="image" content={image} />
      <meta property="og:logo" content={`${DOMAIN}/logo.png`}></meta>
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@imturhansel" />
      <meta name="twitter:creator" content="@imturhansel" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Head>
  );
};

export default Meta;
