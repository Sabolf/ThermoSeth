import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { ApiGrabber } from '../../classes/ApiGrabber';
import { Router } from '@angular/router';

// Fix for missing marker icons in Angular
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png', // Ensure it's a valid URL
  iconSize: [15, 22], // Default Leaflet icon size
  iconAnchor: [15, 20], // Center the bottom of the icon at the marker location
  popupAnchor: [1, -34] // Adjust the popup position relative to the icon
});
L.Marker.prototype.options.icon = DefaultIcon; // Apply fix globally

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  private map!: L.Map;
  private devices: any[] = [];
  
  
  private getTempClass(temp: number): string{
    if (temp > 15){return "hot"}
    else if(temp <= 15 && temp >= 5){return "acceptable"}
    else{return "cold"}
  }

  constructor(private router: Router){
    ApiGrabber.getAllDevices((x: any)=> {
      this.devices = x
      this.initMap()
    })
  }

  private initMap(): void {

    
    //map is the html element that this is binded to
    this.map = L.map('map', {
      center: [53.013, 18.59], 
      zoom: 13, 
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    this.devices.forEach(loc => {
      const markerClass = this.getTempClass(loc.temp);
      
      L.marker([loc.lat, loc.lng])
        .addTo(this.map)
        .bindTooltip(loc.name, {permanent: true, direction: "right", className: markerClass,})
        .on('click', () =>{this.router.navigate(['/details', loc.id ])})
      
    });
 
  }

  ngAfterViewInit(): void {
    
    
  }
}
