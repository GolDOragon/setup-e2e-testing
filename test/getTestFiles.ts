import * as fs from 'fs';
import * as path from 'path';

export const TEST_FILES = fs
  .readdirSync(path.resolve(__dirname))
  .filter((fn) => fn.endsWith('.e2e-spec.ts')) // keep in sync jest-e2e.json
  .map((fn) => fn.split('.')[0]);
