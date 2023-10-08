import assert from 'node:assert';
import { describe } from 'mocha';
import { split } from '../src/stream-libs/split';

describe('Split', () => {
  it('should split multilines', (done) => {
    let hasError = false;
    const results: string[] = [];
    const _split = split();

    _split.on('error', () => {
      hasError = true;
    });

    _split.on('data', (data: string) => {
      results.push(data);
    });

    _split.write('unscrew-dicing-coming-choking-grub');
    _split.write('reptile-cavalry-trimming-residency-revoke');
    _split.write('critter-native-dean-corrosive-fantasy');
    _split.write('retract-float-chewy-faucet-passage');

    _split.end(() => {
      assert.equal(hasError, false);
      assert.deepEqual(results, [
        'unscrew-dicing-coming-choking-grub',
        'reptile-cavalry-trimming-residency-revoke',
        'critter-native-dean-corrosive-fantasy',
        'retract-float-chewy-faucet-passage',
      ]);
      done();
    });
  });
});
