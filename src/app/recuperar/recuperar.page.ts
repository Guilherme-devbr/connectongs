import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ScreenOrientation } from '@capacitor/screen-orientation';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonInput,
  IonButton
} from '@ionic/angular/standalone';

import { db } from '../../environments/firebase.config';

import {
  collection,
  query,
  where,
  getDocs,
  updateDoc
} from 'firebase/firestore';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    CommonModule,
    FormsModule,
    RouterLink
  ]
})
export class RecuperarPage {

  email: string = '';
  senha: string = '';

  constructor() {this.travarTela()}

  async travarTela() {
  await ScreenOrientation.lock({
    orientation: 'portrait'
  });
}
  async recuperarSenha() {

    if (!this.email || !this.senha) {
      alert('Preencha todos os campos.');
      return;
    }

    try {

      const q = query(
        collection(db, 'cliente'),
        where('email', '==', this.email)
      );

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        alert('Usuário não encontrado.');
        return;
      }

      const documento = querySnapshot.docs[0];

      await updateDoc(documento.ref, {
        senha: this.senha
      });

      alert('Senha alterada com sucesso!');

      this.email = '';
      this.senha = '';

    } catch (erro) {
      console.error(erro);
      alert('Erro ao alterar senha.');
    }
  }
}