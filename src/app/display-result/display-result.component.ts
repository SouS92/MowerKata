import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-display-result',
  templateUrl: './display-result.component.html',
  styleUrls: ['./display-result.component.css']
})
export class DisplayResultComponent implements OnInit {

  @Input() InitialFileName: string;
  @Input() fileName: string;
  constructor() { }

  ngOnInit() {
  }

}
