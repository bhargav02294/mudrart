import "../styles/hero.css";

export default function HeroSection() {

const posters = [];

for (let i = 1; i <= 50; i++) {
  posters.push(`/posters/p${i}.jpg`);
  posters.push(`/posters/p${i}.png`);
}

const posterLoop = [...posters, ...posters];

return (

<section className="hero">

  {/* POSTER WALL (LEFT SIDE ONLY) */}

  <div className="poster-wall">

    {[1,2,3,4,5].map((_,index)=>(
      
      <div
        key={index}
        className={`poster-column ${index%2 ? "reverse":""}`}
      >

        {posterLoop.map((img,i)=>(
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


  {/* RIGHT SIDE CONTENT */}

  <div className="hero-right">

    <div className="hero-content">

      <h1>
        Modernize Your Home
        <br/>
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