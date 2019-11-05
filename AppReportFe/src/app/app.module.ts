import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainformComponent } from './mainform/mainform.component';
import { FormsModule } from '@angular/forms';
import { BackgroundComponent } from './background/background.component';
import { MidgroundComponent } from './midground/midground.component';
import { ForegroundComponent } from './foreground/foreground.component';
import { OverlayComponent } from './overlay/overlay.component';
import { PostJobService } from './post-job.service';
import { HttpClientModule } from '@angular/common/http';
import { ReportsComponent } from './reports/reports.component';
import { TransFormService } from './trans-form.service';
import { ApplicationsComponent } from './applications/applications.component';
import { OneappComponent } from './oneapp/oneapp.component';
import { AppserviceService } from './appservice.service';
import { AppSchedulesComponent } from './app-schedules/app-schedules.component';
import { DatePipe } from '@angular/common';
import { MatDialogModule, MatButtonModule } from '@angular/material';
import { YesNoDialogComponent } from './yes-no-dialog/yes-no-dialog.component';
import { ApproveDialogComponent } from './approve-dialog/approve-dialog.component';
import { RunsLogComponent } from './runs-log/runs-log.component';
import { DbtestComponent } from './dbtest/dbtest.component';

@NgModule({
  declarations: [
    AppComponent,
    MainformComponent,
    BackgroundComponent,
    MidgroundComponent,
    ForegroundComponent,
    OverlayComponent,
    ReportsComponent,
    ApplicationsComponent,
    OneappComponent,
    AppSchedulesComponent,
    YesNoDialogComponent,
    ApproveDialogComponent,
    RunsLogComponent,
    DbtestComponent
  ],
  entryComponents: [YesNoDialogComponent, ApproveDialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatButtonModule
  ],
  providers: [PostJobService, TransFormService, AppserviceService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {}
