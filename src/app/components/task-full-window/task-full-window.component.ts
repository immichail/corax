import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {ApiService} from "../../services/api.service";
import {Task} from "../../../models/models";

@Component({
  selector: 'app-task-full-window',
  templateUrl: './task-full-window.component.html',
  styleUrls: ['./task-full-window.component.scss']
})
export class TaskFullWindowComponent implements OnInit {

  public task: Task | undefined = undefined;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {task_id: string}, private api: ApiService) { }

  ngOnInit(): void {
    this.api.getTask(this.data.task_id).subscribe((data: any) => {
      this.task = new Task(data['res']);
    })
  }

}
