import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-apis',
  templateUrl: './apis.page.html',
  styleUrls: ['./apis.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonIcon, RouterLink]
})
export class APISPage implements OnInit {

  constructor(private router: Router) { }

  logout() {

    localStorage.removeItem('usuario');

    // ou localStorage.clear();

    this.router.navigate(['/login']);
  }

  ngOnInit() {
  }

}
