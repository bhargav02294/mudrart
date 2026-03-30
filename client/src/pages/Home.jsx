import { useEffect, useState } from "react";

import HeroSection from "../components/HeroSection";
import OfferSlider from "../components/OfferSlider";
import CategorySection from "../components/CategorySection";
import SinglePosterRow from "../components/SinglePosterRow";

import PosterRow from "../components/PosterRow";

import CollectionGrid from "../components/CollectionGrid";

export default function Home() {
  const [posters, setPosters] = useState([]);

  useEffect(() => {
    fetch("/api/posters")
      .then((res) => res.json())
      .then((data) => setPosters(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <HeroSection />
      <OfferSlider />
      <CategorySection />

      {/* ✅ CORRECT SECTION */}


   


{/* SINGLE */}
<PosterRow
  posters={posters}
  title="Single Posters"
  filterFn={(p) => p.productType === "single"}
/>

{/* 3 SET */}
<PosterRow
  posters={posters}
  title="3 Poster Sets"
  filterFn={(p) => p.productType === "set" && p.setCount === 3}
/>

<CollectionGrid />

{/* POLARIZED */}
<PosterRow
  posters={posters}
  title="Polarized Sets"
  filterFn={(p) => p.productType === "polarized"}
/>

{/* CARS */}
<PosterRow
  posters={posters}
  title="Car Posters"
  filterFn={(p) => p.category === "cars"}
/>

{/* CRICKET */}
<PosterRow
  posters={posters}
  title="Cricket Posters"
  filterFn={(p) => p.category === "cricket"}
/>
    </>
  );
}


