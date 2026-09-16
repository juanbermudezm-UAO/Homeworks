import { Component, EventEmitter, Output, signal } from '@angular/core';
import { Contact } from '../models/contact.model';

@Component({
  selector: 'app-contact-form',
  imports: [],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.css',
})
export class ContactForm {
  @Output() addContact = new EventEmitter<Omit<Contact, 'id'>>();

  public name = signal<string>('');
  public phone = signal<string>('');

  onNameChange(e: any) {
    this.name.set(e.target.value);
  }

  onPhoneChange(e: any) {
    this.phone.set(e.target.value);
  }

  onSubmit() {
    if (!this.name().trim() || !this.phone().trim()) {
      return;
    }

    this.addContact.emit({ name: this.name(), phone: this.phone() });

    // Limpiar el formulario
    this.name.set('');
    this.phone.set('');
  }
}
