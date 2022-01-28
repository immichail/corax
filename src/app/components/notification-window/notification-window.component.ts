import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {GlobalStateService} from "../../services/global-state.service";

@Component({
  selector: 'app-notification-window',
  templateUrl: './notification-window.component.html',
  styleUrls: ['./notification-window.component.scss']
})
export class NotificationWindowComponent implements OnInit {

  @Input() visible: boolean = false;
  @Output() acceptedEvent: EventEmitter<any> = new EventEmitter<any>();

  public notifications: Array<any> = [];

  constructor(private globalState: GlobalStateService, private api: ApiService) { }

  ngOnInit(): void {
    this.refresh();
    setInterval(() => {
      this.refresh();
    }, 30 * 1000);
  }

  refresh() {
    this.api.getIncomingTasks(this.globalState.user_id).subscribe((data: any) => {
      if (data['res'] === undefined) {
        return
      }
      this.notifications = data['res'];
    });
  }

  acceptTask(id: string) {
    this.api.acceptTask(id).subscribe((data: any) => {
      this.refresh();
      this.acceptedEvent.emit()
    })
  }

}
