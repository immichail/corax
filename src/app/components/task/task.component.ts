import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {linearColor, Task} from "../../../models/models";
import {ApiService} from "../../services/api.service";
import {GlobalStateService} from "../../services/global-state.service";
import { MINUTE, HOUR, WEEK, MONTH, DAY } from '../../../models/variables';
import {TaskFullWindowComponent} from "../task-full-window/task-full-window.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  @Input() task_id: string = '';

  @Output() taskDeleted: EventEmitter<any> = new EventEmitter<any>();

  public task: Task = new Task({
    title: 'Нет заголовка',
    description: 'Нет дополнительного описания задачи'
  });

  public dueTimeListShown = false;
  public dueTimeListOptions = [
    {name: '5 мин.', value: 5 * MINUTE},
    {name: '30 мин.', value: 30 * MINUTE},
    {name: '1 час', value: 1 * HOUR},
    {name: '3 часа', value: 3 * HOUR},
    {name: '1 день', value: 1 * DAY},
    {name: '3 дня', value: 3 * DAY},
    {name: '1 неделя', value: 1 * WEEK},
    {name: '2 недели', value: 2 * WEEK}
  ]
  public dueTime: number | undefined = undefined;
  public timeDelta: number | undefined = undefined;
  public dueTimeColor: any = `rgba(${0}, ${0}, ${255}, 1.0)`
  public chidlrenTasks: Array<string> = [];

  constructor(private api: ApiService, public globalState: GlobalStateService, public dialog: MatDialog) { }

  @ViewChild('taskDescription', {static: true}) taskDescription : ElementRef | undefined = undefined;

  ngOnInit(): void {
    this.refreshTask();

    setTimeout(() => {
      let descriptionElement = this.taskDescription?.nativeElement;
      descriptionElement.style.height = (descriptionElement.scrollHeight)+"px";
    }, 250);


    setInterval(() => {
      this.refreshDueTime()
    }, 5000);
  }

  refreshTask(): void {
    if (this.task_id != undefined) {
      this.api.getTask(this.task_id).subscribe((data: any) => {
        this.task = new Task(data['res']);
        this.getChildrenTasks();
      })
    }

    this.refreshDueTime()
  }

  deleteTask() {
    if (this.task != undefined) {
      this.api.deleteTask(this.task.id).subscribe((data: any) => {
        this.taskDeleted.emit()
      });
    }
  }

  editTask() {
    this.api.editTask(this.task).subscribe((data: any) => {

    });
  }

  refreshDueTime() {
    if (this.task.dueTime === undefined){
      return;
    }

    let timeDelta = (this.task.dueTime.getTime() - Date.now());
    let timeDeltaPercentage = undefined;
    if (this.task.startTime != undefined) {
      timeDeltaPercentage = (this.task.dueTime.getTime() - Date.now()) / (this.task.dueTime.getTime() - this.task.startTime.getTime());
    }

    this.timeDelta = timeDelta;

    if (timeDeltaPercentage != undefined) {
      this.dueTimeColor = linearColor(
        {r: 0, g: 255, b: 0, a: 1.0},
        {r: 255, g: 0, b: 0, a: 1.0},
        timeDeltaPercentage
      )
    }
  }

  getDueTimeValue() {
    if (this.timeDelta === undefined) {
      return 'Не задано';
    } else {
      if (this.timeDelta < MINUTE) {
        return '<1 мин'
      }
      if (this.timeDelta < HOUR) {
        return Math.round(this.timeDelta / MINUTE) + ' мин'
      }
      if (this.timeDelta < DAY) {
        return Math.round(this.timeDelta / HOUR) + ' часов'
      }
      if (this.timeDelta < WEEK) {
        return Math.round(this.timeDelta / DAY) + ' дней'
      }
      return '5 мин';
    }
  }

  showDueTimeList() {
    this.dueTimeListShown = !this.dueTimeListShown;
  }

  setDueTime(time: number) {
    this.task.dueTime = new Date(Date.now() + time)
    this.editTask();
    this.refreshDueTime();
    //this.dueTimeListShown = true;
  }

  doneTask() {
    if (this.task != undefined) {
      this.api.doneTask(this.task.id).subscribe((data: any) => {
        this.taskDeleted.emit()
      });
    }
  }

  getChildrenTasks() {
    this.api.getChildrenTask(this.task_id).subscribe((data: any) => {
      this.chidlrenTasks = data['res'].map((e: any) => e.id);
    })
  }

  openTaskFullWindow() {
    let dialogRef = this.dialog.open(TaskFullWindowComponent, {
      height: '75vh',
      width: '30vw',
      data: {
        task_id: this.task_id
      }
    });
  }

  addSubTask() {
    let task = {
      'title': '<Введите название задачи>',
      'subject': '<Введите название задачи>',
      'project_id': this.task.project_id,
      'description': '<Введите описание задачи>',
      'parent_id': this.task.id,
      'emails': [],
      'assignees': []
    }

    this.api.addTask(this.task.project_id, task).subscribe((data: any) => {

      this.refreshTask();
    });

  }

  auto_grow(e: any) {
    let element = e.target;
    element.style.height = "5px";
    element.style.height = (element.scrollHeight)+"px";
  }

  public disableDragging = false;

  preventDragging() {
    this.disableDragging = true;
  }

}
