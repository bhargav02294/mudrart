const MIN_PURCHASE = 199;

/* SINGLE POSTER PRICES */
const SINGLE_PRICES = {
  A5: 69,
  A4: 99,
  A3: 149
};

/* SET PRICES */
const SET_PRICES = {
  2: { A5: 159, A4: 189, A3: 249 },
  3: { A5: 249, A4: 299, A3: 349 },
  4: { A5: 289, A4: 329, A3: 399 },
  6: { A6: 299, A5: 329, A4: 359, A3: 449 },
  8: { A6: 349, A5: 399, A4: 449, A3: 649 },
  9: { A6: 399, A5: 429, A4: 599, A3: 749 },
  10: { A6: 449, A5: 499, A4: 699, A3: 849 },
  20: { A5: 599, A4: 799, A3: 999 }
};

/* OFFERS */
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

function applyOffer(totalQty, offers) {
  for (let offer of offers) {
    const required = offer.buy + offer.free;

    if (totalQty >= required) {
      const times = Math.floor(totalQty / required);
      return {
        free: times * offer.free,
        appliedOffer: offer
      };
    }
  }

  return { free: 0, appliedOffer: null };
}

function calculateCart(cart) {
  let subtotal = 0;

  let totalSingles = 0;
  let totalSets = 0;

  cart.items.forEach(item => {
    subtotal += item.quantity * item.unitPrice;

    if (item.type === "single") {
      totalSingles += item.quantity;
    }

    if (item.type === "set") {
      totalSets += item.quantity;
    }
  });

  const singleResult = applyOffer(totalSingles, SINGLE_OFFERS);
  const setResult = applyOffer(totalSets, SET_OFFERS);

  const totalFreeItems = singleResult.free + setResult.free;

  const shipping = subtotal > 999 ? 0 : 89;

  const total = subtotal + shipping;

  const minimumValid = subtotal >= MIN_PURCHASE;

  return {
    items: cart.items,
    subtotal,
    shipping,
    total,
    totalFreeItems,
    singleOffer: singleResult.appliedOffer,
    setOffer: setResult.appliedOffer,
    minimumValid
  };
}

module.exports = {
  SINGLE_PRICES,
  SET_PRICES,
  calculateCart
};