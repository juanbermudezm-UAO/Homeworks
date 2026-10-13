import { Routes } from '@angular/router';
import { Login } from './login/login';
import { ArbolBinario } from './arbol-binario/arbol-binario';
import { ArbolNarioComponent } from './arbol-nario/arbol-nario';
import { NoEncontrado } from './no-encontrado/no-encontrado';
import { authGuard } from './auth-guard';
import { Inicio } from './inicio/inicio';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },

    { path: 'login', component: Login },

    {path: 'inicio',
        component: Inicio,
        canActivate: [authGuard]
    },
    {
        path: 'arbol-binario',
        component: ArbolBinario,
        canActivate: [authGuard]
    },
    {
        path: 'arbol-nario',
        component: ArbolNarioComponent,
        canActivate: [authGuard]
    },

    { path: '**', component: NoEncontrado }
];