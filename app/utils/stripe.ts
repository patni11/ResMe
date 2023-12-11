export type Plan = {
  name: string;
  slug: string;
  quota: number;
  ai: number;
  price: {
    amount: number;
    priceIds: {
      test: string | undefined;
      production: string;
      crypto: string;
      cryptoTest: string;
    };
  };
};
export const PLANS = [
  {
    name: "Newbie",
    slug: "newbie",
    quota: 3,
    ai: 10, //TODO: make it 3
    price: {
      amount: 0,
      priceIds: {
        test: "",
        production: "",
        crypto: "",
        cryptoTest: "",
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
        crypto: "",
        cryptoTest: "price_c7d25a15968b4e7d91f52f87772e5389",
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
        crypto: "",
        cryptoTest: "",
      },
    },
  },
];
