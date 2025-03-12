import { Component, OnInit } from '@angular/core';
import { ApiGrabber } from '../../classes/ApiGrabber';
import { CommonModule, NgClass, NgFor } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { goodbye, greet } from '../../../utils';



@Component({
  selector: 'app-details',
  imports: [NgFor, CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit{
  public devices: any[] = [];
  public deviceTemps: any[] = [];
  deviceId!: string;
  id!: number;
  message!: string;
  constructor(private route: ActivatedRoute){
    ApiGrabber.getAllDevices((x: any) => {
      this.devices = x;
    })
  }

  ngOnInit(): void {
      this.deviceId = this.route.snapshot.paramMap.get('id')!;
      this.id = parseInt(this.deviceId)-1
      ApiGrabber.getDeviceTemp(this.id, (x: any) => {
        this.deviceTemps = x;
      })
  }
}
