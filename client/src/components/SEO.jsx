import { Helmet } from "react-helmet-async";

export default function SEO({

  title = "Mudrart | Premium Wall Posters & Room Decor",

  description = "Mudrart is India's premium wall poster and aesthetic room decor platform offering anime posters, car posters, motivational artwork, spiritual posters, split posters, polaroids and modern wall art for bedrooms, gaming setups and creative spaces.",

  image = "https://www.mudrart.in/logo.png",

  url = "https://www.mudrart.in"

}) {

  /* ======================================
     ORGANIZATION SCHEMA
  ====================================== */

  const organizationSchema = {

    "@context": "https://schema.org",

    "@type": "Organization",

    name: "Mudrart",

    url: "https://www.mudrart.in",

    logo: "https://www.mudrart.in/logo.png",

    description:
      "Mudrart is India's premium wall poster and aesthetic room decor platform offering anime posters, motivational posters, spiritual artwork, split posters, gaming room posters and modern wall art.",

    sameAs: [

      "https://www.instagram.com/mudrart.in"

    ]

  };

  return (

    <Helmet>

      {/* ======================================
         PRIMARY META
      ====================================== */}

      <title>
        {title}
      </title>

      <meta
        name="description"
        content={description}
      />

      {/* ======================================
         SEO KEYWORDS
      ====================================== */}

      <meta
        name="keywords"
        content="
        mudrart,
        mudrart posters,
        anime posters india,
        aesthetic wall posters,
        room decor india,
        wall art india,
        car posters,
        spiritual posters,
        motivational posters,
        split posters,
        gaming room decor,
        premium posters india,
        modern wall art,
        bedroom posters,
        wall posters online
        "
      />

      {/* ======================================
         ROBOTS
      ====================================== */}

      <meta
        name="robots"
        content="
        index,
        follow,
        max-image-preview:large,
        max-snippet:-1,
        max-video-preview:-1
        "
      />

      {/* ======================================
         CANONICAL
      ====================================== */}

      <link
        rel="canonical"
        href={url}
      />

      {/* ======================================
         FAVICON
      ====================================== */}

      <link
        rel="icon"
        type="image/png"
        href="/logo.png"
      />

      <link
        rel="apple-touch-icon"
        href="/logo.png"
      />

      {/* ======================================
         OPEN GRAPH
      ====================================== */}

      <meta
        property="og:type"
        content="website"
      />

      <meta
        property="og:site_name"
        content="Mudrart"
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

      {/* ======================================
         TWITTER
      ====================================== */}

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

      {/* ======================================
         THEME
      ====================================== */}

      <meta
        name="theme-color"
        content="#000000"
      />

      {/* ======================================
         ORGANIZATION SCHEMA
      ====================================== */}

      <script type="application/ld+json">

        {JSON.stringify(organizationSchema)}

      </script>

    </Helmet>

  );

}