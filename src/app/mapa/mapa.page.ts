import { Component, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Capacitor } from '@capacitor/core';
import { Geolocation } from '@capacitor/geolocation';

import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton
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
    IonTitle,
    IonButton,
    RouterLink
  ]
})
export class MapaPage implements AfterViewInit {

  private map!: L.Map;

  constructor(
    private route: ActivatedRoute
  ) { }

  async ngAfterViewInit() {

    console.log('========== MAPA ==========');

    try {

      console.log('📍 Inicializando GPS...');

      const posicao = await this.obterLocalizacao();

      console.log('✅ GPS obtido:', posicao);

      const latUsuario = posicao.coords.latitude;
      const lonUsuario = posicao.coords.longitude;

      console.log('📌 Latitude usuário:', latUsuario);
      console.log('📌 Longitude usuário:', lonUsuario);

      this.route.queryParams.subscribe(params => {

        console.log('📦 Parâmetros recebidos:', params);

        const latDestino = Number(params['lat']);
        const lonDestino = Number(params['lon']);

        console.log('🎯 Latitude destino:', latDestino);
        console.log('🎯 Longitude destino:', lonDestino);

        if (
          isNaN(latDestino) ||
          isNaN(lonDestino)
        ) {
          alert('Destino inválido.');
          return;
        }

        this.criarMapa(
          latUsuario,
          lonUsuario,
          latDestino,
          lonDestino
        );

      });

    } catch (erro) {

      console.error('❌ Erro completo:', erro);

      alert('Erro ao obter localização. Veja o Console (F12).');

    }

  }

  async obterLocalizacao(): Promise<any> {

    console.log('🖥️ Plataforma:', Capacitor.getPlatform());

    if (Capacitor.getPlatform() === 'web') {

      console.log('🌐 Usando GPS do navegador...');

      return new Promise((resolve, reject) => {

        navigator.geolocation.getCurrentPosition(

          (pos) => {

            console.log('✅ GPS navegador OK');

            resolve(pos);

          },

          (err) => {

            console.error('❌ Erro GPS navegador:', err);

            reject(err);

          },

          {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 0
          }

        );

      });

    }

    console.log('📱 Usando GPS do Capacitor...');

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

    console.log('🗺️ Criando mapa...');

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
      .bindPopup('📍 Você');

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
      console.log('✅ Mapa criado com sucesso!');
    }, 500);

  }

}