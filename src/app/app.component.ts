import { Component, OnInit } from '@angular/core';
import { UploadEvent, UploadFile } from 'ngx-file-drop';
import { Mower } from './models/Mower';
import { Grid } from './models/Grid';
import { FileCheckers } from './utilities/FileChecker';
import { SendService } from './utilities/SendData';
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

  constructor(public dataService: SendService) {
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
      }};
      reader.readAsBinaryString(input.files[0]);
    }


  }

  parseTxtFile(wholeText: any) {
    // Split the file content into lines
    this.fileName = '';
    const lines = wholeText.split(/[\r\n]+/g);

    // Check if Lines Number is logical or not
    if (lines.length % 2 !== 1) {
      this.errorDisplay = true;
      this.errorMessage = 'Your Files content is not valid!';
    } else {
      this.errorDisplay = false;
      // Parsing First Line;
      const firstLineValues = lines[0].split(' ');
      if (firstLineValues.length !== 2) {
        this.errorDisplay = true;
        this.errorMessage = 'The first line should contain the dimensions of grid';
      } else {
        if (FileCheckers.checkGridDimension(firstLineValues)) {
          this.errorDisplay = true;
        } else {
          // Create Grid of Mower App
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
            mower = this.parseActions(mowerPositionLine, mowerActions, grid);
            // fill the result list
            mower.insertActions(mowerActions);
            this.mowers.push(mower);
          }
        }


      }


    }
  }

  parseActions(mowerPositionLine: any, mowerActions: any, grid: Grid): Mower {
    // Create the mower object
    let mower: Mower = new Mower(mowerPositionLine[0], mowerPositionLine[1],
      mowerPositionLine[0], mowerPositionLine[1], mowerPositionLine[2], mowerPositionLine[2]);
    // Extract the actions;
    const actions = mowerActions.split('');
    // Loop over actions
    for (let _j = 0; _j < actions.length; _j++) {
      // Execute the action
      mower = this.executeAction(mower, actions[_j], grid);
    }
    return mower;
  }

  executeAction(mower: Mower, action: string, grid: Grid): Mower {
    const tempMower = mower;
    switch (action) {
      case 'L': mower = this.changePositionL(tempMower); break;
      case 'R': mower = this.changePositionR(tempMower); break;
      case 'M': mower = this.executeMove(grid, tempMower); break;
      case 'G': mower = this.changePositionL(tempMower); break;
      case 'D': mower = this.changePositionR(tempMower); break;
      case 'A': mower = this.executeMove(grid, tempMower); break;
    }
    return tempMower;
  }

  executeMove(grid: Grid, mower: Mower): Mower {
    const newMower = mower;
    switch (mower.position) {
      case 'N': if (mower.positionY + 1 <= grid.y) {mower.positionY++; }break;
      case 'E': if (mower.positionX + 1 <= grid.x) {mower.positionX++; }break;
      case 'W': if (mower.positionX - 1 >= 0) { mower.positionX--; } break;
      case 'S': if (mower.positionY - 1 >= 0) { mower.positionY--; } break;
    }
    return newMower;
  }
  changePositionL(mower: Mower): Mower {
    switch (mower.position) {
      case 'N': mower.position = 'W'; break;
      case 'E': mower.position = 'N'; break;
      case 'W': mower.position = 'S'; break;
      case 'S': mower.position = 'E'; break;
    }
    return mower;
  }
  changePositionR(mower: Mower): Mower {
    switch (mower.position) {
      case 'N': mower.position = 'E'; break;
      case 'E': mower.position = 'S'; break;
      case 'W': mower.position = 'N'; break;
      case 'S': mower.position = 'W'; break;
    }
    return mower;
  }
}
