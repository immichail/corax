import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Email, Sender} from "../../../models/models";
import {ApiService} from "../../services/api.service";

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

  public shortView = true;
  public body: string = '';
  public shortAnswerWindow = false;
  public answerContent = '';
  public answerRecipients: Array<Sender> = [];

  constructor(private api: ApiService) { }

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

  toggleView() {
    if (this.body == '') {
      this.api.getEmailBody(this.email.id).subscribe((data: any) => {
        this.body = data['res']['body']['html']
        this.shortView = false;
      })
    } else {
      this.shortView = !this.shortView;
    }
  }

  fastReplyToggle() {
    this.shortAnswerWindow = true;
    this.answerRecipients = [this.email.sender];
  }

  fastReplyToggleAll() {
    this.shortAnswerWindow = true;
    this.answerRecipients = [this.email.sender].concat(this.email.recipients);
  }

  fastReply() {
    this.api.replyEmail(this.email.id, this.answerContent, this.answerRecipients).subscribe((data: any) => {

    });
  }

  getRecipients() {
    if (this.email.recipients.length > 3) {
      return this.email.recipients.slice(0, 3);
    } else {
      return this.email.recipients;
    }
  }


}
