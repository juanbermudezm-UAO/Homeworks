import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './tasks.html',
  styleUrls: ['./tasks.scss']
})
export class TasksComponent implements OnInit {
  newTaskTitle = signal('');
  editingTaskId = signal<string | null>(null);
  editingTaskTitle = signal('');

  readonly taskService = inject(TaskService);
  readonly authService = inject(AuthService);
  private router = inject(Router);

  ngOnInit() {
    this.taskService.getTasks();
  }

  async handleAddTask() {
    if (!this.newTaskTitle().trim()) return;
    await this.taskService.addTask(this.newTaskTitle());
    this.newTaskTitle.set('');
  }

  async handleToggleTask(id: string, completed: boolean) {
    await this.taskService.toggleTask(id, completed);
  }

  async handleDeleteTask(id: string) {
    await this.taskService.deleteTask(id);
  }

  startEditing(id: string, currentTitle: string) {
    this.editingTaskId.set(id);
    this.editingTaskTitle.set(currentTitle);
  }

  async saveEdit(id: string) {
    if (this.editingTaskTitle().trim()) {
      await this.taskService.updateTaskTitle(id, this.editingTaskTitle());
    }
    this.editingTaskId.set(null);
  }

  async handleLogout() {
    await this.authService.logout();
    this.router.navigate(['/login']);
  }
}