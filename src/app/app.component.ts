import {Component, ViewChild} from '@angular/core';
import {TasksWindowComponent} from "./tasks-window/tasks-window.component";
import {LoginWindowComponent} from "./components/login-window/login-window.component";
import {MatDialog} from "@angular/material/dialog";
import {CookieService} from "ngx-cookie-service";
import {GlobalStateService} from "./services/global-state.service";
import {EmailsWindowComponent} from "./components/emails-window/emails-window.component";
import {ApiService} from "./services/api.service";
import {TaskFullWindowComponent} from "./components/task-full-window/task-full-window.component";

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

    this.openTaskFullWindow('8403e214-7c08-4560-953f-fcb87d08ab7b');
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

  openTaskFullWindow(task_id: string) {
    let dialogRef = this.dialog.open(TaskFullWindowComponent, {
      height: '75vh',
      width: '30vw',
      data: {
        task_id: task_id
      }
    });
  }

}
