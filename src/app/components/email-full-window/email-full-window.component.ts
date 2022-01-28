import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {ApiService} from "../../services/api.service";
import {GlobalStateService} from "../../services/global-state.service";

@Component({
  selector: 'app-email-full-window',
  templateUrl: './email-full-window.component.html',
  styleUrls: ['./email-full-window.component.scss']
})
export class EmailFullWindowComponent implements OnInit {

  public editorRecipients: Array<any> = [];
  public editorRecipientsCopy: Array<any> = [];
  public conversation: Array<any> = [];
  public openMessageId: string = '<fe0b77ad8a3b4b54aac3de619a603eec@cspfmba.ru>';
  public editorMessageId: string = '';
  public answerContent: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: {message_id: string}, private api: ApiService, private globalState: GlobalStateService) { }

  ngOnInit(): void {
    this.openMessageId = this.data.message_id;
    this.api.getConversation(this.data.message_id).subscribe((data: any) => {
      this.conversation = data['res'];
    })
  }

  answerClick(message_id: string) {
    this.editorMessageId = message_id;
    this.editorRecipients = [this.conversation.find((e :any) => e.message_id === message_id)['sender']];
    this.editorRecipientsCopy = [];
  }

  answerAllClick(message_id: string) {
    this.editorMessageId = message_id;
    this.editorRecipients = [this.conversation.find((e :any) => e.message_id === message_id)['sender']];
    this.editorRecipientsCopy = this.conversation.find((e :any) => e.message_id === message_id)['cc_recipients']
  }

  answer() {
    console.log("this.answerContent")
    console.log(this.answerContent)
    // this.api.replyEmail(this.editorMessageId, this.answerContent, );
  }
}
