import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { app } from '../../environments/firebase.config';
import { db } from '../../environments/firebase.config';
import { collection, addDoc } from 'firebase/firestore';
import {
  IonContent,
  IonHeader,
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
    IonContent,
    IonHeader,
    IonItem,
    IonInput,
    IonButton,
    IonLabel,
    IonCheckbox,
    CommonModule,
    FormsModule,
    RouterLink
  ]
})
export class RegistroPage {

  nome = '';
  email = '';
  senha = '';
  confirmarSenha = '';
  isDonoOng = false;

  async registrar() {
  if (this.senha !== this.confirmarSenha) {
    alert('As senhas não coincidem!');
    return;
  }

  try {
    await addDoc(collection(db, 'cliente'), {
      nome: this.nome,
      email: this.email,
      senha: this.senha,
      isDonoOng: this.isDonoOng,
    });

    alert('Cadastro realizado com sucesso!');

    this.nome = '';
    this.email = '';
    this.senha = '';
    this.confirmarSenha = '';
    this.isDonoOng = false;

  } catch (error) {
    console.error(error);
    alert('Erro ao salvar no Firebase');
  }
}
}