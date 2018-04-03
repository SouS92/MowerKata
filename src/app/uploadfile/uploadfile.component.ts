import { Component, OnInit } from '@angular/core';
import { UploadEvent, UploadFile } from 'ngx-file-drop';
import { Mower } from './../model/mower.model';
import { Grid } from './../model/grid.model';
import { FileChecker } from './../service/filechecker.service';
import { SendDataService } from './../service/senddata.service';
import { Observable } from 'rxjs/Observable';
import {MowerService} from './../service/mower.service';
import { NgRedux } from '@angular-redux/store';
import { FileUploaded } from './../model/fileuploaded.model';
import { TYPED_NULL_EXPR } from '@angular/compiler/src/output/output_ast';
import { INSERT_NEW_FILE } from './../actions';

@Component({
  selector: 'app-uploadfile',
  templateUrl: './uploadfile.component.html',
  styleUrls: ['./uploadfile.component.css']
})
export class UploadfileComponent implements OnInit {
  title = 'MowerApp';
  public FileSpan;
  public fileName;
  public fileNameHistory;
  public InitialFileName;
  public files: UploadFile;
  public errorDisplay;
  public errorMessage: string;
  public mowers: Array<Mower>;
  ngOnInit() {
    this.initVars();
  }

  constructor(public dataService: SendDataService, public ngRedux: NgRedux<FileUploaded>) {
  }

  initVars() {
    this.FileSpan = 'Ajouter Un fichier';
    this.fileName = '';
    this.fileNameHistory = '';
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

  insertInRedux(listOfMowers: Mower[]) {
    const fileUploaded: FileUploaded = new FileUploaded(this.fileNameHistory, listOfMowers);
    this.ngRedux.dispatch({type: INSERT_NEW_FILE, file: fileUploaded});
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
    this.fileNameHistory = input.files[0].name;
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

  parseTxtFile(wholeText: string) {
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
        if (FileChecker.checkGridDimension(firstLineValues)) {
          this.errorDisplay = true;
        } else {

          let grid: Grid;
          grid = new Grid(Number(firstLineValues[0]), Number(firstLineValues[1]));
          this.parsingMowers(grid, lines);
        }
      }


    }
  }


  parsingMowers(grid: Grid, lines: string[]) {
    let mower: Mower;
    for (let _i = 1, numberOfMowers = 1; _i < lines.length; _i = _i + 2, numberOfMowers++) {

      const mowerPositionLine = lines[_i].split(' ');

      if (FileChecker.checkMowersPosition(mowerPositionLine)) {
        this.errorDisplay = true;
        this.errorMessage = `this line ${lines[_i]}  is not a valid one`;
      } else {
        if (FileChecker.checkMowerDims(mowerPositionLine, grid)) {
          this.errorDisplay = true;
          this.errorMessage = `The position of mower n° ${_i} is not legal`;
        } else {
          this.errorDisplay = false;

          const mowerActions = lines[_i + 1];
          if (FileChecker.checkActionsRegex(mowerActions)) {
            this.errorDisplay = true;
            this.errorMessage = 'Valid Actions are : M = Move, L= Left, R=Right OR A=Avant G=Gauche D=Droite';
          } else {
            mower = MowerService.parseActions(mowerPositionLine, mowerActions, grid);

            mower.insertActions(mowerActions);
            this.mowers.push(mower);
          }
        }


      }


    }
    this.insertInRedux(this.mowers);
  }
}
