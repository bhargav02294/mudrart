import { useEffect, useState } from "react";

import HeroSection from "../components/HeroSection";
import OfferSlider from "../components/OfferSlider";
import CategorySection from "../components/CategorySection";
import SinglePosterRow from "../components/SinglePosterRow";

import PosterRow from "../components/PosterRow";

import CollectionGrid from "../components/CollectionGrid";
import WhyChooseUs from "../components/WhyChooseUs";
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


   

<PosterRow
  posters={posters}
  title="Single Posters"
  redirect="/posters/single"
  filterFn={(p) => p.productType === "single"}
/>

<PosterRow
  posters={posters}
  title="3 Poster Sets"
  redirect="/split/3"
  filterFn={(p) => p.productType === "set" && p.setCount === 3}
/>

<PosterRow
  posters={posters}
  title="Polaroids Sets"
  redirect="/polarized/12"
  filterFn={(p) => p.productType === "polarized"}
/>

<PosterRow
  posters={posters}
  title="Car Posters"
  redirect="/category/cars"
  filterFn={(p) => p.category === "cars"}
/>

<PosterRow
  posters={posters}
  title="Cricket Posters"
  redirect="/category/cricket"
  filterFn={(p) => p.category === "cricket"}
/>


<WhyChooseUs />
    </>
  );
}


