import { Component, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

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

  ngAfterViewInit() {

    console.log('Mapa carregado');

    this.route.queryParams.subscribe(params => {

      const latDestino =
        Number(params['lat']);

      const lonDestino =
        Number(params['lon']);

      console.log(
        'Destino:',
        latDestino,
        lonDestino
      );

      navigator.geolocation.getCurrentPosition(

        (posicao) => {

          const latUsuario =
            posicao.coords.latitude;

          const lonUsuario =
            posicao.coords.longitude;

          console.log(
            'Usuário:',
            latUsuario,
            lonUsuario
          );

          this.criarMapa(
            latUsuario,
            lonUsuario,
            latDestino,
            lonDestino
          );

        },

        (erro) => {

          console.error(erro);

          alert(
            'Permita o acesso à localização.'
          );

        }

      );

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

    setTimeout(() => {
      this.map.invalidateSize();
    }, 300);

    L.tileLayer(
      'https://maps.geoapify.com/v1/tile/osm-carto/{z}/{x}/{y}.png?apiKey=273e2940c9084285bfc882d52c4c543f',
      {
        maxZoom: 20,
        attribution: '© Geoapify'
      }
    ).addTo(this.map);

    // Marcador usuário
    L.marker([
      latUsuario,
      lonUsuario
    ])
      .addTo(this.map)
      .bindPopup('Sua localização');

    // Marcador ONG
    L.marker([
      latDestino,
      lonDestino
    ])
      .addTo(this.map)
      .bindPopup('ONG');

    // Linha ligando os pontos
    L.polyline(
      [
        [latUsuario, lonUsuario],
        [latDestino, lonDestino]
      ],
      {
        weight: 5
      }
    ).addTo(this.map);

    // Ajusta o zoom para mostrar os dois pontos
    const bounds = L.latLngBounds([
      [latUsuario, lonUsuario],
      [latDestino, lonDestino]
    ]);

    this.map.fitBounds(
      bounds,
      {
        padding: [50, 50]
      }
    );

  }

}