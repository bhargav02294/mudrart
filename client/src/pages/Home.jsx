import { useEffect, useState } from "react";

import HeroSection from "../components/HeroSection";
import OfferSlider from "../components/OfferSlider";
import CategorySection from "../components/CategorySection";
import SinglePosterRow from "../components/SinglePosterRow";

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
    </>
  );
}