import 'zone.js';  // Required for Angular
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig)
    .then(() => console.log('Application started successfully'))
    .catch(err => {
        console.error('Error starting application:', err);
        if (err.stack) {
            console.error('Stack trace:', err.stack);
        }
        // Show error UI
        const errorDiv = document.querySelector('.app-error') as HTMLElement;
        if (errorDiv) {
            errorDiv.style.display = 'block';
            errorDiv.textContent = 'Error starting application: ' + (err.message || err);
        }
    });
