import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonIcon
} from '@ionic/angular/standalone';

import { ScreenOrientation } from '@capacitor/screen-orientation';

@Component({
  selector: 'app-apis',
  templateUrl: './apis.page.html',
  styleUrls: ['./apis.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonButton,
    IonIcon,
    RouterLink
  ]
})
export class APISPage implements OnInit {

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

    } catch (erro) {

      console.log(
        'Erro ao travar orientação:',
        erro
      );

    }
  }

  logout() {

    localStorage.removeItem('usuario');

    this.router.navigate([
      '/login'
    ]);

  }

  ngOnInit() {}

}