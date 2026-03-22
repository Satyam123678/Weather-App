import { Routes } from '@angular/router';
import { HomePage } from './home-page/home-page';

export const routes: Routes = [
    {path:'',redirectTo:'home-page',pathMatch:'full'},
    {path:'home-page',component:HomePage}
];
