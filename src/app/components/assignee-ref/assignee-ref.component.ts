import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Assignee} from "../../../models/models";
import {ApiService} from "../../services/api.service";
import {GlobalStateService} from "../../services/global-state.service";

@Component({
  selector: 'app-assignee-ref',
  templateUrl: './assignee-ref.component.html',
  styleUrls: ['./assignee-ref.component.scss']
})
export class AssigneeRefComponent implements OnInit {

  @Input() assignees: Array<Assignee> | undefined;
  @Input() task_id: string = '';
  @Output() addAssigneeEvent : EventEmitter<any> = new EventEmitter<Assignee>();
  public availableShown: boolean = false;


  constructor(private api: ApiService, public globalState: GlobalStateService) {
  }


  ngOnInit(): void {
  }

  addAssignee(assignee: any) {
    this.api.addAssignee(this.task_id, assignee.email).subscribe(() => {
      this.addAssigneeEvent.emit({})
    });
  }

  showAvailable() {
    this.availableShown = true;
  }

  hideAvailable() {
    this.availableShown = false;
  }

}
