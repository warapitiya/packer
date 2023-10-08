import assert from 'node:assert';
import { Readable } from 'node:stream';

import { describe, it } from 'mocha';

import FileReader from '../src/FileReader';

describe('FileReader', () => {
  it('should return result when streamToData() called', async () => {
    const file = Readable.from(`81 : (1,53.38,€45) (2,88.62,€98) (3,78.48,€3) (4,72.30,€76) (5,30.18,€9) (6,46.34,€48)
20 : (1,53.38,€45)`);
    const fileReader = new FileReader();
    const output = await fileReader.streamToData(file);
    assert.equal(output, '4\n-\n');
  });
});
