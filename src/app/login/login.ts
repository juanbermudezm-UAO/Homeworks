import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private auth = inject(Auth);
  private router = inject(Router);

  email = '';
  password = '';
  errorMensaje = signal<string | null>(null);

  entrar() {
    const exito = this.auth.entrar(this.email, this.password);
    
    if (exito) {

      this.router.navigate(['/inicio']);
    } else {
      this.errorMensaje.set('Credenciales incorrectas. Usa user@mail.com y 123');
    }
  }
}