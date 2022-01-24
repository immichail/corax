import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class GlobalStateService {

  public user_id: string = '1';
  public dependant: Array<any> = [];

  constructor(private api: ApiService) {
    this.api.getDependant(this.user_id).subscribe((data: any) => {
      this.dependant = data['res'];
    })
  }
}
