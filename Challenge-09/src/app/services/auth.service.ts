import { Injectable, signal } from '@angular/core';
import { auth } from '../../firebase/config';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    User
} from 'firebase/auth';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    // Signal para mantener el estado global del usuario activo
    readonly currentUser = signal<User | null>(null);

    constructor() {
        // Escucha automáticamente el cambio de estado de la sesión
        onAuthStateChanged(auth, (user) => {
            this.currentUser.set(user);
        });
    }

    // Iniciar sesión
    async login(email: string, pass: string) {
        return await signInWithEmailAndPassword(auth, email, pass);
    }

    // Registrar nuevo usuario
    async register(email: string, pass: string) {
        return await createUserWithEmailAndPassword(auth, email, pass);
    }

    // Cerrar sesión
    async logout() {
        return await signOut(auth);
    }
}