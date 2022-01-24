import {Component, ViewChild} from '@angular/core';
import {TasksWindowComponent} from "./tasks-window/tasks-window.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'corax';

  @ViewChild('tasksWindow', {static: false}) tasksWindow: TasksWindowComponent | undefined;

  onEmailDrag(event: any) {
    this.tasksWindow?.checkEmailDrag(event);
  }

  onEmailDropped(event: any) {
    this.tasksWindow?.dropEmail(event)
  }

}
