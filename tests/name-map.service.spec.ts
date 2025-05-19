import assert from 'assert';
import { NameMapService } from '../src/app/core/name-map.service';

function run() {
  // Setup a simple localStorage mock
  (global as any).localStorage = {
    data: {} as Record<string, string>,
    getItem(key: string) { return this.data[key] ?? null; },
    setItem(key: string, value: string) { this.data[key] = value; },
    removeItem(key: string) { delete this.data[key]; }
  };

  let service: NameMapService;

  function beforeEach() {
    service = new NameMapService();
    service.reset();
  }

  function test(desc: string, fn: () => void) {
    try {
      beforeEach();
      fn();
      console.log('✓', desc);
    } catch (err) {
      console.error('✗', desc);
      console.error(err);
      process.exitCode = 1;
    }
  }

  test('generates codenames for names', () => {
    const text = 'Alice met Bob.';
    const result = service.sanitize(text, ['Alice', 'Bob']);
    assert(/ALFA-1/.test(result));
    assert(/BRAVO-1/.test(result));
  });

  test('handles punctuation around names', () => {
    const text = 'Alice, Bob! Are you there?';
    const sanitized = service.sanitize(text, ['Alice', 'Bob']);
    assert(/ALFA-1,/.test(sanitized));
    assert(/BRAVO-1!/.test(sanitized));
  });

  test('handles nested names correctly', () => {
    const text = 'Ann and Anna went home.';
    const sanitized = service.sanitize(text, ['Ann', 'Anna']);
    assert(/ALFA-1 and BRAVO-1/.test(sanitized));
  });

  test('restores names', () => {
    service.sanitize('Alice met Bob.', ['Alice', 'Bob']);
    const restored = service.restore('ALFA-1 met BRAVO-1.');
    assert.strictEqual(restored, 'Alice met Bob.');
  });
}

run();
