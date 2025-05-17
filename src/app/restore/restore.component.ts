import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NameMapService } from '../core/name-map.service';
import { saveAs } from 'file-saver';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-restore',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonToggleModule,
    MarkdownModule
  ],
  templateUrl: './restore.component.html',
  styleUrl: './restore.component.scss'
})
export class RestoreComponent {
  text = new FormControl('');
  restored = '';
  inputMode: 'text' | 'markdown' = 'text';

  constructor(private nameMap: NameMapService) { }

  handlePaste(event: ClipboardEvent): void {
    const clipboardData = event.clipboardData;
    if (!clipboardData) return;

    // Prevent default paste to handle it manually
    event.preventDefault();

    // Get both plain text and HTML content
    const text = clipboardData.getData('text/plain');
    const html = clipboardData.getData('text/html');

    // If HTML content exists, it means rich text was pasted
    if (html) {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = html;
      // Convert HTML to markdown or plain text based on mode
      const content = this.inputMode === 'markdown'
        ? this.htmlToMarkdown(tempDiv.innerText)
        : tempDiv.innerText;
      this.text.setValue(content);
    } else {
      // If no HTML, just use plain text
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

  restore(): void {
    const raw = this.text.value || '';
    this.restored = this.nameMap.restore(raw);
  }

  download(): void {
    const fileExtension = this.inputMode === 'markdown' ? 'md' : 'txt';
    const mimeType = this.inputMode === 'markdown' ? 'text/markdown' : 'text/plain';
    const blob = new Blob([this.restored], { type: mimeType });
    saveAs(blob, `restored.${fileExtension}`);
  }
}
