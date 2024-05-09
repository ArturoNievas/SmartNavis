import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter, TitleStrategy, withComponentInputBinding} from '@angular/router';

import {routes} from './app.routes';
import {TemplatePageTitleStrategy} from "./template-page-title-strategy";
import {HttpClientModule} from "@angular/common/http";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    {provide: TitleStrategy, useClass: TemplatePageTitleStrategy},
    importProvidersFrom(HttpClientModule)
  ]
};
