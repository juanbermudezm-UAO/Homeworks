import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { ArbolNarioComponent } from './arbol-nario/arbol-nario';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'arbol', component: ArbolNarioComponent },
    { path: '**', redirectTo: 'login' }
];