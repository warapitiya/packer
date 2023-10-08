import type { TransformCallback } from 'node:stream';
import { Transform } from 'node:stream';

import type { GiftWeightCase } from '../GiftWeightCase';
import { knapsack } from '../Knapsack';

export function knapsackStream() {
  return new Transform({
    objectMode: true,
    transform(chunk: GiftWeightCase, _encoding: BufferEncoding, callback: TransformCallback) {
      const { limit, data } = chunk;
      const result = knapsack(limit, data);
      this.push(result);
      callback();
    },
  });
}
