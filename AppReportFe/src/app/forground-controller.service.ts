import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ForgroundControllerService {
  topHeader = '';

  @Output() headerRequest = new EventEmitter();

  constructor() {}

  requestTopHeader() {
    this.headerRequest.emit(this.topHeader);
  }

  setTopHeader(header: string) {
    this.topHeader = header;
  }
}
