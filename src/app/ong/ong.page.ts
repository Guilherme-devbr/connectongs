import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonButton
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-ong',
  templateUrl: './ong.page.html',
  styleUrls: ['./ong.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonButton, CommonModule, FormsModule, RouterLink
  ]
})
export class OngPage implements OnInit {

  nome = '';
  descricao = '';
  telefone = '';
  redesSociais = '';
  pix = '';
  endereco = '';
  imagem = '';

  cadastrarOng() {

    const ong = {
      nome: this.nome,
      descricao: this.descricao,
      telefone: this.telefone,
      redesSociais: this.redesSociais,
      pix: this.pix,
      endereco: this.endereco,
      imagem: this.imagem
    };

    console.log(ong);

  }

  constructor() { }

  ngOnInit() {
  }

}
