import "../styles/hero.css";

export default function HeroSection() {

const posters = [];

/* generate 50 posters automatically */

for(let i=1;i<=50;i++){
posters.push(`/posters/p${(i % 10) + 1}.jpg`);
}

return(

<section className="hero">

<div className="hero-container">


{/* POSTER GRID */}

<div className="poster-grid">

<div className="poster-column">

{posters.map((img,i)=>(
<img key={i} src={img} className="poster-img"/>
))}

</div>

<div className="poster-column reverse">

{posters.map((img,i)=>(
<img key={i} src={img} className="poster-img"/>
))}

</div>

<div className="poster-column">

{posters.map((img,i)=>(
<img key={i} src={img} className="poster-img"/>
))}

</div>

<div className="poster-column reverse">

{posters.map((img,i)=>(
<img key={i} src={img} className="poster-img"/>
))}

</div>

<div className="poster-column">

{posters.map((img,i)=>(
<img key={i} src={img} className="poster-img"/>
))}

</div>

</div>


{/* HERO TEXT */}

<div className="hero-text">

<h1>

Modernize Your Home <br/>

<span>With Minimalistic Precision</span>

</h1>

<a href="#posters" className="hero-btn">

Explore Posters

</a>

</div>


</div>

</section>

);

}