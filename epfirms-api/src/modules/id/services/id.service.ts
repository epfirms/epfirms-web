import { Service } from 'typedi';
import { customAlphabet } from 'nanoid/async';

@Service()
export class IdService {
  defaultOptions = {
    alphabet: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
    length: 20,
  };

  constructor() {}

  public async generate(opts?: { alphabet?: string; length?: number }) {
    const alphabet = opts && opts.alphabet ? opts.alphabet : this.defaultOptions.alphabet;
    const length = opts && opts.length ? opts.length : this.defaultOptions.length;
    const nanoid = customAlphabet(alphabet, length);
    return await nanoid();
  }
}
