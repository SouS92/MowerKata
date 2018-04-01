import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './../app.component';
import { Mower } from './../model/mower.model';
import { Grid } from './../model/grid.model';
import { DisplayResultComponent } from './../display-result/display-result.component';
import {} from 'jasmine';
import { MowerService } from './../service/mower.service';
import { SendDataService} from './../service/senddata.service';

describe('Mower Service', () => {

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [
        AppComponent, DisplayResultComponent
      ],
      providers: [ MowerService, SendDataService]
    }).compileComponents();
  }));


it('it should give mower\'s new position', () => {
  const app = TestBed.createComponent(AppComponent);
  const fileSimulation = `5 5\n1 2 N\nLMLMLMLMM`;

  const lines = fileSimulation.split(/[\r\n]+/g);
  const firstLine: string[] = lines[0].split(' ');

  let grid: Grid;
  grid = new Grid(Number(firstLine[0]), Number(firstLine[1]));
  const mower = MowerService.parseActions(lines[1].split(' '), lines[2], grid);

  expect(mower.positionX + ' ' + mower.positionY + ' ' + mower.position).toEqual('1 3 N');
});

});
