import { Transform } from 'node:stream';

export function split() {
  return new Transform({
    objectMode: true,
    transform(chunk, _encoding, next) {
      const lines = chunk.toString().split(/\r?\n/);
      for (const line of lines) {
        this.push(line);
      }
      next();
    },
  });
}
