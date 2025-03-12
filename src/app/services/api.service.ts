import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = "https://sethbolf.com/API_SERVERS/thermo_server/?action=temps&id=1";

  constructor() { }


}
