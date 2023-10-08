import assert from 'node:assert';
import { describe, it } from 'mocha';
import Packer from '../src';

describe('Packer', () => {
  it('should return the results', async () => {
    const packer = new Packer();
    const output = await packer.pack('./resources/example_input');
    assert.equal(output, '4\n-\n7,2\n9,8\n');
  });
});
