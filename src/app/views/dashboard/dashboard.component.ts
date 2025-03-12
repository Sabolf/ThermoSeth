import { AfterViewInit, Component, signal } from '@angular/core';
import  {ApiGrabber}  from '../../classes/ApiGrabber';
import { CommonModule, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [NgFor, CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent{
  
  public allDevices = [];
  public deviceTemp = [];
 

  constructor() {
    ApiGrabber.getAllDevices((x: any)=>{
      this.allDevices = x;
    });

    
  }

 
  
}
