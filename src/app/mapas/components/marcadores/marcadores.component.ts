import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface MarcadorColor {
  color: string;
  marker?: mapboxgl.Marker;
  centro?: [number, number]
}

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [`
  .mapa {
    width:100%;
    height:100vh;
    position:absolute;
  }

  .list-group {
    position: fixed;
    width: 180px;
    top:80px;
    right:20px;
    z-index:99;
    cursor: pointer;
  }
  .list-group-item {
    background-color: transparent;
    backdrop-filter: blur(10px);
    
    

  }
  `
  ]
})
export class MarcadoresComponent implements AfterViewInit {

  // @Viewchild se usa para tomar elementos HTML con una referencia local ->  #propiedad
  @ViewChild('mapa') divMapa!: ElementRef;
  zoomLevel: number = 15;
  mapa!: mapboxgl.Map;
  center: [number, number] = [-0.2291876,39.6702607];

  // Arreglo de marcadores
  marcadores: MarcadorColor[] = [];
  
  constructor() { }
  
  // AFTERVIEWINIT
  ngAfterViewInit(): void {
    
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel
    
    });

    this.leerLocalStorage();

    // const markerHtml: HTMLElement = document.createElement('div');
    // markerHtml.innerHTML = "Hola Mundo!"

    // new mapboxgl.Marker({
    //   //element: markerHtml,
    //   draggable: true,
    //   color: '#ff6961'
    // }).setLngLat(this.center)
    //   .addTo(this.mapa); // add the marker to the map


    

      
  }

  // ADD MARKER
  agregarMarcador() {

    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));

    const nuevoMarcador = new mapboxgl.Marker({
      draggable: true,
      color // se omite el color: porque es redundate y se llama igual
    }) 
      .setLngLat(this.center)
      .addTo(this.mapa);

    this.marcadores.push({
      color,
      marker: nuevoMarcador
    });

    this.guardarMarcadoresLocalStorage();

    nuevoMarcador.on('dragend', () => {
      this.guardarMarcadoresLocalStorage();
    })
  }
 
  // GO TO MARKER
  irMarcador(marker: mapboxgl.Marker){

    this.mapa.flyTo({
      center: marker!.getLngLat()
    });

  }

  // SAVE STORAGE
  guardarMarcadoresLocalStorage() {

    const lngLatArr: MarcadorColor[] = [];

    this.marcadores.forEach(m => {

      const color = m.color;
      const { lng, lat } = m.marker!.getLngLat();
      lngLatArr.push({
        color: color,
        centro: [ lng , lat ]
      });

    });

    localStorage.setItem('marcadores', JSON.stringify( lngLatArr ));

  }
  
  // READ STORAGE
  leerLocalStorage() {

    if(!localStorage.getItem('marcadores')) {
      return;
    }
    const lngLatArr: MarcadorColor[] = JSON.parse( localStorage.getItem('marcadores')!);   
    lngLatArr.forEach( m => {

      const newMarker = new mapboxgl.Marker({
        color: m.color,
        draggable: true
      })
      .setLngLat(m.centro!)
      .addTo( this.mapa )

      this.marcadores.push({
        marker: newMarker,
        color: m.color
      })

      newMarker.on('dragend', () => {
        this.guardarMarcadoresLocalStorage();
      })

    });
  }

  // DELETE MARKER
  borrarMarcador( i: number ) {     
    
    this.marcadores[i].marker?.remove();
    this.marcadores.splice( i, 1);
    this.guardarMarcadoresLocalStorage();

  }

    

    

}
