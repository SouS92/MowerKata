import {Grid} from './grid.model';
import {Input} from '@angular/core';

export class Mower {
    @Input() actions: string;

    constructor(public initialPositionX: number, public initialPositionY: number,
        public positionX: number, public positionY: number, public position: string, public initialPosition: string) {
    }

    insertActions(actions: string) {
        this.actions = actions;
    }


}
