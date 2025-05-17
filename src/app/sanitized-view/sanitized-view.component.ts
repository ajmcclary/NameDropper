import { ClipboardModule } from "@angular/cdk/clipboard";
import { Component } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { NameMapService } from '../core/name-map.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-sanitized-view',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    ClipboardModule,
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: './sanitized-view.component.html',
  styleUrl: './sanitized-view.component.scss'
})
export class SanitizedViewComponent {
  sanitized = '';
  displayedColumns = ['real', 'code'];

  constructor(private clipboard: Clipboard, public nameMap: NameMapService) {
    this.nameMap.sanitized$.subscribe(t => this.sanitized = t);
  }

  copy(): void {
    this.clipboard.copy(this.sanitized);
  }

}

