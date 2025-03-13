import { Component, OnInit } from '@angular/core';
import { ApiGrabber } from '../../classes/ApiGrabber';
import { CommonModule, NgFor } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

declare const Plotly: any; // Use Plotly globally (loaded from a CDN in index.html)

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [NgFor, CommonModule],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  //Will hold all the devices
  public devices: any[] = [];
  //Will hold the array of Temps and Time stamps
  public deviceTemps: any[] = [];
  //Only Temps
  public onlyTemp: any[] = [];
  //Only Time Stamps
  public onlyDate: any[] = [];

  deviceName = "";

  //Id of device
  deviceId!: string;
  id!: number;

  //Layouy of the graph
  layout = {
    title: `Current Temps of ${this.deviceName}`,
    xaxis: { title: 'Time', autorange: true },
    yaxis: { title: 'Temperature (°C)', autorange: true }
  };
 

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.deviceId = this.route.snapshot.paramMap.get('id')!;
    this.id = parseInt(this.deviceId) - 1;
  

    ApiGrabber.getAllDevices((x: any) => {
      this.devices = x;
    });

    this.getDeviceTemps(); 

    
    
  }

  getDeviceTemps() {
    ApiGrabber.getDeviceTemp(this.id, (x: any) => {
      this.deviceTemps = x;
      this.onlyTemp = this.deviceTemps.map(item => item.temp);
      this.onlyDate = this.deviceTemps.map(item => item.date_time);

      this.createGraph(); 
    });
  }

  createGraph() {
    const data = [{
      x: this.onlyDate, 
      y: this.onlyTemp, 
      type: 'scatter',
    }];

    this.layout.title = this.devices[this.id].name
    Plotly.newPlot('graph', data, this.layout);
  }
}
