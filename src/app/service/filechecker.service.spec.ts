import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './../app.component';
import { Mower } from './../model/mower.model';
import { Grid } from './../model/grid.model';
import { DisplayResultComponent } from './../display-result/display-result.component';
import {} from 'jasmine';
import { MowerService } from './../service/mower.service';
import { SendDataService} from './../service/senddata.service';
import { FileChecker } from './filechecker.service';

describe('FileChecker Service', () => {

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [
        AppComponent, DisplayResultComponent
      ],
      providers: [ MowerService, SendDataService]
    }).compileComponents();
  }));


it('it should check valid grid dimensions', () => {
  const dimensions: string[] = ['1', '5'];
  expect(FileChecker.checkGridDimension(dimensions)).toEqual(false);
});

it('it should check invalid grid dimensions', () => {
  const dimensions: string[] = ['N', '5'];
  expect(FileChecker.checkGridDimension(dimensions)).toEqual(true);
});


it('it should check valid mower\'s initial position', () => {
  const initialPosition: string[] = ['1', '5', 'S'];
  expect(FileChecker.checkGridDimension(initialPosition)).toEqual(false);
});

it('it should check invalid mower\'s initial position', () => {
  const initialPosition: string[] = ['R', '5', 'Z'];
  expect(FileChecker.checkGridDimension(initialPosition)).toEqual(true);
});

it('it should check valid mower\'s actions', () => {
  const actions = 'RLMMLRLRM';
  expect(FileChecker.checkActionsRegex(actions)).toEqual(false);
});

it('it should check invalid mower\'s actions', () => {
  const actions = 'ZBVOEJ';
  expect(FileChecker.checkActionsRegex(actions)).toEqual(true);
});

});
