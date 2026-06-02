import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

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
import { collection, getDocs } from 'firebase/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    RouterLink
  ]
})
export class LoginPage implements OnInit {

  email: string = '';
  senha: string = '';

  constructor(
    private router: Router
  ) {}

  ngOnInit() {}

  async login() {
  try {

    const clientesRef = collection(db, 'cliente');
    const snapshot = await getDocs(clientesRef);

    let usuarioEncontrado = false;

    snapshot.forEach((documento) => {

      const dados = documento.data();

      if (
        dados.email === this.email &&
        dados.senha === this.senha
      ) {

        usuarioEncontrado = true;

        localStorage.setItem('usuario', JSON.stringify({
          nome: dados.nome,
          email: dados.email,
          isDonoOng: dados.isDonoOng,
          logado: true
        }));

        alert('Login realizado com sucesso!');
        this.router.navigate(['/home']);
      }
    });

    if (!usuarioEncontrado) {
      alert('E-mail ou senha incorretos.');
    }

  } catch (erro) {
    console.error(erro);
    alert('Erro ao fazer login');
  }
}
}