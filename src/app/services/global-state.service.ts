import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class GlobalStateService {

  public user_id: string = '';
  public dependant: Array<any> = [];

  constructor() {
    // this.api.getDependant(this.user_id).subscribe((data: any) => {
    //   this.dependant = data['res'];
    // })
  }
}
