import { Injectable } from '@angular/core';

@Injectable()
export class FileChecker {
    constructor() { }
    static checkGridDimension(gridDim: string[]): boolean {
        if (isNaN(Number(gridDim[0])) || isNaN(Number(gridDim[1]))) {return true; }
        return false;
    }

    static checkMowersPosition(mowerPositionLine: string[]): boolean {
        if (mowerPositionLine.length !== 3 || (isNaN(Number(mowerPositionLine[0])) || isNaN(Number(mowerPositionLine[1]))
            || (mowerPositionLine[2] !== 'N' && mowerPositionLine[2] !== 'E' &&
                mowerPositionLine[2] !== 'W' && mowerPositionLine[2] !== 'S'))) { return true; }
        return false;
    }

    static checkMowerDims(mowerPositionLine, grid) {
        if (mowerPositionLine[0] > grid.x || mowerPositionLine[1] > grid.y) { return true; }
        return false;
    }

    static checkActionsRegex(mowerActions: string): boolean {
        if (/^[GAD]+$/.test(mowerActions)) { console.log('1');
        return false;
        } else if (/^[LRM]+$/.test(mowerActions)) {
            console.log('2');
            return false;
        } return true;
    }


}
