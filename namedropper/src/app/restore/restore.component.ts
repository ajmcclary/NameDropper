import { ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NameMapService } from '../core/name-map.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-restore',
  standalone: true,
  templateUrl: './restore.component.html',
  styleUrl: './restore.component.scss'
})
export class RestoreComponent {
  text = new FormControl('');
  restored = '';
  constructor(private nameMap: NameMapService) {}

  restore(): void {
    const raw = this.text.value || '';
    this.restored = this.nameMap.restore(raw);
  }

  download(): void {
    const blob = new Blob([this.restored], { type: 'text/plain' });
    saveAs(blob, 'restored.txt');
  }
}
