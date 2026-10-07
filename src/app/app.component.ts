import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

type Filter = 'all' | 'active' | 'done';
interface Task { id: number; title: string; done: boolean; }
const initialTasks: Task[] = [
  { id: 1, title: 'Создать Angular-приложение', done: true },
  { id: 2, title: 'Настроить CI/CD через GitHub Actions', done: false },
  { id: 3, title: 'Опубликовать сайт на Vercel', done: false },
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  tasks: Task[] = initialTasks;
  filter: Filter = 'all';
  newTask = '';

  constructor() {
    try {
      const saved = localStorage.getItem('plan-tasks');
      if (saved !== null) this.tasks = JSON.parse(saved) as Task[];
    } catch { /* Keep the starter list if storage is unavailable. */ }
  }

  get filteredTasks(): Task[] {
    return this.tasks.filter(task => this.filter === 'all' || (this.filter === 'done' ? task.done : !task.done));
  }
  get completedCount(): number { return this.tasks.filter(task => task.done).length; }
  get activeCount(): number { return this.tasks.length - this.completedCount; }
  get progress(): number { return this.tasks.length ? Math.round(this.completedCount / this.tasks.length * 100) : 0; }
  get heading(): string { return ({ all: 'Мои задачи', active: 'В процессе', done: 'Выполнено' })[this.filter]; }
  get today(): string { return new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'long', weekday: 'long' }).format(new Date()); }

  addTask(): void {
    const title = this.newTask.trim();
    if (!title) return;
    this.tasks = [...this.tasks, { id: Date.now(), title, done: false }];
    this.newTask = '';
    this.save();
  }
  toggle(task: Task): void {
    this.tasks = this.tasks.map(item => item.id === task.id ? { ...item, done: !item.done } : item);
    this.save();
  }
  remove(task: Task): void { this.tasks = this.tasks.filter(item => item.id !== task.id); this.save(); }
  clearCompleted(): void { this.tasks = this.tasks.filter(task => !task.done); this.save(); }
  private save(): void {
    try { localStorage.setItem('plan-tasks', JSON.stringify(this.tasks)); } catch { /* Storage is optional. */ }
  }
}
