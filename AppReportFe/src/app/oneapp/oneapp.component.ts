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

  constructor() {}

  ngOnInit() {
    console.log('appData : ');
    console.log(this.appData);
  }

  onBinClick() {
    this.binClick.emit(this.appData);
  }
}
