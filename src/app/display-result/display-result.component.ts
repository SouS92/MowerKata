import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Mower } from './../model/mower.model';
import { SendService } from './../utilities/senddata';

@Component({
  selector: 'app-display-result',
  templateUrl: './display-result.component.html',
  styleUrls: ['./display-result.component.css'],
})
export class DisplayResultComponent implements OnInit, OnChanges {

  _mowers: Mower[];
  @Input() InitialFileName: string;
  @Input() fileName: string;
   constructor(public dataS: SendService) { }

  ngOnInit() {
    this._mowers = this.dataS.getData();
  }
  ngOnChanges() {
    this._mowers = this.dataS.getData();
  }

}
