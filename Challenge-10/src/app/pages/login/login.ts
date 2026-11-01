import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  email = '';
  clave = '';
  msg = '';

  async entrar() {
    const { error } = await this.auth.entrar(this.email, this.clave);
    if (error) {
      this.msg = error.message;
    } else {
      this.router.navigate(['/tareas']);
    }
  }

  async registrar() {
    const { error } = await this.auth.registrar(this.email, this.clave);
    this.msg = error ? error.message : 'Cuenta creada. Revisa tu correo o inicia sesión.';
  }
}