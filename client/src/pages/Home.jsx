import { useEffect, useState } from "react";

import HeroSection from "../components/HeroSection";
import OfferSlider from "../components/OfferSlider";
import CategorySection from "../components/CategorySection";
import SinglePosterRow from "../components/SinglePosterRow";

import PosterRow from "../components/PosterRow";

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
      <SinglePosterRow posters={posters} />


      <PosterRow
  posters={posters}
  title="Single Posters"
  filterFn={(p) => p.productType === "single"}
  redirect="/posters/single"
/>

<PosterRow
  posters={posters}
  title="3 Set Posters"
  filterFn={(p) => p.productType === "set" && p.setCount === 3}
  redirect="/posters/set/3"
/>
    </>
  );
}


