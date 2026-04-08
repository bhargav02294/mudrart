import "../styles/hero.css";

export default function HeroSection() {

  /* =========================
     GENERATE POSTERS (1–50)
  ========================= */

  const posters = [];

  for (let i = 1; i <= 50; i++) {

    // auto detect extension
    if ([44, 45, 50].includes(i)) {
      posters.push(`/posters/p${i}.png`);
    } else {
      posters.push(`/posters/p${i}.jpg`);
    }

  }


  /* =========================
     SPLIT INTO 5 GROUPS
     (10 posters each)
  ========================= */

  const columns = [];

  for (let i = 0; i < 5; i++) {
    const start = i * 10;
    const group = posters.slice(start, start + 10);

    // duplicate for infinite loop
    columns.push([...group, ...group]);
  }


  /* =========================
     RENDER
  ========================= */

  return (

    <section className="hero">

      {/* POSTER WALL */}

      <div className="poster-wall">

        {columns.map((col, index) => (

          <div
            key={index}
            className={`poster-column ${index % 2 ? "reverse" : ""}`}
          >

            {col.map((img, i) => (

              <img
                key={i}
                src={img}
                className="poster-img"
                loading="lazy"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />

            ))}

          </div>

        ))}

      </div>


      {/* RIGHT CONTENT */}

      <div className="hero-right">

        <div className="hero-content">

          <h1>
            Modernize Your Home
            <br />
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