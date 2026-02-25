const MIN_PURCHASE = 199;

/* =======================
   SINGLE PRICES
======================= */

const SINGLE_PRICES = {
  A5: { display: 99, discount: 69 },
  A4: { display: 129, discount: 99 },
  A3: { display: 199, discount: 149 }
};

/* =======================
   SET PRICES
======================= */

const SET_PRICES = {

  2: {
    A5: { display: 199, discount: 159 },
    A4: { display: 249, discount: 189 },
    A3: { display: 299, discount: 249 }
  },

  3: {
    A5: { display: 299, discount: 249 },
    A4: { display: 349, discount: 299 },
    A3: { display: 399, discount: 349 }
  },

  4: {
    A5: { display: 359, discount: 289 },
    A4: { display: 399, discount: 329 },
    A3: { display: 469, discount: 399 }
  },

  6: {
    A6: { display: 349, discount: 299 },
    A5: { display: 389, discount: 329 },
    A4: { display: 419, discount: 359 },
    A3: { display: 519, discount: 449 }
  },

  8: {
    A6: { display: 399, discount: 349 },
    A5: { display: 459, discount: 399 },
    A4: { display: 519, discount: 449 },
    A3: { display: 729, discount: 649 }
  },

  9: {
    A6: { display: 459, discount: 399 },
    A5: { display: 499, discount: 429 },
    A4: { display: 679, discount: 599 },
    A3: { display: 849, discount: 749 }
  },

  10: {
    A6: { display: 499, discount: 449 },
    A5: { display: 559, discount: 499 },
    A4: { display: 789, discount: 699 },
    A3: { display: 959, discount: 849 }
  },

  20: {
    A5: { display: 749, discount: 599 },
    A4: { display: 949, discount: 799 },
    A3: { display: 1199, discount: 999 }
  }

};

/* =======================
   POLARIZED PRICES
======================= */

const POLARIZED_PRICES = {

  12: {
    A6: { display: 299, discount: 229 }
  },

  24: {
    A6: { display: 459, discount: 399 }
  },

  36: {
    A6: { display: 629, discount: 525 }
  },

  48: {
    A6: { display: 769, discount: 649 }
  }

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
  POLARIZED_PRICES,
  MIN_PURCHASE,
  calculateCart
};
