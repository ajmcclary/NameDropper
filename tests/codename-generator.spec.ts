import assert from 'assert';
import { CodenameGenerator } from '../src/app/core/codename-generator';

function run() {
  let gen: CodenameGenerator;

  function beforeEach() {
    gen = new CodenameGenerator();
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

  test('produces unique codes', () => {
    const codes = new Set<string>();
    for (let i = 0; i < 30; i++) {
      codes.add(gen.getNext(Array.from(codes)));
    }
    assert.strictEqual(codes.size, 30);
  });
}

run();
