import {Component, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Assignee, Task } from "../../models/models";
import {ProjectComponent} from "../components/project/project.component";
import {ApiService} from "../services/api.service";
import {GlobalStateService} from "../services/global-state.service";
import {NotificationWindowComponent} from "../components/notification-window/notification-window.component";

@Component({
  selector: 'app-tasks-window',
  templateUrl: './tasks-window.component.html',
  styleUrls: ['./tasks-window.component.scss']
})
export class TasksWindowComponent implements OnInit {

  @ViewChild('notificationWindow', {static: false}) notificationWindow: NotificationWindowComponent | undefined;
  @ViewChildren(ProjectComponent) projects: QueryList<ProjectComponent> | undefined;

  public projectsList: Array<any> = [];
  public notificationWindowVisible = false;

  constructor(private api: ApiService, private globalState: GlobalStateService) { }

  ngOnInit(): void {
    this.refreshProjects()
  }

  public selectedProject: string | undefined;

  refreshProjects() {
    this.api.getProjects().subscribe((data: any) => {
      this.projectsList = data['res']

      this.projects?.forEach((e: ProjectComponent) => {
        e.getTasks()
      })

      this.notificationWindow?.refresh();
    })
  }

  checkEmailDrag(event: any) {
    if (this.projects != undefined) {
      this.projects.forEach((e) => {
        if (e.checkEmailDrag(event)) this.selectedProject = e.project.id;
      })
    }
  }

  dropEmail(event: any) {
    if (this.projects != undefined) {
      this.projects.forEach((e) => {
        e.dropEmail(event);
      })
    }
  }

  addProject() {
    this.api.addProject({
      'name': '<Введите название проекта>',
      'assignees': []
    }).subscribe((data) => {
      this.refreshProjects()
    })
  }

  toggleNotificationWindow() {
    this.notificationWindowVisible = !this.notificationWindowVisible;
  }

}
