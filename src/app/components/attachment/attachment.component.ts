import {Component, Input, OnInit} from '@angular/core';
import {ApiService} from "../../services/api.service";
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-attachment',
  templateUrl: './attachment.component.html',
  styleUrls: ['./attachment.component.scss']
})
export class AttachmentComponent implements OnInit {

  @Input() id: string = '';
  public meta: any = {};
  public icon: string = 'folder_off'

  iconList = [
    { type: "xlsx", icon: "fa fa-file-excel-o" },
    { type: "pdf", icon: "fa fa-file-pdf-o" },
    { type: "jpg", icon: "fa fa-file-image-o" }
  ];


  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getFileMeta(this.id).subscribe((data: any) => {
      this.meta = data['res'];
      this.icon = this.getIcon()
    });
  }

  getIcon() {
    let ext = this.meta.fileName.split('.');
    if (ext.length < 2) {
      return 'folder_off';
    }

    ext = ext.splice(ext.length - 1, 1);

    if ((ext == 'xlsx')||(ext == 'xls')) return 'table_view';
    if ((ext == 'pdf')) return 'picture_as_pdf';
    if ((ext == 'docx')||(ext == 'doc')) return 'description';

    return 'folder_off';
  }

  downloadFile() {
    window.open(this.api.apiUrl + '/file/download/' + this.meta.fsid);
  }

}
