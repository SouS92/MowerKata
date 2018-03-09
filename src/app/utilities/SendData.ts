import { Mower } from '../models/Mower';

export class SendService {
    mowers: Mower[];


    saveData(_mowers: Mower[]) {
        this.mowers = _mowers;
    }

    getData(): Mower[] {
        return this.mowers;
    }

}
