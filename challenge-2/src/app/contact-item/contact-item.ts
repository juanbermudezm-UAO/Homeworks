import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Contact } from '../models/contact.model';

@Component({
  selector: 'app-contact-item',
  imports: [],
  templateUrl: './contact-item.html',
  styleUrl: './contact-item.css',
})
export class ContactItem {
  @Input() contact!: Contact;
  @Output() deleteContact = new EventEmitter<number>();

  onDelete() {
    this.deleteContact.emit(this.contact.id);
  }
}
