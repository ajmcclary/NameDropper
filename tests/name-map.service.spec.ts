import { NameMapService } from '../src/app/core/name-map.service';

describe('NameMapService', () => {
  let service: NameMapService;

  beforeEach(() => {
    service = new NameMapService();
    service.reset();
  });

  it('generates codenames for names', () => {
    const text = 'Alice met Bob.';
    const result = service.sanitize(text, ['Alice', 'Bob']);
    expect(result).toMatch(/ALFA-1/);
    expect(result).toMatch(/BRAVO-1/);
  });

  it('handles punctuation around names', () => {
    const text = 'Alice, Bob! Are you there?';
    const sanitized = service.sanitize(text, ['Alice', 'Bob']);
    expect(sanitized).toMatch(/ALFA-1,/);
    expect(sanitized).toMatch(/BRAVO-1!/);
  });

  it('handles nested names correctly', () => {
    const text = 'Ann and Anna went home.';
    const sanitized = service.sanitize(text, ['Ann', 'Anna']);
    expect(sanitized).toMatch(/ALFA-1 and BRAVO-1/);
  });

  it('restores names', () => {
    service.sanitize('Alice met Bob.', ['Alice', 'Bob']);
    const restored = service.restore('ALFA-1 met BRAVO-1.');
    expect(restored).toBe('Alice met Bob.');
  });
});
