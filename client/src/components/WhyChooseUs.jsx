import "../styles/why.css";

const features = [
  {
    title: "Premium Quality Posters",
    desc: "Printed on high-quality 300 GSM premium paper for long-lasting durability.",
    icon: "/icons/quality.png",
  },
  {
    title: "Fast & Free Shipping",
    desc: "Enjoy quick delivery with free shipping on eligible orders.",
    icon: "/icons/shipping.png",
  },
  {
    title: "Exclusive Offers",
    desc: "Unlock special deals and discounts available only on our platform.",
    icon: "/icons/offers.png",
  },
  {
    title: "Digital Download",
    desc: "Instant access to high-resolution digital posters anytime, anywhere.",
    icon: "/icons/download.png",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="why-section">

      <h2 className="why-title">Why Choose Us</h2>

      <div className="why-grid">
        {features.map((item, i) => (
          <div key={i} className="why-card">

            <div className="why-icon">
              <img src={item.icon} alt={item.title} />
            </div>

            <h3>{item.title}</h3>

            <p>{item.desc}</p>

          </div>
        ))}
      </div>

    </section>
  );
}