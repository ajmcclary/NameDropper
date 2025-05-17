import { ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NameMapService } from '../core/name-map.service';

@Component({
  selector: 'app-transcript-input',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule],
  templateUrl: './transcript-input.component.html',
  styleUrl: './transcript-input.component.scss'
})
export class TranscriptInputComponent {
  text = new FormControl('');
  constructor(private nameMap: NameMapService) {}

  sanitize(): void {
    const raw = this.text.value || '';
    const names = this.detectNames(raw);
    const sanitized = this.nameMap.sanitize(raw, names);
    this.text.setValue(sanitized);
  }

  private detectNames(text: string): string[] {
    const explicit: string[] = [];
    const words = text.split(/\s+/);
    const names = new Set<string>();
    for (let i = 0; i < words.length; i++) {
      const w = words[i];
      if (!w) continue;
      const clean = w.replace(/[^A-Za-z]/g, '');
      if (!clean) continue;
      if (explicit.includes(clean)) {
        names.add(clean);
      } else if (/^(Mr|Mrs|Ms|Dr)\.?$/i.test(w)) {
        if (i + 1 < words.length) {
          names.add(words[i + 1].replace(/[^A-Za-z]/g, ''));
        }
      } else if (/^[A-Z][a-z]+$/.test(clean) && i !== 0) {
        names.add(clean);
      }
    }
    return Array.from(names);
  }
}
