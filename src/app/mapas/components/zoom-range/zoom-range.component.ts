import { AfterViewInit, Component, ElementRef,  OnDestroy,  ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styles: [`
  .mapaRango {
    width:100%;
    height:100vh;
    position:absolute;
  }
  .row{
    position:fixed;    
    width: 400px;
    bottom:25px;
    left:25px;
    padding: 10px;
    border-radius: 5px;
    background-color: white;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
    z-index: 9999;
    color: rgba(0, 0, 0, 0.7);
  }
  `
  ]
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {

  constructor() { }
  
  // @Viewchild se usa para tomar elementos HTML con una referencia local ->  #propiedad
  @ViewChild('mapRange') divMapa!: ElementRef;
  zoomLevel: number = 16;
  mapa!: mapboxgl.Map;
  myCenter: [number, number] = [-0.2291876,39.6702607];

  ngAfterViewInit(): void {
    
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.myCenter,
      zoom: this.zoomLevel
    
    });
    // listener que se dispara con el metodo on
    this.mapa.on('zoom', () => {
      this.zoomLevel = this.mapa.getZoom()     
    });

    this.mapa.on('zoomend', () => {
      if(this.mapa.getZoom() > 18 ){
        this.mapa.zoomTo(18);
      }else if(this.mapa.getZoom() < 4 ){
        this.mapa.zoomTo(4);
      }
    });
    // movimiento del mapa
    this.mapa.on('move', (event) => {
      const target = event.target;
      // desestructuramos el array que devuelve getCenter() por componentes
      const { lng, lat } = target.getCenter();
      this.myCenter = [lng, lat];
    });

    

  }
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // esto es una regla de oro: CUANDO HAY METODOS DE ESCUCHA O LISTENERS HAY QUE CERRARLOS O SI NO TENDREMOS INNUMERABLES INSTANCIAS ABIERTAS
  // PARA ELLO ESTA EL ngOnDestroy
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  ngOnDestroy(): void {
    this.mapa.off('zoom', () => {});
    this.mapa.off('zoomend', () => {});
    this.mapa.off('move', () => {});
  }

  zoomIn() {
    this.mapa.zoomIn();
    this.zoomLevel = this.mapa.getZoom();
    
  }

  zoomOut() {
    this.mapa.zoomOut();
    this.zoomLevel = this.mapa.getZoom();
    
  }
  zoomCambio( valor: string ){
    let nuevoValor = Number(valor)
    this.mapa.zoomTo( nuevoValor );
    
  } 

}
