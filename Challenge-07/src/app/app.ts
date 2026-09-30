import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

import { arbol_NArio } from './modelos/arbol_N-ario.modelo';
import { Nodo } from './modelos/nodo.modelo';

@Component({ standalone: true, template: `<h2>Perfil de Usuario</h2>` })
export class ProfileComponent {}

@Component({ standalone: true, template: `<h2>Mensajes</h2>` })
export class MessagesComponent {}

@Component({ standalone: true, template: `<h2>Ajustes de Cuenta</h2>` })
export class AccountComponent {}

@Component({ standalone: true, template: `<h2>Seguridad y Privacidad</h2>` })
export class SecurityComponent {}

@Component({ standalone: true, template: `<h2>Preguntas Frecuentes</h2>` })
export class FaqComponent {}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLinkActive, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  arbolMenu!: arbol_NArio;

  ngOnInit(): void {
    this.arbolMenu = new arbol_NArio('Menú Principal');

    const nodoProfile = new Nodo({
      titulo: 'Profile',
      link: '/profile',
      componente: ProfileComponent
    });

    const nodoMessages = new Nodo({
      titulo: 'Messages',
      link: '/messages',
      componente: MessagesComponent
    });

    const nodoSettings = new Nodo({ titulo: 'Settings' });

    const nodoAccount = new Nodo({
      titulo: 'Account',
      link: '/settings/account',
      componente: AccountComponent
    });

    const nodoProfileSub = new Nodo({
      titulo: 'Profile',
      link: '/settings/profile',
      componente: ProfileComponent
    });

    const nodoSecurity = new Nodo({
      titulo: 'Security & Privacy',
      link: '/settings/security',
      componente: SecurityComponent
    });

    const nodoPassword = new Nodo({
      titulo: 'Password',
      link: '/settings/password'
    });

    const nodoNotification = new Nodo({
      titulo: 'Notification',
      link: '/settings/notification'
    });

    nodoSettings.agregarHijos(nodoAccount);
    nodoSettings.agregarHijos(nodoProfileSub);
    nodoSettings.agregarHijos(nodoSecurity);
    nodoSettings.agregarHijos(nodoPassword);
    nodoSettings.agregarHijos(nodoNotification);

    const nodoHelp = new Nodo({ titulo: 'Help' });

    const nodoFaq = new Nodo({
      titulo: "FAQ's",
      link: '/help/faq',
      componente: FaqComponent
    });

    const nodoTicket = new Nodo({
      titulo: 'Submit a Ticket',
      link: '/help/ticket'
    });

    const nodoStatus = new Nodo({
      titulo: 'Network Status',
      link: '/help/status'
    });

    nodoHelp.agregarHijos(nodoFaq);
    nodoHelp.agregarHijos(nodoTicket);
    nodoHelp.agregarHijos(nodoStatus);

    const nodoLogout = new Nodo({
      titulo: 'Logout',
      link: '/logout'
    });

    this.arbolMenu.raiz.agregarHijos(nodoProfile);
    this.arbolMenu.raiz.agregarHijos(nodoMessages);
    this.arbolMenu.raiz.agregarHijos(nodoSettings);
    this.arbolMenu.raiz.agregarHijos(nodoHelp);
    this.arbolMenu.raiz.agregarHijos(nodoLogout);
  }

  toggleMenu(nodo: Nodo): void {
    nodo.desplegado = !nodo.desplegado;
  }
}