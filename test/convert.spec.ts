import assert from 'node:assert';

import { describe, it } from 'mocha';

import { convert } from '../src/stream-libs/convert';

describe('Convert', () => {
  it('should convert case string to javascript object', (done) => {
    let hasError = false;
    const data = '56 : (1,90.72,€13) (2,33.80,€40) (3,43.15,€10) (4,37.97,€16) (5,46.81,€36) (6,48.77,€79) (7,81.80,€45) (8,19.36,€79) (9,6.76,€64)';
    const _convert = convert();
    _convert.on('error', () => {
      hasError = true;
    });

    _convert.on('data', (data: unknown) => {
      assert.deepEqual(data, {
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

    _convert.write(data);

    _convert.end(() => {
      assert.equal(hasError, false);
      done();
    });
  });

  it('should throw PackingError for invalid formats', (done) => {
    let hasError = false;
    let hasData = false;
    let error = '';
    const _convert = convert();
    _convert.on('error', (err) => {
      hasError = true;
      error = err.message;
    });

    _convert.on('data', () => {
      hasData = true;
    });

    _convert.on('close', () => {
      assert.equal(hasError, true);
      assert.equal(hasData, false);
      assert.equal(error, 'Error while file read: (1,90.72,ten) is not what we expected');
      done();
    });

    _convert.write('56 : (1,90.72,ten)');
  });
});
