import { Router, RouterLink } from '@angular/router';
import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle
} from '@ionic/angular/standalone';

import { CommonModule } from '@angular/common';
import { ScreenOrientation } from '@capacitor/screen-orientation';

import { db } from '../../environments/firebase.config';

import {
  collection,
  getDocs
} from 'firebase/firestore';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    RouterLink,
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle
  ]
})
export class HomePage {

  podeCadastrarOng = false;
  ongs: any[] = [];

  constructor(
    private router: Router
  ) {
    this.travarTela();
  }

  async travarTela() {
    try {

      await ScreenOrientation.lock({
        orientation: 'portrait'
      });

    } catch (e) {

      console.log(e);

    }
  }

  async ionViewWillEnter() {

    this.verificarPermissoes();

    await this.carregarOngs();

  }

  verificarPermissoes() {

    const usuario = JSON.parse(
      localStorage.getItem('usuario') || '{}'
    );

    this.podeCadastrarOng =
      usuario.logado === true &&
      usuario.isDonoOng === true;

  }

  async carregarOngs() {

    this.ongs = [];

    const querySnapshot = await getDocs(
      collection(db, 'ong')
    );

    querySnapshot.forEach((doc) => {

      this.ongs.push({
        id: doc.id,
        ...doc.data()
      });

    });

  }

  copiarPix(chave: string) {

    navigator.clipboard.writeText(chave);

    alert('Chave PIX copiada!');

  }

  verificarLoginEAbrirMapa(cep: string) {

    const usuario = JSON.parse(
      localStorage.getItem('usuario') || '{}'
    );

    if (!usuario.logado) {

      alert(
        'Faça login para visualizar o mapa.'
      );

      this.router.navigate([
        '/login'
      ]);

      return;

    }

    this.abrirMapa(cep);

  }

  async abrirMapa(cep: string) {

    try {

      const cepLimpo =
        cep.replace(/\D/g, '');

      const viaCep =
        await fetch(
          `https://viacep.com.br/ws/${cepLimpo}/json/`
        );

      const endereco =
        await viaCep.json();

      if (endereco.erro) {

        alert('CEP não encontrado.');
        return;

      }

      const enderecoCompleto =
        `${endereco.logradouro},
        ${endereco.bairro},
        ${endereco.localidade},
        ${endereco.uf}`;

      const geoapify =
        await fetch(
          `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(enderecoCompleto)}&apiKey=273e2940c9084285bfc882d52c4c543f`
        );

      const dados =
        await geoapify.json();

      if (
        !dados.features ||
        dados.features.length === 0
      ) {

        alert(
          'Endereço não encontrado pela Geoapify.'
        );

        return;

      }

      const longitude =
        dados.features[0]
          .geometry.coordinates[0];

      const latitude =
        dados.features[0]
          .geometry.coordinates[1];

      this.router.navigate(
        ['/mapa'],
        {
          queryParams: {
            lat: latitude,
            lon: longitude
          }
        }
      );

    } catch (erro) {

      console.error(
        'Erro ao abrir mapa:',
        erro
      );

      alert(
        'Erro ao abrir mapa.'
      );

    }

  }

  logout() {

    localStorage.removeItem(
      'usuario'
    );

    this.podeCadastrarOng = false;

    this.router.navigate([
      '/login'
    ]);

  }

}