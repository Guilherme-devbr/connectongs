import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScreenOrientation } from '@capacitor/screen-orientation';
import { db } from '../../environments/firebase.config';
import { collection, addDoc } from 'firebase/firestore';

import {
  IonContent,
  IonHeader,
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
    IonContent,
    IonHeader,
    IonToolbar,
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

  nome: string = '';
  email: string = '';
  senha: string = '';
  confirmarSenha: string = '';
  isDonoOng: boolean = false;

  constructor() {this.travarTela()}
async travarTela() {
  await ScreenOrientation.lock({
    orientation: 'portrait'
  });
}
  async registrar() {

    if (!this.nome || !this.email || !this.senha) {
      alert('Preencha todos os campos!');
      return;
    }

    if (this.senha !== this.confirmarSenha) {
      alert('As senhas não coincidem!');
      return;
    }

    try {

      // Salva no Firebase
      await addDoc(collection(db, 'cliente'), {
        nome: this.nome,
        email: this.email,
        senha: this.senha,
        isDonoOng: this.isDonoOng
      });

      // Salva no LocalStorage
      const usuario = {
        nome: this.nome,
        email: this.email,
        senha: this.senha,
        logado: true,
        isDonoOng: this.isDonoOng
      };

      localStorage.setItem(
        'usuario',
        JSON.stringify(usuario)
      );

      alert('Cadastro realizado com sucesso!');

      // Limpa formulário
      this.nome = '';
      this.email = '';
      this.senha = '';
      this.confirmarSenha = '';
      this.isDonoOng = false;

    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao salvar no Firebase');
    }
  }
}