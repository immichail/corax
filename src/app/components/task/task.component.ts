import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Task } from "../../../models/models";
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

  constructor(private api: ApiService, public globalState: GlobalStateService) { }

  ngOnInit(): void {
    this.refreshTask();
  }

  refreshTask(): void {
    if (this.task_id != undefined) {
      this.api.getTask(this.task_id).subscribe((data: any) => {
        this.task = new Task(data['res']);
      })
    }
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

  getDueTime() {
    if (this.task.dueTime === undefined) {
      return 'Не задано';
    } else {
      let timeDelta = (this.task.dueTime.getTime() - Date.now());
      if (timeDelta < MINUTE) {
        return '<1 мин'
      }
      if (timeDelta < HOUR) {
        return Math.round(timeDelta / MINUTE) + ' мин'
      }
      if (timeDelta < DAY) {
        return Math.round(timeDelta / HOUR) + ' часов'
      }
      if (timeDelta < WEEK) {
        return Math.round(timeDelta / DAY) + ' дней'
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
    //this.dueTimeListShown = true;
  }

  doneTask() {
    if (this.task != undefined) {
      this.api.doneTask(this.task.id).subscribe((data: any) => {
        this.taskDeleted.emit()
      });
    }
  }

}
