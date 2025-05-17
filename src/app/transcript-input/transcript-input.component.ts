import { ReactiveFormsModule, FormsModule, FormControl } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { Component } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { NameMapService } from '../core/name-map.service';
import { MarkdownModule } from 'ngx-markdown';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transcript-input',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatButtonToggleModule,
    MarkdownModule,
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: './transcript-input.component.html',
  styleUrl: './transcript-input.component.scss'
})
export class TranscriptInputComponent {
  text = new FormControl('');
  participants = new FormControl('');
  inputMode: 'text' | 'markdown' = 'text';

  constructor(private nameMap: NameMapService) { }

  handlePaste(event: ClipboardEvent): void {
    const clipboardData = event.clipboardData;
    if (!clipboardData) return;

    event.preventDefault();

    const text = clipboardData.getData('text/plain');
    const html = clipboardData.getData('text/html');

    if (html) {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = html;
      const content = this.inputMode === 'markdown'
        ? this.htmlToMarkdown(tempDiv.innerText)
        : tempDiv.innerText;
      this.text.setValue(content);
    } else {
      this.text.setValue(text);
    }
  }

  private htmlToMarkdown(html: string): string {
    return html
      .replace(/<strong>(.*?)<\/strong>/g, '**$1**')
      .replace(/<em>(.*?)<\/em>/g, '*$1*')
      .replace(/<h[1-6]>(.*?)<\/h[1-6]>/g, '## $1')
      .replace(/<li>(.*?)<\/li>/g, '- $1')
      .replace(/<br\s*\/?>/g, '\n');
  }

  sanitize(): void {
    const raw = this.text.value || '';
    const names = this.detectNames(raw);
    const sanitized = this.nameMap.sanitize(raw, names);
    this.text.setValue(sanitized);
  }

  private parseParticipants(participantList: string): string[] {
    if (!participantList) return [];

    // Split by semicolon and process each entry
    return participantList.split(';')
      .map(entry => {
        // Match the name part before the email
        const match = entry.match(/([^<]+)</);
        if (match) {
          return match[1].trim();
        }
        return '';
      })
      .filter(name => name !== ''); // Remove empty entries
  }

  private detectNames(text: string): string[] {
    // Get the list of known participants
    const participantNames = this.parseParticipants(this.participants.value || '');
    return participantNames;
  }
}
