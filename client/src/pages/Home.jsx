import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import heroImage from "../assets/hero-poster-room.jpg";

import AOS from "aos";
import "aos/dist/aos.css";

import "../styles/home.css";

export default function Home() {

const [posters,setPosters] = useState([]);

const scrollRef = useRef(null);

useEffect(()=>{

fetch("/api/posters")
.then(res=>res.json())
.then(data=>{
setPosters(Array.isArray(data) ? data : []);
});

AOS.init({
duration:900,
once:false
});

},[]);


/* =========================
SCROLL TO POSTERS
========================= */

const scrollToPosters = () => {

scrollRef.current.scrollIntoView({
behavior:"smooth"
});

};


/* =========================
FILTER PRODUCTS
========================= */

const single = posters.filter(p=>p.productType==="single");


/* =========================
PRICE
========================= */

const getPrice = (p) => {

if(!p?.sizes) return 0;

if(p.sizes.A6) return p.sizes.A6.discountedPrice;

if(p.sizes.A5) return p.sizes.A5.discountedPrice;

const first = Object.keys(p.sizes)[0];

return p.sizes[first]?.discountedPrice || 0;

};



return(
<>

<Navbar/>

{/* HERO */}

<section
className="hero"
style={{backgroundImage:`url(${heroImage})`}}
>

<div className="hero-overlay">

<h1 data-aos="fade-up">
Modernize Your Home With
<span> Minimalistic Precision</span>
</h1>

<p data-aos="fade-up" data-aos-delay="200">
Premium posters designed to elevate
modern interiors with calm and meaning.
</p>

<button
className="hero-btn"
onClick={scrollToPosters}
data-aos="fade-up"
data-aos-delay="400"
>
Explore Posters
</button>

</div>

</section>



{/* OFFER SLIDER */}

<section className="offer-section">

<div className="offer-track">

<div className="offer-item">Buy 10 Get 15 Free</div>
<div className="offer-item">Buy 6 Get 9 Free</div>
<div className="offer-item">Buy 5 Get 5 Free</div>
<div className="offer-item">Buy 4 Get 3 Free</div>
<div className="offer-item">Buy 3 Get 2 Free</div>

<div className="offer-item">Buy 10 Get 15 Free</div>
<div className="offer-item">Buy 6 Get 9 Free</div>
<div className="offer-item">Buy 5 Get 5 Free</div>
<div className="offer-item">Buy 4 Get 3 Free</div>
<div className="offer-item">Buy 3 Get 2 Free</div>

</div>

</section>



{/* POSTERS */}

<section
className="poster-section"
ref={scrollRef}
data-aos="fade-up"
>

<h2>Explore Posters</h2>

<div className="poster-slider">

{single.map(p=>(

<Link
to={`/poster/${p._id}`}
className="poster-card"
key={p._id}
>

<img src={p.thumbnail} />

<h3>{p.name}</h3>

<span>₹{getPrice(p)}</span>

</Link>

))}

</div>

</section>

<Footer/>

</>
);

}