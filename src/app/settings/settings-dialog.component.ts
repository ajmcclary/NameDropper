import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatChipsModule } from "@angular/material/chips";
import { ReactiveFormsModule } from "@angular/forms";
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { NameMapService } from '../core/name-map.service';
import { FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-settings-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    ReactiveFormsModule,
    MatDialogModule,
    CommonModule,
    MatTooltipModule
  ],
  templateUrl: './settings-dialog.component.html',
  styleUrl: './settings-dialog.component.scss'
})
export class SettingsDialogComponent {
  newName = new FormControl('');
  names: string[] = [];

  constructor(private dialogRef: MatDialogRef<SettingsDialogComponent>, private nameMap: NameMapService) { }

  add(): void {
    const value = this.newName.value?.trim();
    if (value) {
      this.names.push(value);
      this.newName.setValue('');
    }
  }

  remove(name: string): void {
    this.names = this.names.filter(n => n !== name);
  }

  reset(): void {
    this.nameMap.reset();
  }

  close(): void {
    this.dialogRef.close();
  }
}
