import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Session } from '@supabase/supabase-js';
import { SupabaseService } from './supabase';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private sb = inject(SupabaseService).client;
    private router = inject(Router);
    session = signal<Session | null>(null);

    constructor() {
        this.sb.auth.getSession().then(({ data }) => this.session.set(data.session));
        this.sb.auth.onAuthStateChange((_evento, s) => this.session.set(s));
    }

    registrar(email: string, clave: string) {
        return this.sb.auth.signUp({ email, password: clave });
    }

    entrar(email: string, clave: string) {
        return this.sb.auth.signInWithPassword({ email, password: clave });
    }

    async salir() {
        const { error } = await this.sb.auth.signOut();
        if (!error) {
            this.router.navigate(['/login']);
        }
    }
}