import type { Readable } from 'node:stream';
import { pipeline } from 'node:stream';

import { PackingError } from './PackingError';
import { convert } from './stream-libs/convert';
import { knapsackStream } from './stream-libs/knapsack-stream';
import { split } from './stream-libs/split';

class FileReader {
  async streamToData(fileStream: Readable) {
    let result = '';
    const t = pipeline(fileStream, split(), convert(), knapsackStream(), (err) => {
      if (err) {
        throw new PackingError(err.message);
      }
    });
    for await (const chunk of t) {
      result += `${chunk.toString()}\n`;
    }

    return result;
  }
}

export default FileReader;
