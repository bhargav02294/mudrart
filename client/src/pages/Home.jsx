import { useEffect, useState } from "react";

/* ======================================
COMPONENTS
====================================== */

import HeroSection from "../components/HeroSection";

import OfferSlider from "../components/OfferSlider";

import CategorySection from "../components/CategorySection";

import PosterRow from "../components/PosterRow";

import CollectionGrid from "../components/CollectionGrid";

import WhyChooseUs from "../components/WhyChooseUs";

import SEO from "../components/SEO";

/* ======================================
HOME PAGE
====================================== */

export default function Home() {

  const [posters, setPosters] = useState([]);

  /* ======================================
     FETCH POSTERS
  ====================================== */

  useEffect(() => {

    const fetchPosters = async () => {

      try {

        const res = await fetch("/api/posters");

        /* ======================================
           SAFETY CHECK
        ====================================== */

        if (!res.ok) {

          throw new Error("Failed to fetch posters");

        }

        const data = await res.json();

        /* ======================================
           ARRAY SAFETY
        ====================================== */

        if (!Array.isArray(data)) {

          setPosters([]);

          return;

        }

        setPosters(data);

      } catch (err) {

        console.error(
          "HOME FETCH ERROR:",
          err
        );

        setPosters([]);

      }

    };

    fetchPosters();

  }, []);

  /* ======================================
     SEO VALUES
  ====================================== */

  const seoTitle =
    "Mudrart | Premium Wall Posters & Aesthetic Room Decor";

  const seoDescription =
    "Buy premium anime posters, aesthetic wall art, motivational posters, spiritual posters, split posters and room decor artwork online in India from Mudrart.";

  const seoImage =

    posters?.[0]?.thumbnail

    ||

    "https://www.mudrart.in/logo.png";

  const seoUrl =
    "https://www.mudrart.in";

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

      {/* ======================================
         HERO SECTION
      ====================================== */}

      <HeroSection />

      {/* ======================================
         OFFERS
      ====================================== */}

      <OfferSlider />

      {/* ======================================
         CATEGORIES
      ====================================== */}

      <CategorySection />

      {/* ======================================
         SINGLE POSTERS
      ====================================== */}

      <PosterRow

        posters={posters}

        title="Single Posters"

        redirect="/posters/single"

        filterFn={(p) =>
          p.productType === "single"
        }

      />

      {/* ======================================
         3 POSTER SETS
      ====================================== */}

      <PosterRow

        posters={posters}

        title="3 Poster Sets"

        redirect="/split/3"

        filterFn={(p) =>

          p.productType === "set"

          &&

          p.setCount === 3

        }

      />

      {/* ======================================
         COLLECTIONS
      ====================================== */}

      <CollectionGrid />

      {/* ======================================
         POLAROID SETS
      ====================================== */}

      <PosterRow

        posters={posters}

        title="Polaroids Sets"

        redirect="/polarized/12"

        filterFn={(p) =>
          p.productType === "polarized"
        }

      />

      {/* ======================================
         CAR POSTERS
      ====================================== */}

      <PosterRow

        posters={posters}

        title="Car Posters"

        redirect="/category/cars"

        filterFn={(p) =>
          p.category === "cars"
        }

      />

      {/* ======================================
         CRICKET POSTERS
      ====================================== */}

      <PosterRow

        posters={posters}

        title="Cricket Posters"

        redirect="/category/cricket"

        filterFn={(p) =>
          p.category === "cricket"
        }

      />

      {/* ======================================
         WHY CHOOSE US
      ====================================== */}

      <WhyChooseUs />

    </>

  );

}