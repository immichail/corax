import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {Email} from "../../../models/models";

@Component({
  selector: 'app-email-ref',
  templateUrl: './email-ref.component.html',
  styleUrls: ['./email-ref.component.scss']
})
export class EmailRefComponent implements OnInit {

  @Input() message_id: string | undefined;
  public email: Email = new Email({})

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    if (this.message_id !== undefined) {
      this.api.getEmail(this.message_id).subscribe((data: any) => {
        this.email = new Email(data['res']);
      })
    }

  }

}
