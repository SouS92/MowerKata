import { Mower } from './mower.model';

export class FileUploaded {
     constructor(public fileName: string, public mowers: Mower[]) {
     }
}
