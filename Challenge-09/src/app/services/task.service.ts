import { Injectable, signal } from '@angular/core';
import {
    collection,
    addDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    doc,
    serverTimestamp
} from 'firebase/firestore';
import { db } from '../../firebase/config';

export interface Task {
    id?: string;
    title: string;
    completed: boolean;
    createdAt?: any;
}

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    readonly tasks = signal<Task[]>([]);
    private tasksCollection = collection(db, 'tasks');

    // Obtener todas las tareas de Firestore
    async getTasks() {
        const snapshot = await getDocs(this.tasksCollection);
        const data = snapshot.docs.map(d => ({
            id: d.id,
            ...d.data()
        })) as Task[];
        this.tasks.set(data);
    }

    // Crear una nueva tarea
    async addTask(title: string) {
        await addDoc(this.tasksCollection, {
            title,
            completed: false,
            createdAt: serverTimestamp()
        });
        await this.getTasks();
    }

    // Alternar estado de completado (done / pending)
    async toggleTask(id: string, currentStatus: boolean) {
        const taskDoc = doc(db, 'tasks', id);
        await updateDoc(taskDoc, { completed: !currentStatus });
        await this.getTasks();
    }

    // Editar el título de una tarea
    async updateTaskTitle(id: string, newTitle: string) {
        const taskDoc = doc(db, 'tasks', id);
        await updateDoc(taskDoc, { title: newTitle });
        await this.getTasks();
    }

    // Eliminar tarea
    async deleteTask(id: string) {
        const taskDoc = doc(db, 'tasks', id);
        await deleteDoc(taskDoc);
        await this.getTasks();
    }
}