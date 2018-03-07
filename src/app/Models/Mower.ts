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


}