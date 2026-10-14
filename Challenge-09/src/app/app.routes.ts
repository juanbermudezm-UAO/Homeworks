import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { RegisterComponent } from './pages/register/register';
import { TasksComponent } from './pages/tasks/tasks';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'tasks', component: TasksComponent },
];