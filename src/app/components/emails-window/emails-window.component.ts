import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'app-emails-window',
  templateUrl: './emails-window.component.html',
  styleUrls: ['./emails-window.component.scss']
})
export class EmailsWindowComponent implements OnInit {

  @Output() onEmailDrag = new EventEmitter<any>();
  @Output() onEmailDrop = new EventEmitter<any>();

  public scrollPosition = 0;
  public scrollStep = 80;

  public emails: any = [];
  public refresherInterval: any = undefined;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.getEmails();
    this.refresherInterval = setInterval(() => {
      this.getEmails()
    }, 1000 * 60)
  }

  refresh() {
    this.getEmails();
  }

  getEmails() {
    this.api.getEmails().subscribe((data: any) => {
      this.emails = data['res'];
    })
  }

  onEmailDragEmail(event: any) {
    this.onEmailDrag.emit(event);
  }

  onEmailDropped(event: any) {
    this.onEmailDrop.emit(event);
  }

  onScroll(event: any) {
    if (event.wheelDelta > 0) {
      if (this.scrollPosition - this.scrollStep < 0) {
        this.scrollPosition += this.scrollStep;
      } else {
        this.scrollPosition = 0;
      }
    } else {
      this.scrollPosition -= this.scrollStep;
    }
  }

}
