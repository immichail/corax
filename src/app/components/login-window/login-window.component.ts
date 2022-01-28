import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../services/api.service";
import {GlobalStateService} from "../../services/global-state.service";
import {MatDialogRef} from "@angular/material/dialog";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-login-window',
  templateUrl: './login-window.component.html',
  styleUrls: ['./login-window.component.scss']
})
export class LoginWindowComponent implements OnInit {

  public email: string = 'Mivanov@cspfmba.ru';
  public password: string = '|-|AI|_5ATA|\\|';

  constructor(private api: ApiService, private globalState: GlobalStateService, public dialogRef: MatDialogRef<LoginWindowComponent>,private cookie: CookieService) { }

  ngOnInit(): void {
  }

  login() {
    this.api.login(this.email, this.password).subscribe((data: any) => {
      if (data['res'].hasOwnProperty('user_id')) {
        this.cookie.set('user_id', data['res']['user_id']);
        this.globalState.user_id = data['res']['user_id'];
        this.dialogRef.close()
      }

    })
  }

}
