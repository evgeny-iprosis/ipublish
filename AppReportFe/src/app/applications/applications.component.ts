import { Schedule } from './../models/schedule';
import { ApproveDialogComponent } from './../approve-dialog/approve-dialog.component';
import { YesNoDialogComponent } from './../yes-no-dialog/yes-no-dialog.component';
import { AppserviceService } from './../appservice.service';
import { Component, OnInit } from '@angular/core';
import { OneApp } from '../models/application';
import { ForgroundControllerService } from '../forground-controller.service';
import { MatDialog } from '@angular/material';
import { forkJoin } from 'rxjs';
import { PostJobService } from '../post-job.service';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent implements OnInit {
  apps: OneApp[];
  schedules: Schedule[];
  newAppData: OneApp = { id: 0, name: '', url: '', cuid: '' };
  newAppFormOn = false;
  topHeader = 'Application Manager';
  appType = 'CUID';
  placeText = 'Enter CUID';

  constructor(
    private appService: AppserviceService,
    private scheduleService: PostJobService,
    private fgController: ForgroundControllerService,
    private dialog: MatDialog
  ) {}

  updateList() {
    forkJoin([
      this.appService.getApps(),
      this.scheduleService.getSchedules()
    ]).subscribe(
      results => {
        this.apps = results[0];
        this.schedules = results[1];
      },
      error => {
        console.log('Error in getApps response : ', error);
      }
    );
  }

  newAppFormControl(value) {
    if (value) {
      this.newAppFormOn = true;
    } else {
      this.newAppFormOn = false;
    }
  }

  createApp() {
    if (!this.newAppData.name || !this.newAppData.url) {
      console.log('Fields can not be empty ! ');
      return;
    }

    if (this.appType === 'URL') {
      this.newAppData.cuid = '';
    } else {
      this.newAppData.cuid = this.newAppData.url;
      this.newAppData.url = '';
    }

    this.appService.createApp(this.newAppData).subscribe(
      response => {
        console.log('Got response from new app: ');
        console.log(response);
        this.updateList();
      },
      error => {
        console.log('Error is response : ', error);
      }
    );
  }

  onBinClick(event) {
    this.appService.delApp(event).subscribe(
      response => {
        this.updateList();
      },
      error => {
        console.log('Error deleting the app : ', error);
      }
    );
  }

  onAppDeleteDialog(event) {
    const that = this;
    let okDelete = true;
    const appId = event.id;
    for (let i = 0; i < this.schedules.length; i++) {
      if (this.schedules[i].appId === appId) {
        okDelete = false;
        break;
      }
    }
    if (okDelete) {
      this.dialog
        .open(YesNoDialogComponent)
        .afterClosed()
        .subscribe(result => {
          if (result === 'Yes') {
            that.onBinClick(event);
          }
        });
    } else {
      this.dialog
        .open(ApproveDialogComponent)
        .afterClosed()
        .subscribe(result => {
          console.log('Delete app : ');
          console.log(event);
        });
    }
  }

  ngOnInit() {
    this.updateList();
    this.fgController.setTopHeader(this.topHeader);
    this.fgController.requestTopHeader();
  }
}
