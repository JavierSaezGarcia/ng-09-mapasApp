import { Component, OnInit } from '@angular/core';


interface Propiedad {
  titulo: string;
  descripcion: string;
  lngLat: [number, number];
}

@Component({
  selector: 'app-propiedades',
  templateUrl: './propiedades.component.html',
  styles: [`
  .row-container {
    margin-top:50px;
    margin-left:50px;
  }
  `
  ]
})
export class PropiedadesComponent {

  constructor() { }

  propiedades: Propiedad[] = [
    {
      titulo: 'Casa residencial, Canadá',
      descripcion: 'Bella propiedad en Katana, Canadá',
      lngLat: [ -75.92722289474008, 45.280015511264466]
    },
    {
      titulo: 'Casa de playa, México',
      descripcion: 'Hermosa casa de playa en Acapulco, México',
      lngLat: [ -99.91287720907991, 16.828940930185748]
    },
    {
      titulo: 'Apartamento, Argentina',
      descripcion: 'Lujoso apartamento en el corazón de Buenos Aires, Argentina',
      lngLat: [ -58.430166677283445, -34.57150108832866 ]
    },
    {
      titulo: 'Local comercial, España',
      descripcion: 'Local comercial disponible en Madrid, España, cerca de El Jardín Secreto.',
      lngLat: [ -3.7112735618380177, 40.42567285425766 ]
    },    
    {
      titulo: 'El Micalet',
      descripcion: 'Lugar de interés histórico. Pça. de la Reina, s/n, 46001 València, Valencia',
      lngLat: [ -0.3755454693184946, 39.47610176340438  ]
    },    
    {
      titulo: 'Museo Guggenheim Bilbao',
      descripcion: 'Museo de titanio y cristal luminoso, diseñado por Frank Gehry, que alberga obras de arte del s. XX.',
      lngLat: [ -2.9340010713425806, 43.268862598025535  ]
    },    
    {
      titulo: 'Catedral de Santiago de Compostela',
      descripcion: 'Gran catedral románica y lugar de peregrinaje famoso por su pórtico arqueado esculpido por el Maestro Mateo',
      lngLat: [ -8.54465193075195, 42.88080844753971 ]
    },    
    {
      titulo: 'Plaza Mayor de Vic',
      descripcion: 'Carrer de la Ciutat, 1, 08500 Vic, Barcelona',
      lngLat: [ 2.2543273134020034, 41.930682359926436  ]
    }
  ]


}
