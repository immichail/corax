import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import { Task } from "../../../models/models";
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  public selected = false;

  public editMode = true;
  @Input() project: any | {};
  @ViewChild('projectActiveField') projectActiveField: ElementRef | undefined;

  tasks = [];

  theming = {
    'card': {
      //'background-color': 'gray'
    }
  }

  constructor(private api: ApiService, private el: ElementRef) { }

  ngOnInit(): void {
    this.getTasks()
  }

  getTasks() {
    this.api.getProjectTasks(this.project.id).subscribe((data: any) => {
      this.tasks = data['res'].map((e: any) => e)
    });
  }

  checkEmailDrag(event: any) {
    let activeField = this.projectActiveField?.nativeElement;
    let r = ((event.pointerPosition.x > activeField.offsetLeft)&&(event.pointerPosition.x < activeField.offsetLeft + activeField.offsetWidth)&&
      (event.pointerPosition.y > activeField.offsetTop)&&(event.pointerPosition.y < activeField.offsetTop + activeField.offsetHeight));
    if (r) this.selected = true;
    else this.selected = false;
    return r;
  }

  dropEmail(event: any) {
    if (this.selected) {
      this.selected = false;
      this.addTask(event.email);
    }
  }

  enterEditMode() {
    //this.editMode = true;
    this.editMode = !this.editMode;
  }

  projectChange() {
    this.api.editProject(this.project).subscribe((data: any) => {

    });
  }

  addTask(email: any) {
    let task = {
      'title': email.subject,
      'subject': email.subject,
      'project_id': this.project.id,
      'description': '<Введите описание задачи>',
      'emails': [email.id],
      'assignees': []
    }

    this.api.addTask(this.project.id, task).subscribe((data: any) => {
      this.getTasks()
    });
  }

  addTaskEmpty() {
    let task = {
      'title': '<Введите название задачи>',
      'subject': '<Введите название задачи>',
      'project_id': this.project.id,
      'description': '<Введите описание задачи>',
      'emails': [],
      'assignees': []
    }

    this.api.addTask(this.project.id, task).subscribe((data: any) => {
      this.getTasks()
    });
  }
}
