import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter, TitleStrategy, withComponentInputBinding} from '@angular/router';

import {routes} from './app.routes';
import {TemplatePageTitleStrategy} from "./template-page-title-strategy";
import {provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {JwtModule} from "@auth0/angular-jwt";
import {environment} from "../../environments/environment";
import {extractDomainFromUrl} from "../utils/extract-domain-from-url";
import {AuthService} from "../services/auth/auth.service";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    {provide: TitleStrategy, useClass: TemplatePageTitleStrategy},
    importProvidersFrom(
      JwtModule.forRoot({
        config: {
          tokenGetter: AuthService.jwtTokenGetter,
          allowedDomains: [extractDomainFromUrl(environment.apiUrl)],
          disallowedRoutes: [
            `${environment.apiUrl}/auth/login`,
            `${environment.apiUrl}/auth/signup`,
          ],
        },
      }),
    ),
    provideHttpClient(withInterceptorsFromDi()),
  ]
};
