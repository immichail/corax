import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Task } from "../../../models/models";
import {ApiService} from "../../services/api.service";
import {GlobalStateService} from "../../services/global-state.service";

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

}
