import { ApplicationConfig, importProvidersFrom, SecurityContext, ErrorHandler } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';

class CustomErrorHandler implements ErrorHandler {
  handleError(error: any) {
    console.error('An error occurred:', error);
    // Log to console in production for debugging the deployment
    if (error.stack) {
      console.error('Stack trace:', error.stack);
    }
  }
}
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
    { provide: ErrorHandler, useClass: CustomErrorHandler },
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
    provideHttpClient(),
    provideRouter([], withHashLocation())
  ]
};
