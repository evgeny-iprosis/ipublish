import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  private newRoleUrl = 'http://localhost:3000/newapp';

  constructor(private http: HttpClient) {}

  createRole(roleData) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(
      this.newRoleUrl,
      JSON.stringify(roleData),
      httpOptions
    );
  }
}
