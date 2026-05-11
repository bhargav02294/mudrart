import { Helmet } from "react-helmet-async";

export default function SEO({

  title = "Mudrart | Premium Wall Posters & Room Decor",

  description = "Mudrart is India's premium wall poster and aesthetic room decor platform offering anime posters, car posters, motivational artwork, spiritual posters, split posters, polaroids and modern wall art for bedrooms, gaming setups and creative spaces.",

  image = "https://www.mudrart.in/logo.png",

  url = "https://www.mudrart.in",

  schema = null

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

    image: "https://www.mudrart.in/logo.png",

    description:
      "Mudrart is India's premium wall poster and aesthetic room decor platform offering anime posters, motivational posters, spiritual artwork, split posters, gaming room posters and modern wall art.",

    sameAs: [
      "https://www.instagram.com/mudrart.in"
    ]

  };

  /* ======================================
     WEBSITE SCHEMA
  ====================================== */

  const websiteSchema = {

    "@context": "https://schema.org",

    "@type": "WebSite",

    name: "Mudrart",

    url: "https://www.mudrart.in",

    potentialAction: {

      "@type": "SearchAction",

      target:
        "https://www.mudrart.in/posters/single?search={search_term_string}",

      "query-input":
        "required name=search_term_string"

    }

  };

  return (

    <Helmet>

      {/* ======================================
         PRIMARY META
      ====================================== */}

      <title>{title}</title>

      <meta
        name="description"
        content={description}
      />

      {/* ======================================
         KEYWORDS
      ====================================== */}

      <meta
        name="keywords"
        content="
        mudrart,
        anime posters india,
        wall posters india,
        aesthetic room decor,
        modern wall art,
        gaming room posters,
        premium posters,
        spiritual posters,
        motivational posters,
        bedroom wall decor,
        split posters,
        polaroid posters,
        anime wall art,
        car posters india,
        movie posters india
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

      <meta property="og:type" content="website" />

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
         MOBILE THEME
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

      {/* ======================================
         WEBSITE SCHEMA
      ====================================== */}

      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>

      {/* ======================================
         DYNAMIC PAGE SCHEMA
      ====================================== */}

      {

        schema && (

          <script type="application/ld+json">

            {JSON.stringify(schema)}

          </script>

        )

      }

    </Helmet>

  );

}