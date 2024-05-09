import {Routes} from '@angular/router';
import {HomePageComponent} from "../pages/home-page/home-page.component";
import {PuertosPageComponent} from "../pages/puertos-page/puertos-page.component";

export const routes: Routes = [
  {path: 'home', title: 'Home', component: HomePageComponent},
  {path: 'puertos', title: 'Puertos', component: PuertosPageComponent},
  {path: '**', redirectTo: '/home', pathMatch: 'full'}
];
