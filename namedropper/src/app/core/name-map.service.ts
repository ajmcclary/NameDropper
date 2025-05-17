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
    const mappings = this.mappingsSubject.value;
    names.forEach(n => {
      const existing = mappings.find(m => m.realName === n);
      if (!existing) {
        const code = this.generator.getNext(mappings.map(m => m.codeName));
        mappings.push({ realName: n, codeName: code });
      }
    });
    this.save(mappings);
    this.mappingsSubject.next(mappings);
    const sanitized = this.applyMapping(text, mappings, false);
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
    map.forEach(m => {
      const from = reverse ? m.codeName : m.realName;
      const to = reverse ? m.realName : m.codeName;
      const re = new RegExp(`\\b${from}\\b`, 'g');
      text = text.replace(re, to);
    });
    return text;
  }

  private load(): NameMapping[] {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) as NameMapping[] : [];
  }

  private save(mappings: NameMapping[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mappings));
  }
}
