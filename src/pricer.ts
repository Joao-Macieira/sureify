export type Category = 'size' | 'creamer';
export type Option = 'small' | 'medium' | 'large' | 'none' | 'dairy' | 'non-dairy';
export type Price = number;

export interface Pricer {
  (category: Category, option: Option): Price;
}

const SIZE_PRICES: Readonly<Record<string, Price>> = {
  small: 1.0,
  medium: 1.5,
  large: 2.0,
} as const;

const CREAMER_PRICES: Readonly<Record<string, Price>> = {
  none: 0.0,
  dairy: 0.25,
  'non-dairy': 0.5,
} as const;

const PRICE_BY_CATEGORY: Readonly<Record<Category, Readonly<Record<string, Price>>>> = {
  size: SIZE_PRICES,
  creamer: CREAMER_PRICES,
} as const;

export const createPricer = (): Pricer => {
  let selections: Record<Category, Option | null> = {
    size: null,
    creamer: null,
  };

  const pricer: Pricer = (category: Category, option: Option): Price => {
    selections = {
      ...selections,
      [category]: option,
    };

    const totalPrice = Object.entries(selections).reduce((total, [cat, opt]) => {
      if (opt === null) {
        return total;
      }
      const categoryPrices = PRICE_BY_CATEGORY[cat as Category];
      return total + (categoryPrices[opt] ?? 0);
    }, 0);

    return totalPrice;
  };

  return pricer;
};
