import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonButton
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonButton, CommonModule, FormsModule, RouterLink
  ]
})
export class RecuperarPage implements OnInit {

  email: string = '';

  constructor() { }

  recuperarSenha() {
    console.log('E-mail informado:', this.email);
  }

  ngOnInit() { }

}