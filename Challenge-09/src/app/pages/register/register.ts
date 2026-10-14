import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrls: ['./register.scss']
})
export class RegisterComponent {
  email = signal('');
  password = signal('');

  private authService = inject(AuthService);
  private router = inject(Router);

  async handleRegister() {
    try {
      await this.authService.register(this.email(), this.password());
      this.router.navigate(['/tasks']);
    } catch (error: any) {
      alert('Error en registro: ' + error.message);
    }
  }
}