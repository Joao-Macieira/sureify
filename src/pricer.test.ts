import { createPricer } from './pricer';

describe('Coffee Pricer', () => {
  it('provides the latest price given the options selected so far', () => {
    const pricer = createPricer();

    pricer('size', 'small');
    const defaultPrice = pricer('creamer', 'none');
    expect(defaultPrice).toBe(1.0);

    const priceAfterFirstSelection = pricer('creamer', 'dairy');
    expect(priceAfterFirstSelection).toBe(1.25);

    const priceAfterSecondSelection = pricer('creamer', 'non-dairy');
    expect(priceAfterSecondSelection).toBe(1.5);

    const priceAfterThirdSelection = pricer('size', 'large');
    expect(priceAfterThirdSelection).toBe(2.5);
  });

  describe('Size prices', () => {
    it('small costs $1.00', () => {
      const pricer = createPricer();
      expect(pricer('size', 'small')).toBe(1.0);
    });

    it('medium costs $1.50', () => {
      const pricer = createPricer();
      expect(pricer('size', 'medium')).toBe(1.5);
    });

    it('large costs $2.00', () => {
      const pricer = createPricer();
      expect(pricer('size', 'large')).toBe(2.0);
    });
  });

  describe('Creamer prices', () => {
    it('none costs $0.00', () => {
      const pricer = createPricer();
      expect(pricer('creamer', 'none')).toBe(0.0);
    });

    it('dairy costs $0.25', () => {
      const pricer = createPricer();
      expect(pricer('creamer', 'dairy')).toBe(0.25);
    });

    it('non-dairy costs $0.50', () => {
      const pricer = createPricer();
      expect(pricer('creamer', 'non-dairy')).toBe(0.5);
    });
  });

  describe('All possible combinations (9 total)', () => {
    it('small + none = $1.00', () => {
      const pricer = createPricer();
      pricer('size', 'small');
      expect(pricer('creamer', 'none')).toBe(1.0);
    });

    it('small + dairy = $1.25', () => {
      const pricer = createPricer();
      pricer('size', 'small');
      expect(pricer('creamer', 'dairy')).toBe(1.25);
    });

    it('small + non-dairy = $1.50', () => {
      const pricer = createPricer();
      pricer('size', 'small');
      expect(pricer('creamer', 'non-dairy')).toBe(1.5);
    });

    it('medium + none = $1.50', () => {
      const pricer = createPricer();
      pricer('size', 'medium');
      expect(pricer('creamer', 'none')).toBe(1.5);
    });

    it('medium + dairy = $1.75', () => {
      const pricer = createPricer();
      pricer('size', 'medium');
      expect(pricer('creamer', 'dairy')).toBe(1.75);
    });

    it('medium + non-dairy = $2.00', () => {
      const pricer = createPricer();
      pricer('size', 'medium');
      expect(pricer('creamer', 'non-dairy')).toBe(2.0);
    });

    it('large + none = $2.00', () => {
      const pricer = createPricer();
      pricer('size', 'large');
      expect(pricer('creamer', 'none')).toBe(2.0);
    });

    it('large + dairy = $2.25', () => {
      const pricer = createPricer();
      pricer('size', 'large');
      expect(pricer('creamer', 'dairy')).toBe(2.25);
    });

    it('large + non-dairy = $2.50', () => {
      const pricer = createPricer();
      pricer('size', 'large');
      expect(pricer('creamer', 'non-dairy')).toBe(2.5);
    });
  });

  describe('Selection order should not matter', () => {
    it('size first, then creamer', () => {
      const pricer = createPricer();
      pricer('size', 'medium');
      expect(pricer('creamer', 'dairy')).toBe(1.75);
    });

    it('creamer first, then size', () => {
      const pricer = createPricer();
      pricer('creamer', 'dairy');
      expect(pricer('size', 'medium')).toBe(1.75);
    });
  });

  describe('Replacing selections', () => {
    it('can change size multiple times', () => {
      const pricer = createPricer();
      pricer('creamer', 'none');

      expect(pricer('size', 'small')).toBe(1.0);
      expect(pricer('size', 'medium')).toBe(1.5);
      expect(pricer('size', 'large')).toBe(2.0);
      expect(pricer('size', 'small')).toBe(1.0);
    });

    it('can change creamer multiple times', () => {
      const pricer = createPricer();
      pricer('size', 'small');

      expect(pricer('creamer', 'none')).toBe(1.0);
      expect(pricer('creamer', 'dairy')).toBe(1.25);
      expect(pricer('creamer', 'non-dairy')).toBe(1.5);
      expect(pricer('creamer', 'none')).toBe(1.0);
    });

    it('can change both multiple times', () => {
      const pricer = createPricer();

      pricer('size', 'small');
      pricer('creamer', 'none');
      expect(pricer('size', 'large')).toBe(2.0);
      expect(pricer('creamer', 'non-dairy')).toBe(2.5);
      expect(pricer('size', 'medium')).toBe(2.0);
      expect(pricer('creamer', 'dairy')).toBe(1.75);
    });
  });

  describe('Multiple pricers are independent', () => {
    it('changes to one pricer do not affect another', () => {
      const pricer1 = createPricer();
      const pricer2 = createPricer();

      pricer1('size', 'large');
      pricer1('creamer', 'non-dairy');

      pricer2('size', 'small');
      pricer2('creamer', 'none');

      expect(pricer1('size', 'large')).toBe(2.5);
      expect(pricer2('size', 'small')).toBe(1.0);
    });

    it('three independent pricers', () => {
      const pricer1 = createPricer();
      const pricer2 = createPricer();
      const pricer3 = createPricer();

      pricer1('size', 'small');
      const price1 = pricer1('creamer', 'none');

      pricer2('size', 'medium');
      const price2 = pricer2('creamer', 'dairy');

      pricer3('size', 'large');
      const price3 = pricer3('creamer', 'non-dairy');

      expect(price1).toBe(1.0);
      expect(price2).toBe(1.75);
      expect(price3).toBe(2.5);
    });
  });

  describe('Partial selections', () => {
    it('returns only size price when only size is selected', () => {
      const pricer = createPricer();
      expect(pricer('size', 'medium')).toBe(1.5);
    });

    it('returns only creamer price when only creamer is selected', () => {
      const pricer = createPricer();
      expect(pricer('creamer', 'dairy')).toBe(0.25);
    });
  });

  describe('Decimal precision', () => {
    it('handles decimal arithmetic correctly', () => {
      const pricer = createPricer();
      pricer('size', 'medium');
      const total = pricer('creamer', 'dairy');

      expect(total).toBe(1.75);
      expect(total).not.toBe(1.7500000000000002);
    });
  });

  describe('Realistic user scenarios', () => {
    it('user is indecisive and changes mind many times', () => {
      const pricer = createPricer();

      pricer('size', 'small');
      pricer('creamer', 'none');
      expect(pricer('size', 'small')).toBe(1.0);

      expect(pricer('size', 'medium')).toBe(1.5);

      expect(pricer('creamer', 'dairy')).toBe(1.75);

      expect(pricer('creamer', 'non-dairy')).toBe(2.0);

      expect(pricer('size', 'large')).toBe(2.5);

      expect(pricer('creamer', 'none')).toBe(2.0);

      expect(pricer('creamer', 'dairy')).toBe(2.25);
    });
  });
});
