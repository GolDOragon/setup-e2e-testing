import { createHash } from 'crypto';

export const getHash = () =>
  createHash('sha256').update('TATAKAE MY FRIEND').digest('hex');
