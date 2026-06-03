import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
import { RouterLink } from '@angular/router';
import { ScreenOrientation } from '@capacitor/screen-orientation';
import { db } from '../../environments/firebase.config';

import {
  collection,
  addDoc
} from 'firebase/firestore';

@Component({
  selector: 'app-ong',
  templateUrl: './ong.page.html',
  styleUrls: ['./ong.page.scss'],
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
export class OngPage implements OnInit {

  nome = '';
  descricao = '';
  telefone = '';
  redesSociais = '';
  pix = '';
  cep = '';
  imagem = '';

  constructor() {this.travarTela()}
async travarTela() {
  await ScreenOrientation.lock({
    orientation: 'portrait'
  });
}
  ngOnInit() {}

  formatarCep(event: any) {

    let valor = event.target.value || '';

    valor = valor.replace(/\D/g, '');

    if (valor.length > 5) {
      valor = valor.replace(/^(\d{5})(\d)/, '$1-$2');
    }

    this.cep = valor;
  }

  async validarCep(): Promise<boolean> {

    const cepLimpo = this.cep.replace(/\D/g, '');

    if (cepLimpo.length !== 8) {
      return false;
    }

    try {

      const resposta = await fetch(
        `https://viacep.com.br/ws/${cepLimpo}/json/`
      );

      const dados = await resposta.json();

      return !dados.erro;

    } catch {
      return false;
    }

  }

  async cadastrarOng() {

    if (
      !this.nome ||
      !this.descricao ||
      !this.telefone ||
      !this.pix ||
      !this.cep
    ) {
      alert('Preencha todos os campos obrigatórios.');
      return;
    }

    const cepValido = await this.validarCep();

    if (!cepValido) {
      alert('CEP inválido.');
      return;
    }

    try {

      await addDoc(collection(db, 'ong'), {
        nome: this.nome,
        descricao: this.descricao,
        telefone: this.telefone,
        redesSociais: this.redesSociais,
        pix: this.pix,
        cep: this.cep,
        imagem: this.imagem,
      });

      alert('ONG cadastrada com sucesso!');

      this.nome = '';
      this.descricao = '';
      this.telefone = '';
      this.redesSociais = '';
      this.pix = '';
      this.cep = '';
      this.imagem = '';

    } catch (erro) {

      console.error('Erro ao cadastrar ONG:', erro);
      alert('Erro ao cadastrar ONG.');

    }
  }
}