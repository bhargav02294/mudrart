import { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import heroImage from "../assets/hero-poster-room.jpg";

import "../styles/home.css";

export default function Home(){

const [posters,setPosters] = useState([]);
const posterSectionRef = useRef(null);
const revealRefs = useRef([]);


/* OFFERS */

const SINGLE_OFFERS = [
{ buy:10, free:15 },
{ buy:6, free:9 },
{ buy:5, free:5 },
{ buy:4, free:3 },
{ buy:3, free:2 }
];

const SET_OFFERS = [
{ buy:5, free:10 },
{ buy:4, free:6 },
{ buy:3, free:2 },
{ buy:2, free:1 }
];


/* FETCH POSTERS */

useEffect(()=>{

fetch("/api/posters")
.then(res=>res.json())
.then(data=>setPosters(Array.isArray(data)?data:[]))

},[]);



/* SCROLL REVEAL */

useEffect(()=>{

const observer = new IntersectionObserver(
(entries)=>{
entries.forEach(entry=>{
if(entry.isIntersecting){
entry.target.classList.add("show");
}
});
},
{threshold:0.2}
);

revealRefs.current.forEach(el=>{
if(el) observer.observe(el);
});

},[]);


/* SCROLL BUTTON */

const scrollToPosters = ()=>{
posterSectionRef.current.scrollIntoView({
behavior:"smooth"
});
};


/* PRICE */

const getPrice = (p)=>{

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
className="hero reveal"
ref={el=>revealRefs.current[0]=el}
style={{backgroundImage:`url(${heroImage})`}}
>

<div className="hero-overlay">

<h1>
Transform Your Space With
<span> Artistic Minimal Posters</span>
</h1>

<p>
Curated poster collections designed for modern interiors.
</p>

<button
className="hero-btn"
onClick={scrollToPosters}
>
Explore Posters
</button>

</div>

</section>



{/* OFFER SLIDERS */}

<section className="offer-wrapper reveal"
ref={el=>revealRefs.current[1]=el}
>


{/* SINGLE POSTER */}

<div className="offer-row">

<div className="offer-title left">
Single Poster Offers
</div>

<div className="offer-slider">

<div className="offer-track left">

{[...SINGLE_OFFERS,...SINGLE_OFFERS,...SINGLE_OFFERS,...SINGLE_OFFERS].map((o,i)=>(
<div className="offer-card" key={i}>
Buy {o.buy} Get {o.free} Free
</div>
))}

</div>

</div>

</div>



{/* SET POSTER */}

<div className="offer-row">

<div className="offer-slider">

<div className="offer-track right">

{[...SET_OFFERS,...SET_OFFERS,...SET_OFFERS,...SET_OFFERS].map((o,i)=>(
<div className="offer-card set" key={i}>
Buy {o.buy} Get {o.free} Free
</div>
))}

</div>

</div>

<div className="offer-title right">
Set Wise Offers
</div>

</div>

</section>



{/* POSTERS */}
<section
className="hero"
style={{backgroundImage:`url(${heroImage})`}}
>

<div className="hero-content">

<h1>
Modernize Your Home With
<span> Minimalist Precision</span>
</h1>

<p>
Experience interiors where every line, texture and tone
is crafted with purpose.
</p>

<div className="hero-buttons">

<button
className="primary-btn"
onClick={scrollToPosters}
>
Get Started
</button>

<button className="secondary-btn">
Learn More
</button>

</div>

</div>

</section>


<Footer/>

</>
)

}