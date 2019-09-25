import { Schedule } from './models/schedule';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransFormService {
  formData = new Schedule(
    0,
    0,
    'address@mail.com',
    '' + new Date(),
    3,
    60000,
    '',
    '',
    0,
    800,
    600,
    '',
    1
  );

  constructor() {}

  getFormData() {
    return this.formData;
  }

  setFormData(data) {
    Object.assign(this.formData, data);
    console.log('New form data : ');
    console.log(this.formData);
  }
}
