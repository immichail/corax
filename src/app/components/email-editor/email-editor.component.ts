import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormControl} from "@angular/forms";
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'app-email-editor',
  templateUrl: './email-editor.component.html',
  styleUrls: ['./email-editor.component.scss']
})
export class EmailEditorComponent implements OnInit {

  @Input() message_id: string = '';
  @Input() recievers: Array<any> = [
    {name: 'Имя фамилия', email: 'Mivanov@cspfmba.ru'},
    {name: 'Имя фамилия2', email: 'M1ivanov@cspfmba.ru'}
  ];

  @Input() recieversCopy: Array<any> = [];
  @Input() answerContent: string = '';

  public allReceivers = [
    {name: 'Анастасия Тараскина', email: 'Ataraskina@cspfmba.ru'},
    {name: 'Екатерина Сутулова', email: 'Eunusova@cspfmba.ru'}
  ]

  @ViewChild('recInput') recInput: ElementRef<HTMLInputElement> | undefined;
  @ViewChild('recCopyInput') recCopyInput: ElementRef<HTMLInputElement> | undefined;

  public separatorKeysCodes: number[] = [ENTER, COMMA];

  public filteredReceivers: Array<any> = [];
  public recFormControl = new FormControl();

  public filteredReceiversCopy: Array<any> = [];
  public recCopyFormControl = new FormControl();

  constructor(private api: ApiService) {
    this.filteredReceivers = this.allReceivers;
    this.filteredReceiversCopy = this.allReceivers;
  }

  ngOnInit(): void {
  }

  remove(reciever: any) {
    this.recievers = this.recievers.filter((e: any) => e.email !== reciever.email)
  }

  add(event: any) {
  }

  selected(event: any) {
    if (this.recievers.findIndex((e: any) => event.option.value.email == e.email) == -1) {
      this.recievers.push(event.option.value)
    }
    this.recFormControl.setValue('');
    if (this.recInput !== undefined) {
      this.recInput.nativeElement.value = '';
    }
    event.chipInput!.clear();
  }

  change(event: any) {
    this.filteredReceivers = this.allReceivers.filter((e: any) => {
      return e.name.toLowerCase().includes(event) || e.email.toLowerCase().includes(event)
    })
  }

  removeCopy(reciever: any) {
    this.recieversCopy = this.recieversCopy.filter((e: any) => {
      return e.email !== reciever.email
    })
  }

  addCopy(event: any) {
  }

  selectedCopy(event: any) {
    if (this.recieversCopy.findIndex((e: any) => event.option.value.email == e.email) == -1) {
      this.recieversCopy.push(event.option.value)
    }
    this.recFormControl.setValue('');
    if (this.recCopyInput !== undefined) {
      this.recCopyInput.nativeElement.value = '';
    }
    event.chipInput!.clear();
  }

  changeCopy(event: any) {
    this.filteredReceiversCopy = this.allReceivers.filter((e: any) => {
      return e.name.toLowerCase().includes(event) || e.email.toLowerCase().includes(event)
    })
  }

  answer() {
    this.api.replyEmail(this.message_id, this.answerContent, this.recievers, this.recieversCopy).subscribe((data: any) => {
    });
  }

}
