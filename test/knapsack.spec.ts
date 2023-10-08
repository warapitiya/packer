import assert from 'node:assert';

import type { GiftWeightCase } from '../src/GiftWeightCase';
import { knapsack } from '../src/Knapsack';

describe('Knapsack', () => {
  it('should calculate simple case', () => {
    const data: GiftWeightCase['data'] = [
      { index: 1, weight: 5, cost: 60 },
      { index: 2, weight: 3, cost: 50 },
      { index: 3, weight: 2, cost: 70 },
      { index: 4, weight: 1, cost: 30 },
    ];
    const result = knapsack(5, data);
    assert.equal(result, '2,3');
  });

  it('should handle no data case', () => {
    const data: GiftWeightCase['data'] = [];
    const result = knapsack(5, data);
    assert.equal(result, '-');
  });

  it('should handle no matching case', () => {
    const data: GiftWeightCase['data'] = [
      { index: 1, weight: 15, cost: 60 },
      { index: 2, weight: 13, cost: 50 },
      { index: 3, weight: 12, cost: 70 },
      { index: 4, weight: 11, cost: 30 },
    ];
    const result = knapsack(5, data);
    assert.equal(result, '-');
  });
});
