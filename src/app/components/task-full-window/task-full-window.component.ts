import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {ApiService} from "../../services/api.service";
import {Task} from "../../../models/models";
import {GlobalStateService} from "../../services/global-state.service";

@Component({
  selector: 'app-task-full-window',
  templateUrl: './task-full-window.component.html',
  styleUrls: ['./task-full-window.component.scss']
})
export class TaskFullWindowComponent implements OnInit {

  public task: Task | undefined = undefined;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {task_id: string}, private api: ApiService, private globalState: GlobalStateService) { }

  ngOnInit(): void {
    this.refreshTask();
  }

  refreshTask() {
    this.api.getTask(this.data.task_id).subscribe((data: any) => {
      this.task = new Task(data['res']);
    })
  }

  fileBrowseHandler(event: any) {

  }

  uploadDragOver(event: any) {
    event.preventDefault();
    event.stopPropagation();
  }

  uploadDragLeave(event: any) {
    event.preventDefault();
    event.stopPropagation();
  }

  uploadDragDrop(event: any) {
    event.preventDefault();
    event.stopPropagation();
    //this.fileOver = false;
    let files = event.dataTransfer.files;

    if (this.task === undefined) {
      return;
    }

    for (let file of files) {
      if (file) {
        let fileName = file.name;
        let formData = new FormData();
        formData.append("fileContent", file);
        formData.append('meta', JSON.stringify({
          user_id: this.globalState.user_id,
          task_id: this.task.id,
          fileName: fileName
        }));
        this.api.uploadFile(formData).subscribe((data: any) => {

        });
      }
    }
  }
}
