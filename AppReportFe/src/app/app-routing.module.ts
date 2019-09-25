import { ApplicationsComponent } from './applications/applications.component';
import { ReportsComponent } from './reports/reports.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainformComponent } from './mainform/mainform.component';
import { RunsLogComponent } from './runs-log/runs-log.component';

const routes: Routes = [
  { path: 'appform', component: MainformComponent },
  { path: 'schedules', component: ReportsComponent },
  { path: 'applications', component: ApplicationsComponent },
  { path: 'logs', component: RunsLogComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
