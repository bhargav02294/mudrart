import "../styles/hero.css";

export default function HeroSection() {

const posters = [];

/* load real posters */

for(let i=1;i<=50;i++){
  posters.push(`/posters/p${i}.jpg`);
  posters.push(`/posters/p${i}.png`);
}

return(

<section className="hero">

{/* POSTER WALL */}

<div className="poster-wall">

{[1,2,3,4,5].map((_,index)=>(
  
<div
key={index}
className={`poster-column ${index%2 ? "reverse":""}`}
>

{posters.map((img,i)=>(
<img
key={i}
src={img}
className="poster-img"
onError={(e)=>{e.target.style.display="none"}}
/>
))}

</div>

))}

</div>


{/* HERO CONTENT */}

<div className="hero-content">

<h1>

Modernize Your Home

<br/>

<span>With Minimalistic Precision</span>

</h1>

<p>

Transform your space with curated poster collections designed for modern interiors.

</p>

<a href="#posters" className="hero-btn">

Explore Posters

</a>

</div>

</section>

);
}