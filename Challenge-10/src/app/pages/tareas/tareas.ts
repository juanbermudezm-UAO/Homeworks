import { Component, OnInit, OnDestroy, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RealtimeChannel } from '@supabase/supabase-js';
import { TareasService } from '../../services/tareas';
import { SupabaseService } from '../../services/supabase';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-tareas',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './tareas.html',
  styleUrl: './tareas.css'
})
export class TareasComponent implements OnInit, OnDestroy {
  protected srv = inject(TareasService);
  protected authSrv = inject(AuthService);
  private sb = inject(SupabaseService).client;

  private canal?: RealtimeChannel;
  tareas = signal<any[]>([]);
  urlAvatar = signal<string>('');
  nueva = '';

  async ngOnInit() {
    await this.cargar();
    this.canal = this.srv.escuchar(() => this.cargar());
  }

  async cargar() {
    const { data } = await this.srv.listar();
    this.tareas.set(data ?? []);
  }

async agregar() {
  if (!this.nueva.trim()) return;

  const { error } = await this.srv.crear(this.nueva);
  if (error) {
    alert('Error al crear tarea: ' + error.message);
  } else {
    this.nueva = '';
    await this.cargar();
  }
}

async borrarTarea(id: number) {
  const { error } = await this.srv.borrar(id);
  if (error) {
    alert('Error al borrar tarea: ' + error.message);
  } else {
    await this.cargar();
  }
}

  async subirAvatar(e: Event) {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;

    const { data: { user } } = await this.sb.auth.getUser();
    if (!user) return;

    const ruta = `${user.id}/${Date.now()}-${file.name}`;
    const { error } = await this.sb.storage.from('avatars').upload(ruta, file, { upsert: true });

    if (error) {
      alert(error.message);
      return;
    }


    const publicUrl = this.sb.storage.from('avatars').getPublicUrl(ruta).data.publicUrl;
    this.urlAvatar.set(publicUrl);
  }

  ngOnDestroy() {
    if (this.canal) {
      this.sb.removeChannel(this.canal);
    }
  }
}