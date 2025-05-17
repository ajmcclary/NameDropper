import nato from '../../assets/wordlists/nato.json';

/** Generate unique NATO-based codenames */
export class CodenameGenerator {
  private index = 0;

  constructor(private used: Set<string> = new Set<string>()) {}

  /**
   * Generate the next codename that is unique among existing ones.
   */
  getNext(existing: string[] = []): string {
    const used = new Set([...this.used, ...existing]);
    while (this.index < nato.length * 100) {
      const word = nato[this.index % nato.length].toUpperCase();
      const number = Math.floor(this.index / nato.length) + 1;
      let code = `${word}-${number}`;
      let suffix = 1;
      while (used.has(code)) {
        code = `${word}-${number}-${suffix++}`;
      }
      this.index++;
      this.used.add(code);
      return code;
    }
    throw new Error('Codename space exhausted');
  }
}
