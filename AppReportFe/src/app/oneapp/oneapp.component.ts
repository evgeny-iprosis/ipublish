import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { OneApp } from '../models/application';

@Component({
  selector: 'app-oneapp',
  templateUrl: './oneapp.component.html',
  styleUrls: ['./oneapp.component.css']
})
export class OneappComponent implements OnInit {
  @Input() appData: OneApp;
  @Output() binClick = new EventEmitter();

  appValue = ''; // will be alternatively cuid or url

  constructor() {}

  ngOnInit() {
    this.appValue = this.appData.cuid;
    if (!this.appValue) {
      this.appValue = this.appData.url;
    }
  }

  onBinClick() {
    this.binClick.emit(this.appData);
  }
}
