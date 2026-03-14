import "./../styles/hero.css";

import poster1 from "../assets/posters/p1.jpg";
import poster2 from "../assets/posters/p2.jpg";
import poster3 from "../assets/posters/p3.jpg";
import poster4 from "../assets/posters/p4.jpg";
import poster5 from "../assets/posters/p5.jpg";
import poster6 from "../assets/posters/p6.jpg";
import poster7 from "../assets/posters/p7.jpg";
import poster8 from "../assets/posters/p8.jpg";
import poster9 from "../assets/posters/p9.jpg";
import poster10 from "../assets/posters/p10.jpg";

/* duplicate images to create long infinite slider */

const posters = [
poster1,poster2,poster3,poster4,poster5,
poster6,poster7,poster8,poster9,poster10,
poster1,poster2,poster3,poster4,poster5,
poster6,poster7,poster8,poster9,poster10,
poster1,poster2,poster3,poster4,poster5,
poster6,poster7,poster8,poster9,poster10,
poster1,poster2,poster3,poster4,poster5,
poster6,poster7,poster8,poster9,poster10
];

export default function HeroSection(){

return(

<section className="hero">

<div className="hero-container">


{/* LEFT POSTER SLIDERS */}

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

)

}