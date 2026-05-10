import { Helmet } from "react-helmet-async";

export default function SEO({

  title = "Mudrart",

  description = "Premium wall posters and aesthetic artwork from Mudrart.",

  image = "/logo.png",

  url = "https://www.mudrart.in"

}) {

  return (

    <Helmet>

      {/* ===============================
      TITLE
      =============================== */}

      <title>
        {title}
      </title>

      {/* ===============================
      META DESCRIPTION
      =============================== */}

      <meta
        name="description"
        content={description}
      />

      {/* ===============================
      KEYWORDS
      =============================== */}

      <meta
        name="keywords"
        content="
        posters,
        wall posters,
        anime posters,
        aesthetic posters,
        mudrart,
        wall art,
        room decor,
        premium posters,
        india posters
        "
      />

      {/* ===============================
      OPEN GRAPH
      =============================== */}

      <meta
        property="og:type"
        content="website"
      />

      <meta
        property="og:title"
        content={title}
      />

      <meta
        property="og:description"
        content={description}
      />

      <meta
        property="og:image"
        content={image}
      />

      <meta
        property="og:url"
        content={url}
      />

      {/* ===============================
      TWITTER
      =============================== */}

      <meta
        name="twitter:card"
        content="summary_large_image"
      />

      <meta
        name="twitter:title"
        content={title}
      />

      <meta
        name="twitter:description"
        content={description}
      />

      <meta
        name="twitter:image"
        content={image}
      />

      {/* ===============================
      CANONICAL
      =============================== */}

      <link
        rel="canonical"
        href={url}
      />

    </Helmet>

  );

}