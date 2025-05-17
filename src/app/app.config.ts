import { ApplicationConfig, importProvidersFrom, SecurityContext } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MARKED_OPTIONS, provideMarkdown } from 'ngx-markdown';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideMarkdown({
      markedOptions: {
        provide: MARKED_OPTIONS,
        useValue: {
          gfm: true,
          breaks: true,
          pedantic: false,
          smartLists: true,
          smartypants: true
        }
      },
      sanitize: SecurityContext.NONE
    }),
    importProvidersFrom(
      MatDialogModule,
      MatToolbarModule,
      MatButtonModule,
      MatInputModule,
      MatTableModule,
      MatIconModule,
      MatFormFieldModule,
      MatChipsModule,
      ClipboardModule
    ),
    provideRouter([])
  ]
};
