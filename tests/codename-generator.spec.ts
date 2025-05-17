import { CodenameGenerator } from '../src/app/core/codename-generator';

describe('CodenameGenerator', () => {
  it('produces unique codes', () => {
    const gen = new CodenameGenerator();
    const codes = new Set<string>();
    for (let i = 0; i < 30; i++) {
      codes.add(gen.getNext(Array.from(codes)));
    }
    expect(codes.size).toBe(30);
  });
});
