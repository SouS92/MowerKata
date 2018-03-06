import { Component } from '@angular/core';
import { UploadEvent, UploadFile } from 'ngx-file-drop';
import { Mower } from './Models/Mower';
import { Grid } from './Models/Grid';
import { FileCheckers } from './Utilities/FileChecker';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MowerApp';
  public FileSpan = "Ajouter Un fichier";
  public fileName = "";
  public files: UploadFile;
  public errorDisplay = false;
  public errorMessage: string = "s";
  public dropped(event: UploadEvent) {
    this.files = event.files[0];
  this.fileName = this.files.relativePath;
    for (const file of event.files) {
      file.fileEntry.file(info => {
        console.log(info);
      });
    }
  }
 
  public fileOver(event){
    this.FileSpan = "C'est chaud! lachez le fichier"
  }
 
  public fileLeave(event){
    this.FileSpan = "Oups! Déposer le fichier ici!"
  }

  public openFile(event) {
    let input = event.target;

    let extensionFile = input.files[0].name.split('.').pop();

    if(extensionFile != "txt"){
        this.errorDisplay = true;
        this.errorMessage = "Veuillez choisir un fichier texte!";
      } 

    this.errorDisplay = false;
    let reader = new FileReader();
    reader.onload = () => {
      this.parseTxtFile(reader.result);
    }
    reader.readAsBinaryString(  input.files[0]);

}

public parseTxtFile(wholeText: any){
            //Split the file content into lines
            this.fileName = "";
            var lines = wholeText.split(/[\r\n]+/g);

            //Check if Lines Number is logical or not
            //Basically, we will have 1 Line for grid dimensions 
            //and 2 lines for every mower
            // => length % 2 == 1
            if(lines.length % 2 != 1){
              this.errorDisplay = true;
              this.errorMessage = "Le nombre de lignes du fichier n'est pas adéquat"
            } 
            else {
              this.errorDisplay = false;
              //Parsing First Line 
              //Should contain 2 digits, which are the dimensions of grid
              var firstLineValues = lines[0].split(" ");
              if(firstLineValues.length != 2) {
                this.errorDisplay = true;
                this.errorMessage = "La 1ere ligne doit contenir les dimensions de la grille"}
              else {
                if(FileCheckers.checkGridDimension(firstLineValues)) {
                  this.errorDisplay = true;
                }
                else {
                  //Create Grid of Mower App
                  var grid:Grid;
                  grid = new Grid(firstLineValues[0],firstLineValues[1]);

                  var mower: Mower;
                  // A loop for N mowers we may have
                  // from 0 to N Mowers
                  for (var _i = 1 , numberOfMowers = 1; _i < lines.length; _i = _i+2,numberOfMowers++) {
                    // Extract the Position of the mower
                    var mowerPositionLine = lines[_i].split(" ");
                    //The line should contain {digit digit Position[N, E, W, S]}
                    if(FileCheckers.checkMowersPosition(mowerPositionLine)){
                          this.errorDisplay = true;
                          this.errorMessage = "La ligne de la position du mower n'est pas valide" +lines[_i];
                      }
                      else{
                          if(FileCheckers.checkMowerDims(mowerPositionLine,grid)){
                              this.errorDisplay = true
                              this.errorMessage = "La position du mower n°" + _i + "n'est pas valide"
                          }
                        else{
                          this.errorDisplay = false;

                          var mowerActions= lines[_i + 1];
                          if(FileCheckers.checkActionsRegex(mowerActions)){
                            this.errorDisplay = true; 
                            this.errorMessage = "les actions possibles sont : M = en avant, L= gauche, R=droite";
                          }
                          else{
                            //Create the mower object
                            mower = new Mower(mowerPositionLine[0],mowerPositionLine[1],mowerPositionLine[2]);
                            //Extract the actions;
                            var actions = mowerActions.split('');
                            //Loop over actions
                            for(var _j = 0; _j < actions.length; _j++) {
                              //Execute the action
                              mower.executeAction(actions[_j],grid);
                            }
                              //fill the result list
                              this.fileName += `Mower N° ` + numberOfMowers+ `: ` + mower.positionX + ` ` +
                              mower.positionY + ` ` + mower.position + `\n`;
                          }
                        }


                      }
                       

                  }

                }
              }
              

            }
}
}
