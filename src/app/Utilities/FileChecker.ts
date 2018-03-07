import { Injectable } from '@angular/core';

@Injectable()
export class FileCheckers {
    constructor() { }
    static checkGridDimension(gridDim: any): boolean {
        if (isNaN(gridDim[0]) || isNaN(gridDim[1])) return true;
        return false;
    }

    static checkMowersPosition(mowerPositionLine: any): boolean {
        if (mowerPositionLine.length != 3 || (isNaN(mowerPositionLine[0]) || isNaN(mowerPositionLine[1])
            || (mowerPositionLine[2] != 'N' && mowerPositionLine[2] != 'E' &&
                mowerPositionLine[2] != 'W' && mowerPositionLine[2] != 'S'))) return true;
        return false;
    }

    static checkMowerDims(mowerPositionLine, grid) {
        if (mowerPositionLine[0] > grid.x || mowerPositionLine[1] > grid.y) return true;
        return false;
    }

    static checkActionsRegex(mowerActions: any): boolean {
        if (!(/^[LRM]+$/.test(mowerActions))) return true;
        return false;
    }


}