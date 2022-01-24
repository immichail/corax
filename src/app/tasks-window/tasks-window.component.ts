import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Assignee, Task } from "../../models/models";
import {ProjectComponent} from "../components/project/project.component";
import {ApiService} from "../services/api.service";
import {GlobalStateService} from "../services/global-state.service";

@Component({
  selector: 'app-tasks-window',
  templateUrl: './tasks-window.component.html',
  styleUrls: ['./tasks-window.component.scss']
})
export class TasksWindowComponent implements OnInit {

  @ViewChildren(ProjectComponent) projects: QueryList<ProjectComponent> | undefined;

  public projectsList: Array<any> = [];

  constructor(private api: ApiService, private globalState: GlobalStateService) { }

  ngOnInit(): void {
    this.refreshProjects()
  }

  public selectedProject: string | undefined;

  refreshProjects() {
    this.api.getProjects('1').subscribe((data: any) => {
      this.projectsList = data['res']

      this.projects?.forEach((e: ProjectComponent) => {
        e.getTasks()
      })
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
      'assignees': ['1']
    }).subscribe((data) => {
      this.refreshProjects()
    })
  }

}
