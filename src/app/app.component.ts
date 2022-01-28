import {Component, ViewChild} from '@angular/core';
import {TasksWindowComponent} from "./tasks-window/tasks-window.component";
import {LoginWindowComponent} from "./components/login-window/login-window.component";
import {MatDialog} from "@angular/material/dialog";
import {CookieService} from "ngx-cookie-service";
import {GlobalStateService} from "./services/global-state.service";
import {EmailsWindowComponent} from "./components/emails-window/emails-window.component";
import {ApiService} from "./services/api.service";
import {TaskFullWindowComponent} from "./components/task-full-window/task-full-window.component";
import {Email} from "../models/models";
import {EmailFullWindowComponent} from "./components/email-full-window/email-full-window.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'corax';

  @ViewChild('tasksWindow', {static: false}) tasksWindow: TasksWindowComponent | undefined;
  @ViewChild('emailsWindow', {static: false}) emailsWindow: EmailsWindowComponent | undefined;

  onEmailDrag(event: any) {
    this.tasksWindow?.checkEmailDrag(event);
  }

  onEmailDropped(event: any) {
    this.tasksWindow?.dropEmail(event)
  }

  constructor(public dialog: MatDialog, private api: ApiService, private globalState: GlobalStateService, private cookie: CookieService) {
  }

  ngOnInit() {
    let gotActiveUser = false;
    if (!this.cookie.check('user_id')) {
      this.askLogin();
    }
    if (this.cookie.check('user_id')) {
      this.api.checkUser(this.cookie.get('user_id')).subscribe((data: any) => {
        if (data['res']) {
          this.registerUser()
        } else {
          this.askLogin()
        }
      })
    }
  }

  registerUser() {
    this.globalState.user_id = this.cookie.get('user_id');
    this.tasksWindow?.refreshProjects();
    this.emailsWindow?.refresh();

    this.api.getDependant(this.globalState.user_id).subscribe((data: any) => {
      this.globalState.dependant = data['res'];
    })

    // let dialogRef = this.dialog.open(EmailFullWindowComponent, {
    //   height: '75vh',
    //   width: '30vw',
    //   data: {
    //     message_id: '<0a1ce23a1dd04e2d8f57ffb227895c77@cspfmba.ru>'
    //   }
    // });
  }

  askLogin() {
    let dialogRef = this.dialog.open(LoginWindowComponent, {
      height: '400px',
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(() => {
      this.registerUser()
    })
  }


  //<139a5e30b99c4f79b57f8dc3de58ecab@cspfmba.ru>

}
