import { Mower } from '../model/mower.model';

export class SendService {
    mowers: Mower[];


    saveData(_mowers: Mower[]) {
        this.mowers = _mowers;
    }

    getData(): Mower[] {
        return this.mowers;
    }

}
