import "../styles/offers.css";

/* OFFERS (FROM YOUR BACKEND LOGIC) */

const SINGLE_OFFERS = [
  { buy: 10, free: 15 },
  { buy: 6, free: 9 },
  { buy: 5, free: 5 },
  { buy: 4, free: 3 },
  { buy: 3, free: 2 }
];

const SET_OFFERS = [
  { buy: 5, free: 10 },
  { buy: 4, free: 6 },
  { buy: 3, free: 2 },
  { buy: 2, free: 1 }
];

export default function OfferSlider({ type }) {

  /* ================= SELECT OFFERS ================= */

  let offers = [];

  if (type === "single") {
    offers = SINGLE_OFFERS.map(
      o => `Buy ${o.buy} Posters Get ${o.free} Free`
    );
  }

  else if (type === "set") {
    offers = SET_OFFERS.map(
      o => `Buy ${o.buy} Sets Get ${o.free} Free`
    );
  }

  else if (type === "polarized") {
    offers = [
      "Buy 12 Get Extra Discount",
      "Buy 24 Get Premium Deal",
      "Buy 48 Get Maximum Savings"
    ];
  }

  else {
    // fallback (category / collection pages)
    offers = [
      ...SINGLE_OFFERS.map(o => `Buy ${o.buy} Posters Get ${o.free} Free`),
      ...SET_OFFERS.map(o => `Buy ${o.buy} Sets Get ${o.free} Free`)
    ];
  }


  /* ================= LOOP ================= */

  const loopOffers = [...offers, ...offers, ...offers];


  return (
    <section className="offer-slider">

      <div className="offer-track">

        {loopOffers.map((text, i) => (
          <span key={i} className="offer-item">
            {text}
          </span>
        ))}

      </div>

    </section>
  );
}