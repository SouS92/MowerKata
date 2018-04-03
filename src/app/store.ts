import { FileUploaded } from './model/fileuploaded.model';
import { INSERT_NEW_FILE } from './actions';

export interface IAppState {
    files: FileUploaded[];
}
export const INITIAL_STATE: IAppState = {
    files: [],
};
export function rootReducer(state: IAppState , action): IAppState {
    switch (action.type) {
        case INSERT_NEW_FILE : return Object.assign({}, state, {files: state.files.concat(action.file)});
    }
    return state;

}
