import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TasksWindowComponent } from './tasks-window/tasks-window.component';
import {DragDropModule} from "@angular/cdk/drag-drop";
import { ProjectComponent } from './components/project/project.component';
import {MatCardModule} from "@angular/material/card";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TaskComponent } from './components/task/task.component';
import { EmailsWindowComponent } from './components/emails-window/emails-window.component';
import {HttpClientModule} from "@angular/common/http";
import { EmailComponent } from './components/email/email.component';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import { MatInputModule} from "@angular/material/input";
import { EmailRefComponent } from './components/email-ref/email-ref.component';
import { AssigneeRefComponent } from './components/assignee-ref/assignee-ref.component';
import {AngularEditorModule} from "@kolkov/angular-editor";
import { LoginWindowComponent } from './components/login-window/login-window.component';
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {CookieService} from "ngx-cookie-service";
import { NotificationWindowComponent } from './components/notification-window/notification-window.component';
import {MatRippleModule} from "@angular/material/core";
import { TaskFullWindowComponent } from './components/task-full-window/task-full-window.component';
import { EmailFullWindowComponent } from './components/email-full-window/email-full-window.component';

@NgModule({
  declarations: [
    AppComponent,
    TasksWindowComponent,
    ProjectComponent,
    TaskComponent,
    EmailsWindowComponent,
    EmailComponent,
    EmailRefComponent,
    AssigneeRefComponent,
    LoginWindowComponent,
    NotificationWindowComponent,
    TaskFullWindowComponent,
    EmailFullWindowComponent,

  ],
  imports: [
    MatCardModule,
    BrowserModule,
    AppRoutingModule,
    DragDropModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    AngularEditorModule,
    MatDialogModule,
    MatRippleModule
  ],
  providers: [
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
