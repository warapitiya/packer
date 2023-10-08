import assert from 'node:assert';

import { describe, it } from 'mocha';

import { knapsackStream } from '../src/stream-libs/knapsack-stream';

describe('KnapsackStream', () => {
  it('should convert case string to javascript object', () => {
    let hasError = false;
    const _knapsack = knapsackStream();
    _knapsack.on('error', () => {
      hasError = true;
    });

    _knapsack.on('data', (data: string) => {
      assert.equal(data, '9,8');
    });

    _knapsack.on('end', () => {
      assert.equal(hasError, false);
    });

    _knapsack.write({
      limit: 5600,
      data: [
        { index: 1, weight: 9072, cost: 1300 },
        { index: 2, weight: 3380, cost: 4000 },
        { index: 3, weight: 4315, cost: 1000 },
        { index: 4, weight: 3797, cost: 1600 },
        { index: 5, weight: 4681, cost: 3600 },
        { index: 6, weight: 4877, cost: 7900 },
        { index: 7, weight: 8180, cost: 4500 },
        { index: 8, weight: 1936, cost: 7900 },
        { index: 9, weight: 676, cost: 6400 },
      ],
    });
  });
});
