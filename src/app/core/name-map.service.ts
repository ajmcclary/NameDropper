import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CodenameGenerator } from './codename-generator';

export interface NameMapping {
  realName: string;
  codeName: string;
}

const STORAGE_KEY = 'namedropper-mappings';

@Injectable({ providedIn: 'root' })
export class NameMapService {
  private generator = new CodenameGenerator();
  private mappingsSubject = new BehaviorSubject<NameMapping[]>(this.load());
  private sanitizedSubject = new BehaviorSubject<string>("");
  sanitized$ = this.sanitizedSubject.asObservable();
  mappings$ = this.mappingsSubject.asObservable();

  /**
   * Replace detected names with codenames.
   */
  sanitize(text: string, names: string[]): string {
    const currentMappings = this.mappingsSubject.value;
    const newMappings = [...currentMappings];

    // Process names in sorted order for consistent codename assignment
    const sortedNames = names.sort();

    sortedNames.forEach(name => {
      const existing = newMappings.find(m => m.realName === name);
      if (!existing) {
        const code = this.generator.getNext(newMappings.map(m => m.codeName));
        newMappings.push({ realName: name, codeName: code });
      }
    });

    // Save and emit new mappings
    this.save(newMappings);
    this.mappingsSubject.next(newMappings);

    // Apply mappings and emit sanitized text
    const sanitized = this.applyMapping(text, newMappings, false);
    this.sanitizedSubject.next(sanitized);

    return sanitized;
  }

  /**
   * Restore real names from a codename transcript.
   */
  restore(text: string): string {
    return this.applyMapping(text, this.mappingsSubject.value, true);
  }

  /** Reset mappings and localStorage. */
  reset(): void {
    this.mappingsSubject.next([]);
    this.sanitizedSubject.next("");
    this.save([]);
  }

  private applyMapping(text: string, map: NameMapping[], reverse: boolean): string {
    // Sort mappings by length (longest first) to handle nested names correctly
    const sortedMap = [...map].sort((a, b) =>
      (reverse ? b.codeName.length - a.codeName.length : b.realName.length - a.realName.length)
    );

    let result = text;
    sortedMap.forEach(m => {
      const from = reverse ? m.codeName : m.realName;
      const to = reverse ? m.realName : m.codeName;

      // Escape special regex characters in the search string
      const escapedFrom = from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

      // Simple global replacement of the exact name
      const re = new RegExp(escapedFrom, 'g');
      result = result.replace(re, to);

      // Match whole words with various surrounding punctuation
      const re = new RegExp(
        `(^|[\\s"'([{<])${escapedFrom}(?=[\\s"'\\]})>,.]|$)`,
        'g'
      );
      result = result.replace(re, `$1${to}`);
    });

    return result;
  }

  private load(): NameMapping[] {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) as NameMapping[] : [];
  }

  private save(mappings: NameMapping[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mappings));
  }
}
