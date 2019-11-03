import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OneApp } from './models/application';

@Injectable({
  providedIn: 'root'
})
export class AppserviceService {
  private newAppUrl = 'http://localhost:3000/newapp';
  private getAppsUrl = 'http://localhost:3000/listapps';
  private delAppUrl = 'http://localhost:3000/delapp';

  constructor(private http: HttpClient) {}

  createApp(appData) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(this.newAppUrl, JSON.stringify(appData), httpOptions);
  }

  getApps() {
    return this.http.get<OneApp[]>(this.getAppsUrl);
  }

  delApp(event) {
    console.log('Event :');
    console.log(event);
    const delUrlUpdated = this.delAppUrl + '/' + event.id;
    return this.http.get(delUrlUpdated.trim());
  }
}
