import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  email = signal<string>('');
  password = signal<string>('');

  isRegisterMode = signal<boolean>(false);
  errorMessage = signal<string | null>(null);

  toggleMode() {
    this.isRegisterMode.set(!this.isRegisterMode());
    this.errorMessage.set(null);
  }

  async handleSubmit() {
    this.errorMessage.set(null);

    if (!this.email().trim() || !this.password().trim()) {
      this.errorMessage.set('Por favor ingrese correo y contraseña.');
      return;
    }

    try {
      if (this.isRegisterMode()) {
        await this.authService.register(this.email(), this.password());
        alert('Cuenta creada exitosamente.');
      } else {
        await this.authService.login(this.email(), this.password());
      }
      
      this.router.navigate(['/arbol']);
    } catch (error: any) {
      this.errorMessage.set(error.message || 'Ocurrió un error al autenticar.');
    }
  }
}