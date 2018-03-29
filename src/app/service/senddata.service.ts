import { Mower } from '../model/mower.model';
import { Injectable } from '@angular/core';

@Injectable()
export class SendDataService {
    mowers: Mower[];


    saveData(_mowers: Mower[]) {
        this.mowers = _mowers;
    }

    getData(): Mower[] {
        return this.mowers;
    }

}
