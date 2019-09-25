import { Component, OnInit } from '@angular/core';
import { ForgroundControllerService } from '../forground-controller.service';

@Component({
  selector: 'app-foreground',
  templateUrl: './foreground.component.html',
  styleUrls: ['./foreground.component.css']
})
export class ForegroundComponent implements OnInit {

  topHeader = 'temp';

  constructor(private fgController: ForgroundControllerService) { }

  ngOnInit() {
    this.fgController.headerRequest.subscribe(topHeader => {this.topHeader = topHeader});
  }

}
