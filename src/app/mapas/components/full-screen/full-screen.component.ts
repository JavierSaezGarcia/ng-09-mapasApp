import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';




@Component({
  selector: 'app-full-screen',
  templateUrl: './full-screen.component.html',
  styles: [`
  #map {
    width:100%;
    height:100vh;
    position:absolute;
  }
  `
  ]
})
export class FullScreenComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    
    var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-0.2291876,39.6702607],
    zoom: 16
       


  });
  }

}
