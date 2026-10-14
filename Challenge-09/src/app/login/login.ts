import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent {
  email = signal('');
  password = signal('');

  private authService = inject(AuthService);
  private router = inject(Router);

  async handleLogin() {
    try {
      await this.authService.login(this.email(), this.password());
      this.router.navigate(['/tasks']);
    } catch (error: any) {
      alert('Error en login: ' + error.message);
    }
  }
}