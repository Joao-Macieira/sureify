# Coffee Pricer

A TypeScript solution for the Sureify coding exercise - an automated coffee vending machine pricing function.

## Overview

This module provides a `createPricer` function that tracks user selections and calculates the total price of a coffee order. Each time the user selects an option, the pricer returns the updated total price.

## Pricing

| Size   | Price | Creamer   | Price |
| ------ | ----- | --------- | ----- |
| Small  | $1.00 | None      | $0.00 |
| Medium | $1.50 | Dairy     | $0.25 |
| Large  | $2.00 | Non-Dairy | $0.50 |

## Design Decisions

- **No classes**: Uses closures to maintain state, as suggested in the exercise
- **Immutability**: Price mappings are `Readonly` objects, and state updates use spread operator
- **Maintainability**: Prices are defined in separate constants for easy updates
- **Type safety**: Full TypeScript types as specified in the interface

## Installation

```bash
npm install
```

## Running Tests

```bash
npx jest
```

Expected output:

```
PASS ./pricer.test.ts
  Coffee Pricer
    ✓ provides the latest price given the options selected so far
    Size prices
      ✓ small costs $1.00
      ✓ medium costs $1.50
      ✓ large costs $2.00
    Creamer prices
      ✓ none costs $0.00
      ✓ dairy costs $0.25
      ✓ non-dairy costs $0.50
    All possible combinations (9 total)
      ✓ small + none = $1.00
      ✓ small + dairy = $1.25
      ...

Test Suites: 1 passed, 1 total
Tests:       27 passed, 27 total
```

## Usage Example

```typescript
import { createPricer } from "./pricer";

const pricer = createPricer();

pricer("size", "small"); // Returns: 1.00
pricer("creamer", "none"); // Returns: 1.00
pricer("creamer", "dairy"); // Returns: 1.25
pricer("size", "large"); // Returns: 2.25
```

## Project Structure

```
├── pricer.ts        # Main implementation
├── pricer.test.ts   # Test suite (27 tests)
├── package.json
├── jest.config.js
└── README.md
```

## Author

João Paulo Ribeiro
