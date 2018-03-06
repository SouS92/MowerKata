import {Grid} from './Grid';
export class Mower{
    positionX: number;
    positionY:number;
    position: string;


    constructor(px:number,py:number,p:string){
        this.position = p;
        this.positionX = px;
        this.positionY = py;
    }

    executeAction(action:string,grid:Grid){

        switch(action){
            case 'L' : this.changePositionL(action); break;
            case 'R' : this.changePositionR(action); break;
            case 'M' : this.executeMove(grid); break;
        }
    }

    executeMove(grid:Grid){
        switch(this.position){
            case 'N' : if(this.positionY + 1 <= grid.y) this.positionY++; break;
            case 'E' : if(this.positionX+ 1 <= grid.x) this.positionX++; break;
            case 'W' : if(this.positionX - 1 >= 0) this.positionX--; break;
            case 'S' : if(this.positionY - 1 >= 0) this.positionY--; break;
        }
    }
    changePositionL(action:string){
        switch(this.position){
            case 'N' : this.position = 'W'; break;
            case 'E' : this.position = 'N'; break;
            case 'W' : this.position = 'S'; break;
            case 'S' : this.position = 'E'; break;
        }
    }
    changePositionR(action:string){
        switch(this.position){
            case 'N' : this.position = 'E'; break;
            case 'E' : this.position = 'S'; break;
            case 'W' : this.position = 'N'; break;
            case 'S' : this.position = 'W'; break;
        }
    }
}