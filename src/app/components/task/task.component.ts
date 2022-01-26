import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {linearColor, Task} from "../../../models/models";
import {ApiService} from "../../services/api.service";
import {GlobalStateService} from "../../services/global-state.service";
import { MINUTE, HOUR, WEEK, MONTH, DAY } from '../../../models/variables';

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

  constructor(private api: ApiService, public globalState: GlobalStateService) { }

  ngOnInit(): void {
    this.refreshTask();

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
      this.chidlrenTasks = data['res'];
    })
  }

}
