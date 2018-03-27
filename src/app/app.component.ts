import { Component, OnInit } from '@angular/core';
import { UploadEvent, UploadFile } from 'ngx-file-drop';
import { Mower } from './model/mower.model';
import { Grid } from './model/grid.model';
import { FileCheckers } from './utilities/filechecker';
import { SendService } from './utilities/senddata';
import { Observable } from 'rxjs/Observable';
import {MowerLogic} from './utilities/mowerlogic';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'MowerApp';
  public FileSpan;
  public fileName;
  public InitialFileName;
  public files: UploadFile;
  public errorDisplay;
  public errorMessage: string;
  public mowers: Array<Mower>;
  ngOnInit() {
    this.initVars();
  }

  constructor(public dataService: SendService, public mowerService: MowerLogic) {
  }

  initVars() {
    this.FileSpan = 'Ajouter Un fichier';
    this.fileName = '';
    this.InitialFileName = '';
    this.errorDisplay = false;
    this.errorMessage = '';
    this.mowers = [];
  }
  public dropped(event: UploadEvent) {
    this.files = event.files[0];
    this.fileName = this.files.relativePath;
    for (const file of event.files) {
      file.fileEntry.file(info => {
        console.log(info);
      });
    }
  }

  public fileOver(event) {
    this.FileSpan = 'C\'est chaud! lachez le fichier';
  }

  public fileLeave(event) {
    this.FileSpan = 'Oups! Déposer le fichier ici!';
  }

  refreshValues() {
    this.InitialFileName = '';
    this.mowers = [];
    this.dataService.saveData([]);
    this.errorMessage = '';
  }
  public openFile(event) {
    this.refreshValues();
    const input = event.target;

    const extensionFile = input.files[0].name.split('.').pop();
    const sizeFile = input.files[0].size;
    const fileName = input.files[0].name;
    if (extensionFile !== 'txt') {
      this.errorDisplay = true;
      this.errorMessage = 'Please, pick a text file!';
    } else if (sizeFile > 2000) {
      this.errorDisplay = true;
      this.errorMessage = `The specified file ${this.fileName} could not be uploaded , The file exceeding the Maximum file size of 1KO`;
    } else {
      this.errorDisplay = false;
      const reader = new FileReader();
      reader.onload = () => {
        this.parseTxtFile(reader.result);
        console.log(this.mowers);
        this.dataService.saveData(this.mowers);
        this.InitialFileName = reader.result;
        if (this.errorMessage !== '') {
          this.errorDisplay = true;
        }
      };
      reader.readAsBinaryString(input.files[0]);
    }


  }

  parseTxtFile(wholeText: any) {
    this.fileName = '';
    const lines = wholeText.split(/[\r\n]+/g);

    if (lines.length % 2 !== 1) {
      this.errorDisplay = true;
      this.errorMessage = 'Your Files content is not valid!';
    } else {
      this.errorDisplay = false;

      const firstLineValues = lines[0].split(' ');
      if (firstLineValues.length !== 2) {
        this.errorDisplay = true;
        this.errorMessage = 'The first line should contain the dimensions of grid';
      } else {
        if (FileCheckers.checkGridDimension(firstLineValues)) {
          this.errorDisplay = true;
        } else {

          let grid: Grid;
          grid = new Grid(firstLineValues[0], firstLineValues[1]);
          this.parsingMowers(grid, lines);
        }
      }


    }
  }


  parsingMowers(grid: Grid, lines: any) {
    let mower: Mower;
    for (let _i = 1, numberOfMowers = 1; _i < lines.length; _i = _i + 2, numberOfMowers++) {

      const mowerPositionLine = lines[_i].split(' ');

      if (FileCheckers.checkMowersPosition(mowerPositionLine)) {
        this.errorDisplay = true;
        this.errorMessage = `this line ${lines[_i]}  is not a valid one`;
      } else {
        if (FileCheckers.checkMowerDims(mowerPositionLine, grid)) {
          this.errorDisplay = true;
          this.errorMessage = `The position of mower n° ${_i} is not legal`;
        } else {
          this.errorDisplay = false;

          const mowerActions = lines[_i + 1];
          if (FileCheckers.checkActionsRegex(mowerActions)) {
            this.errorDisplay = true;
            this.errorMessage = 'Valid Actions are : M = Move, L= Left, R=Right';
          } else {
            mower = this.mowerService.parseActions(mowerPositionLine, mowerActions, grid);

            mower.insertActions(mowerActions);
            this.mowers.push(mower);
          }
        }


      }


    }
  }





}
