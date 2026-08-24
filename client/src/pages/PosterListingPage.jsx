import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import PosterCard from "../components/PosterCard";

import OfferSlider from "../components/OfferSlider";

import SEO from "../components/SEO";

import "../styles/posterListing.css";

export default function PosterListingPage({ type }) {

  const { category, collection, count } = useParams();

  const [posters, setPosters] = useState([]);

  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);

  const ITEMS_PER_PAGE = 20;

  /* ======================================
     COLLECTION MAP
  ====================================== */

  const collectionMap = {

  /* HOME PAGE COLLECTIONS */

  trending: null,

  room: [
    "aesthetic",
    "cars",
    "anime",
    "motivational"
  ],

  motivational: [
    "motivational"
  ],

  spiritual: [
    "spiritual",
    "divine",
    "devotional"
  ],

  cinema: [
    "bollywood",
    "movie_posters",
    "actors",
    "pop_culture"
  ],

  fan: [
    "anime",
    "cricket",
    "football",
    "marvel_dc"
  ],

  /* CATEGORY SECTION */

  entertainment: [
    "bollywood",
    "actors",
    "movie_posters",
    "pop_culture"
  ],

  superheroes: [
    "marvel_dc"
  ],

  sports: [
    "sports",
    "football",
    "cricket"
  ],

  lifestyle: [
    "cars",
    "gym"
  ],

  aestheticworld: [
    "aesthetic",
    "aesthetic_texts",
    "motivational"
  ],

  spiritualworld: [
    "spiritual",
    "divine",
    "devotional"
  ],

  animeworld: [
    "anime",
    "nature",
    "legends",
    "icons"
  ],

  /* NAVBAR COLLECTIONS */

  cars: [
    "cars"
  ],

  anime: [
    "anime"
  ],

  cricket: [
    "cricket"
  ],

  bollywood: [
    "bollywood",
    "actors",
    "movie_posters",
    "pop_culture"
  ],

  movies: [
    "movie_posters",
    "actors",
    "bollywood"
  ],

  more: [
    "nature",
    "icons",
    "legends",
    "gym"
  ]

};

  /* ======================================
     FETCH POSTERS
  ====================================== */

  useEffect(() => {

    const fetchData = async () => {

      try {

        setLoading(true);

        const res = await fetch("/api/posters");

        /* ======================================
           SAFETY CHECK
        ====================================== */

        if (!res.ok) {

          throw new Error("API FAILED");

        }

        const data = await res.json();

        /* ======================================
           ARRAY SAFETY
        ====================================== */

        if (!Array.isArray(data)) {

          setPosters([]);

          setLoading(false);

          return;

        }

        let filtered = [...data];

        /* ======================================
           CATEGORY FILTER
        ====================================== */

        if (type === "category") {

          filtered = data.filter(

            (p) =>

              p.category?.toLowerCase()

              ===

              category?.toLowerCase()

          );

        }

        /* ======================================
           COLLECTION FILTER
        ====================================== */

        if (type === "collection") {

          const allowedCategories =
            collectionMap[collection];

          if (allowedCategories) {

            filtered = data.filter((p) =>

              allowedCategories.includes(

                p.category?.toLowerCase()

              )

            );

          }

        }

        /* ======================================
           SINGLE POSTERS
        ====================================== */

        if (type === "single") {

          filtered = data.filter(

            (p) =>
              p.productType === "single"

          );

        }

        /* ======================================
           SPLIT SETS
        ====================================== */

        if (type === "set") {

          filtered = data.filter(

            (p) =>

              p.productType === "set"

              &&

              String(p.setCount)

              ===

              String(count)

          );

        }

        /* ======================================
           POLARIZED
        ====================================== */

        if (type === "polarized") {

          filtered = data.filter(

            (p) =>

              p.productType === "polarized"

              &&

              String(p.setCount)

              ===

              String(count)

          );

        }

        setPosters(filtered || []);

        setPage(1);

      } catch (error) {

        console.error(
          "POSTER LIST ERROR:",
          error
        );

        setPosters([]);

      } finally {

        setLoading(false);

      }

    };

    fetchData();

  }, [type, category, collection, count]);

  /* ======================================
     PAGINATION
  ====================================== */

  const safePosters =
    Array.isArray(posters)
      ? posters
      : [];

  const start =
    (page - 1) * ITEMS_PER_PAGE;

  const current =
    safePosters.slice(
      start,
      start + ITEMS_PER_PAGE
    );

  const totalPages = Math.ceil(
    safePosters.length / ITEMS_PER_PAGE
  );

  /* ======================================
     SEO LOGIC
  ====================================== */

  let seoTitle = "Premium Posters | Mudrart";

  let seoDescription =
    "Explore premium wall posters and aesthetic artwork collections from Mudrart.";

  let seoUrl =
    "https://www.mudrart.in";

  /* ======================================
     CATEGORY SEO
  ====================================== */

  if (type === "category") {

    seoTitle =
      `${category} Posters Online India | Mudrart`;

    seoDescription =
      `Buy premium ${category} posters online from Mudrart. High quality wall art and aesthetic room decor posters.`;

    seoUrl =
      `https://www.mudrart.in/category/${category}`;

  }

  /* ======================================
     COLLECTION SEO
  ====================================== */

  if (type === "collection") {

    seoTitle =
      `${collection} Poster Collection | Mudrart`;

    seoDescription =
      `Explore ${collection} poster collection from Mudrart. Premium curated posters for room decor and aesthetic spaces.`;

    seoUrl =
      `https://www.mudrart.in/collection/${collection}`;

  }

  /* ======================================
     SINGLE POSTERS SEO
  ====================================== */

  if (type === "single") {

    seoTitle =
      `Single Posters Collection | Mudrart`;

    seoDescription =
      `Buy premium single posters online from Mudrart. High quality aesthetic wall posters for room decor.`;

    seoUrl =
      `https://www.mudrart.in/posters/single`;

  }

  /* ======================================
     SPLIT SET SEO
  ====================================== */

  if (type === "set") {

    seoTitle =
      `${count} Piece Split Posters | Mudrart`;

    seoDescription =
      `Buy ${count} piece split wall posters online from Mudrart. Premium multi-panel aesthetic artwork collection.`;

    seoUrl =
      `https://www.mudrart.in/split/${count}`;

  }

  /* ======================================
     POLARIZED SEO
  ====================================== */

  if (type === "polarized") {

    seoTitle =
      `${count} Piece Polarized Posters | Mudrart`;

    seoDescription =
      `Explore ${count} piece polarized poster collection from Mudrart. Modern premium wall art for stylish room decor.`;

    seoUrl =
      `https://www.mudrart.in/polarized/${count}`;

  }

  /* ======================================
     IMAGE
  ====================================== */

  const seoImage =

    safePosters?.[0]?.thumbnail

    ||

    "https://www.mudrart.in/logo.png";

  /* ======================================
     UI
  ====================================== */

  return (

    <>

      {/* ======================================
         SEO
      ====================================== */}

      <SEO

        title={seoTitle}

        description={seoDescription}

        image={seoImage}

        url={seoUrl}

      />

      <div className="pl-page">

        {/* ======================================
           TITLE
        ====================================== */}

        <div className="pl-title">

          <h1>

            {

              category

              ||

              collection

              ||

              (

                type === "single"

                  ? "Single Posters"

                  : type === "set"

                  ? `${count} Piece Split Posters`

                  : type === "polarized"

                  ? `${count} Piece Polarized Posters`

                  : "Posters"

              )

            }

          </h1>

          <p>

            Premium curated wall art

          </p>

        </div>

        {/* ======================================
           OFFER SLIDER
        ====================================== */}

        <OfferSlider type={type} />

        {/* ======================================
           GRID
        ====================================== */}

        {/* ======================================
          GRID
        ====================================== */}

        <section className="pl-grid">

          {loading ? (

            <div className="pl-loading-rows">

              {[0, 1, 2].map((row) => (

                <div
                  className="pl-mobile-row"
                  key={row}
                >

                  {[0, 1, 2, 3, 4].map((item) => (

                    <div
                      className="pl-skeleton"
                      key={item}
                    />

                  ))}

                </div>

              ))}

            </div>

          ) : current.length > 0 ? (

            <div className="pl-poster-rows">

              {Array.from(
                {
                  length: Math.ceil(current.length / 4)
                },
                (_, rowIndex) => {

                  const rowPosters = current.slice(
                    rowIndex * 4,
                    rowIndex * 4 + 4
                  );

                  return (

                    <div
                      className="pl-poster-row"
                      key={rowIndex}
                    >

                      {rowPosters.map((p) => (

                        <PosterCard
                          key={p._id}
                          poster={p}
                        />

                      ))}

                    </div>

                  );

                }
              )}

            </div>

          ) : (

            <div
              className="pl-no-posters"
            >
              No posters found
            </div>

          )}

        </section>

        {/* ======================================
           PAGINATION
        ====================================== */}

        {

          totalPages > 1

          &&

          (

            <div className="pl-pagination">

              {

                [...Array(totalPages)]

                .map((_, i) => (

                  <button

                    key={i}

                    className={
                      page === i + 1
                        ? "active"
                        : ""
                    }

                    onClick={() =>
                      setPage(i + 1)
                    }

                  >
                    {i + 1}
                  </button>

                ))

              }

            </div>

          )

        }

      </div>

    </>

  );

}