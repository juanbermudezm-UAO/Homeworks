import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class Auth {
    usuario = signal<string | null>(null);

    estaLogueado() {
        return this.usuario() !== null;
    }

    entrar(email: string, pass: string) {
        if (email === 'user@mail.com' && pass === '123') {
            this.usuario.set(email);
            return true;
        }
        return false;
    }

    salir() {
        this.usuario.set(null);
    }
}