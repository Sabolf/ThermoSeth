import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { ApiGrabber } from '../../classes/ApiGrabber';
import { Router } from '@angular/router';

// Marker Icon Definitions
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png', 
  iconSize: [15, 22],
  iconAnchor: [15, 20],
  popupAnchor: [1, -34]
});

const HotIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [15, 22],
  iconAnchor: [15, 20],
  popupAnchor: [1, -34]
});

const ColdIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [15, 22],
  iconAnchor: [15, 20],
  popupAnchor: [1, -34]
});

const AcceptableIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [15, 22],
  iconAnchor: [15, 20],
  popupAnchor: [1, -34]
});

// Apply default icon globally to all markers
L.Marker.prototype.options.icon = DefaultIcon;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  private map!: L.Map;
  private devices: any[] = [];

  constructor(private router: Router) {
    // Fetch devices data
    ApiGrabber.getAllDevices((x: any) => {
      this.devices = x;
      this.initMap();
    });
  }

  // Map initialization
  private initMap(): void {
    // Initialize the map
    this.map = L.map('map', {
      center: [53.013, 18.59],
      zoom: 13
    });

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    // Add markers for each device
    this.devices.forEach(loc => {
      const markerClass = this.getTempClass(loc.temp);

      L.marker([loc.lat, loc.lng], { icon: this.getIcon(markerClass) })
        .addTo(this.map)
        .bindTooltip(loc.name, { permanent: true, direction: 'right', className: markerClass })
        .on('click', () => this.router.navigate(['/details', loc.id ]));
    });
  }

  // Get temperature-based icon
  private getIcon(tempClass: string): L.Icon {
    switch (tempClass) {
      case 'hot':
        return HotIcon;
      case 'cold':
        return ColdIcon;
      case 'acceptable':
        return AcceptableIcon;
      default:
        return DefaultIcon;
    }
  }

  // Determine temperature class
  private getTempClass(temp: number): string {
    if (temp > 15) {
      return 'hot';
    } else if (temp <= 15 && temp >= 5) {
      return 'acceptable';
    } else {
      return 'cold';
    }
  }

  ngAfterViewInit(): void {
    // Any additional logic for after view initialization can go here
  }
}
