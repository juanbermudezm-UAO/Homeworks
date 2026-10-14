import { Injectable, signal } from '@angular/core';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    User
} from 'firebase/auth';
import { auth } from '../../firebase/config';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    // Signal para almacenar el estado del usuario logueado en tiempo real
    currentUser = signal<User | null>(null);
    isLoading = signal<boolean>(true);

    constructor() {
        // Escucha cambios en el estado de autenticación de Firebase
        onAuthStateChanged(auth, (user) => {
            this.currentUser.set(user);
            this.isLoading.set(false);
        });
    }

    // Registrar un nuevo usuario
    async register(email: string, pass: string) {
        return await createUserWithEmailAndPassword(auth, email, pass);
    }

    // Iniciar sesión
    async login(email: string, pass: string) {
        return await signInWithEmailAndPassword(auth, email, pass);
    }

    // Cerrar sesión
    async logout() {
        return await signOut(auth);
    }
}