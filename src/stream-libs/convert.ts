import { Transform } from 'node:stream';

import { ZodError, z } from 'zod';

import type { GiftWeightCase } from '../GiftWeightCase';
import { PackingError } from '../PackingError';

const WeightLimitSchema = z.coerce.number({
  required_error: 'Weight limit is required',
  invalid_type_error: 'Weight limit must be a number',
}).transform(val => val * 100);

const DecimalConversionSchema = z.coerce.number().max(100).transform(val => Math.round(val * 100));

export function convert() {
  return new Transform({
    objectMode: true,
    transform(chunk, _encoding, callback) {
      try {
        const [limit, items]: string[] = chunk.toString().split(':');
        const listOfItems = items.trim().split(/\s/);
        const weightLimit = WeightLimitSchema.parse(limit.trim());
        const data: GiftWeightCase['data'] = [];
        for (const item of listOfItems) {
          const ValueSplit = /^\(([+-]?[0-9]*[.]?[0-9]+),([+-]?[0-9]*[.]?[0-9]+),€([+-]?([0-9]*[.])?[0-9]+)\)$/gm;
          const results = ValueSplit.exec(item);
          // Throw and error if value is null
          if (results === null) {
            throw new Error(`Error while file read: ${item} is not what we expected`);
          }
          const [_, index, weight, price] = results;
          const decimalWeight = DecimalConversionSchema.parse(weight);
          const decimalPrice = DecimalConversionSchema.parse(price);
          data.push({
            index: Number(index),
            weight: decimalWeight,
            cost: decimalPrice,
          });
        }

        const weightCase: GiftWeightCase = {
          data,
          limit: weightLimit,
        };
        this.push(weightCase);
        callback();
      }
      catch (err) {
        let error: PackingError;
        if (err instanceof ZodError || err instanceof Error) {
          error = new PackingError(err.message);
          callback(error);
        }
        else {
          error = new PackingError('Unknown error');
          callback(error);
        }
      }
    },
  });
}
