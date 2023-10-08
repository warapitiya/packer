import fs from 'node:fs';

import FileReader from './FileReader';
import { PackingError } from './PackingError';

class Packer {
  async pack(filePath: string): Promise<string> {
    if (fs.existsSync(filePath)) {
      const fileStream = fs.createReadStream(filePath, 'utf-8');
      const fileReader = new FileReader();
      return fileReader.streamToData(fileStream);
    }
    throw new PackingError(`File not found: ${filePath}`);
  }
}

export default Packer;
