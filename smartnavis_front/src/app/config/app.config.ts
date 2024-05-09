import {ApplicationConfig} from '@angular/core';
import {provideRouter, TitleStrategy, withComponentInputBinding} from '@angular/router';

import {routes} from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    {provide: TitleStrategy, useClass: TemplatePageTitleStrategy},
  ]
};
