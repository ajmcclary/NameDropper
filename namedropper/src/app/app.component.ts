import { Component } from '@angular/core';
import { TranscriptInputComponent } from './transcript-input/transcript-input.component';
import { SanitizedViewComponent } from './sanitized-view/sanitized-view.component';
import { RestoreComponent } from './restore/restore.component';
    SettingsDialogComponent,
import { SettingsDialogComponent } from './settings/settings-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    TranscriptInputComponent,
    SanitizedViewComponent,
    RestoreComponent
    SettingsDialogComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'NameDropper';
  constructor(private dialog: MatDialog) {}

  openSettings(): void {
    this.dialog.open(SettingsDialogComponent);
  }
}
