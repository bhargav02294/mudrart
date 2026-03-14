import "../styles/hero.css";

export default function HeroSection() {

const posters = [];

for(let i=1;i<=50;i++){
posters.push(`/posters/p${(i % 10) + 1}.jpg`);
}

return(

<section className="hero">

<div className="hero-container">

{/* LEFT POSTER AREA */}

<div className="poster-area">

{[1,2,3,4,5].map((col,index)=>(

<div
key={index}
className={`poster-column ${index % 2 ? "reverse" : ""}`}
>

{posters.map((img,i)=>(
<img key={i} src={img} className="poster-img"/>
))}

</div>

))}

</div>


{/* RIGHT TEXT */}

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