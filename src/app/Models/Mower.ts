import {Grid} from './Grid';
import {Input} from '@angular/core';

export class Mower {
    @Input() initialPositionX: number;
    @Input() initialPositionY: number;
    @Input() positionX: number;
    @Input() positionY: number;
    @Input() position: string;
    @Input() initialPosition: string;
    @Input() actions: string;

    constructor(ipx: number, ipy: number, px: number, py: number, p: string, ip: string) {
        this.initialPositionX = ipx;
        this.initialPositionY = ipy;
        this.position = p;
        this.positionX = px;
        this.positionY = py;
        this.initialPosition = ip;
    }

    insertActions(actions: string) {
        this.actions = actions;
    }


}
