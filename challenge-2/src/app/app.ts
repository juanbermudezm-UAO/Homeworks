import { Component, signal } from '@angular/core';
import { Loader } from './loader/loader';
import { ContactForm } from './contact-form/contact-form';
import { ContactList } from './contact-list/contact-list';
import { Contact } from './models/contact.model';

@Component({
  selector: 'app-root',
  imports: [Loader, ContactForm, ContactList],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('contacts-app');

  public loading = signal<boolean>(true);
  public contacts = signal<Contact[]>([]);

  private nextId = 1;

  constructor() {
    this.loadContacts();
  }

  // Simula una carga inicial de datos (por ejemplo, una llamada a una API)
  loadContacts() {
    setTimeout(() => {
      const initialContacts: Contact[] = [
        { id: this.nextId++, name: 'Ana Torres', phone: '300 111 2222' },
        { id: this.nextId++, name: 'Luis Pérez', phone: '301 222 3333' },
        { id: this.nextId++, name: 'María Gómez', phone: '302 333 4444' },
      ];
      this.contacts.set(initialContacts);
      this.loading.set(false);
    }, 2000);
  }

  addContact(newContact: Omit<Contact, 'id'>) {
    const contact: Contact = { id: this.nextId++, ...newContact };
    this.contacts.set([...this.contacts(), contact]);
  }

  deleteContact(id: number) {
    this.contacts.set(this.contacts().filter((c) => c.id !== id));
  }
}
