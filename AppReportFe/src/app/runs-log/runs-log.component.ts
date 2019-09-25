import { ForgroundControllerService } from './../forground-controller.service';
import { Component, OnInit } from '@angular/core';
import { PostJobService } from '../post-job.service';
import { Run } from '../models/runs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'runs-log',
  templateUrl: './runs-log.component.html',
  styleUrls: ['./runs-log.component.css']
})
export class RunsLogComponent implements OnInit {
  logs: Run[];
  topHeader = 'Run Logs';

  constructor(
    private service: PostJobService,
    private fgController: ForgroundControllerService,
    private datepipe: DatePipe
  ) {}

  logGetDate(logDate) {
    console.log('Log Date :');
    console.log(logDate);
    const date = new Date(logDate);
    return this.datepipe.transform(date, 'MM-dd-yyyy hh:mm');
  }

  ngOnInit() {
    this.service.getLogs().subscribe(
      response => {
        console.log('Logs: ');
        console.log(response);
        this.logs = response;
      },
      error => {
        console.log('Error in get logs response : ', error);
      }
    );
    this.fgController.setTopHeader(this.topHeader);
    this.fgController.requestTopHeader();
  }
}
