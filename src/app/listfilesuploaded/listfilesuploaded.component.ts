import { Component, OnInit } from '@angular/core';
import { select, NgRedux } from '@angular-redux/store';
import { FileUploaded } from '../model/fileuploaded.model';

@Component({
  selector: 'app-listfilesuploaded',
  templateUrl: './listfilesuploaded.component.html',
  styleUrls: ['./listfilesuploaded.component.css']
})
export class ListfilesuploadedComponent implements OnInit {

  @select() files;
  constructor(public ngRedux: NgRedux<FileUploaded>) { }

  ngOnInit() {
  }

}
