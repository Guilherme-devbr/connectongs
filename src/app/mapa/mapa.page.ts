import { Component, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

import { Capacitor } from '@capacitor/core';
import { Geolocation } from '@capacitor/geolocation';

import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle
} from '@ionic/angular/standalone';

import * as L from 'leaflet';

// Corrige os ícones do Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl:
    'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
});

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle
  ]
})
export class MapaPage implements AfterViewInit {

  private map!: L.Map;

  constructor(
    private route: ActivatedRoute
  ) {}

  async ngAfterViewInit() {

    try {

      console.log('📍 Inicializando GPS...');

      const posicao = await this.obterLocalizacao();

      const latUsuario = posicao.coords.latitude;
      const lonUsuario = posicao.coords.longitude;

      console.log(
        '📌 Usuário:',
        latUsuario,
        lonUsuario
      );

      this.route.queryParams.subscribe(params => {

        const latDestino = Number(params['lat']);
        const lonDestino = Number(params['lon']);

        console.log(
          '🎯 Destino:',
          latDestino,
          lonDestino
        );

        if (
          isNaN(latDestino) ||
          isNaN(lonDestino)
        ) {
          alert('Destino inválido');
          return;
        }

        this.criarMapa(
          latUsuario,
          lonUsuario,
          latDestino,
          lonDestino
        );

      });

    } catch (erro: any) {

      console.error(
        '🚨 ERRO GPS COMPLETO:',
        erro
      );

      alert(
        'Erro ao obter localização:\n\n' +
        (erro?.message || JSON.stringify(erro))
      );
    }
  }

  async obterLocalizacao(): Promise<any> {

    // Navegador
    if (Capacitor.getPlatform() === 'web') {

      return new Promise((resolve, reject) => {

        navigator.geolocation.getCurrentPosition(
          resolve,
          reject,
          {
            enableHighAccuracy: true,
            timeout: 15000
          }
        );

      });

    }

    // Android/iOS
    await Geolocation.requestPermissions();

    return await Geolocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000
    });
  }

  criarMapa(
    latUsuario: number,
    lonUsuario: number,
    latDestino: number,
    lonDestino: number
  ) {

    if (this.map) {
      this.map.remove();
    }

    this.map = L.map('map').setView(
      [latUsuario, lonUsuario],
      13
    );

    L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution: '© OpenStreetMap',
        maxZoom: 19
      }
    ).addTo(this.map);

    L.marker([latUsuario, lonUsuario])
      .addTo(this.map)
      .bindPopup('📍 Sua localização')
      .openPopup();

    L.marker([latDestino, lonDestino])
      .addTo(this.map)
      .bindPopup('🎯 Destino');

    L.polyline(
      [
        [latUsuario, lonUsuario],
        [latDestino, lonDestino]
      ],
      {
        weight: 5
      }
    ).addTo(this.map);

    const bounds = L.latLngBounds([
      [latUsuario, lonUsuario],
      [latDestino, lonDestino]
    ]);

    this.map.fitBounds(bounds, {
      padding: [50, 50]
    });

    setTimeout(() => {
      this.map.invalidateSize();
    }, 500);
  }
}