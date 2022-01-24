import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Email, Sender} from "../../../models/models";

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit {

  @Input() email: Email = new Email({
    id: '',
    subject: 'Не удалось загрузить сообщение',
    sender: new Sender({
      name: 'Не удалось загрузить сообщение',
      email: 'Не удалось загрузить сообщение'
    }),
    body: {
      text: 'Не удалось загрузить сообщение',
      html: 'Не удалось загрузить сообщение'
    }
  });

  @Output() onEmailDrag = new EventEmitter<any>();
  @Output() onEmailDrop = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  dragDrop(event: any) {
    event.source._dragRef.reset();
    event.email = this.email;
    this.onEmailDrop.emit(event);
  }

  drag(event: any) {
    event.email = this.email;
    this.onEmailDrag.emit(event)
  }


}
