import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonInput,
  IonButton,
  IonLabel,
  IonCheckbox
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonInput, IonButton, IonLabel, CommonModule, FormsModule, RouterLink, IonCheckbox
  ]
})
export class RegistroPage implements OnInit {

  nome: string = '';
  email: string = '';
  senha: string = '';
  confirmarSenha: string = '';
  isDonoOng: boolean = false;
  isDoador: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  registrar() {
    if (this.senha !== this.confirmarSenha) {
      alert('As senhas não coincidem!');
      return;
    }

    console.log('Usuário registrado:', {
      nome: this.nome,
      email: this.email,
      senha: this.senha,
      donoOng: this.isDonoOng,
      doador: this.isDoador
    });
  }
}