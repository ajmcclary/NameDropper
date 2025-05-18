import { Component } from '@angular/core';
import { TranscriptInputComponent } from './transcript-input/transcript-input.component';
import { SanitizedViewComponent } from './sanitized-view/sanitized-view.component';
import { RestoreComponent } from './restore/restore.component';
import { SettingsDialogComponent } from './settings/settings-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    TranscriptInputComponent,
    SanitizedViewComponent,
    RestoreComponent,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatTooltipModule,
    MatDialogModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'NameDropper';
  constructor(private dialog: MatDialog) { }

  openSettings(): void {
    this.dialog.open(SettingsDialogComponent);
  }
}
