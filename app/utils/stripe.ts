export const PLANS = [
  {
    name: "Newbie",
    slug: "newbie",
    quota: 3,
    ai: 3,
    price: {
      amount: 0,
      priceIds: {
        test: "",
        production: "",
      },
    },
  },
  {
    name: "Student",
    slug: "student",
    quota: 10,
    ai: 100,
    price: {
      amount: 49,
      priceIds: {
        test: process.env.STUDENT_PRICE_ID,
        production: "",
      },
    },
  },
  {
    name: "Expert",
    slug: "expert",
    quota: 100,
    ai: 500,
    price: {
      amount: 6.9,
      priceIds: {
        test: process.env.EXPERT_PRICE_ID,
        production: "",
      },
    },
  },
];
