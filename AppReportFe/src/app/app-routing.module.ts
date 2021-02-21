import { FormsModule } from "@angular/forms";
import { DbtestComponent } from "./dbtest/dbtest.component";
import { ApplicationsComponent } from "./applications/applications.component";
import { ReportsComponent } from "./reports/reports.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MainformComponent } from "./mainform/mainform.component";
import { RunsLogComponent } from "./runs-log/runs-log.component";
import { EditorqComponent } from "./editorq/editorq.component";
import { ContactFormComponent } from "./contact-form/contact-form.component";

const routes: Routes = [
  { path: "", component: MainformComponent },
  { path: "appform", component: MainformComponent },
  { path: "schedules", component: ReportsComponent },
  { path: "applications", component: ApplicationsComponent },
  { path: "logs", component: RunsLogComponent },
  { path: "dbtest", component: DbtestComponent },
  { path: "editor", component: EditorqComponent },
  { path: "contact", component: ContactFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
