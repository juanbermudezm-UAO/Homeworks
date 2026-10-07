import { Routes } from '@angular/router';
import { Login } from './login/login';
import { ArbolBinario } from './arbol-binario/arbol-binario';
import { ArbolNario } from './arbol-nario/arbol-nario';
import { NoEncontrado } from './no-encontrado/no-encontrado';
import { authGuard } from './auth-guard';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },

    { path: 'login', component: Login },

    {
        path: 'arbol-binario',
        component: ArbolBinario,
        canActivate: [authGuard]
    },
    {
        path: 'arbol-nario',
        component: ArbolNario,
        canActivate: [authGuard]
    },

    { path: '**', component: NoEncontrado }
];