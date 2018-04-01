import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Mower } from './model/mower.model';
import { Grid } from './model/grid.model';
import { DisplayResultComponent } from './display-result/display-result.component';
import {} from 'jasmine';
import { MowerService } from './service/mower.service';
import { SendDataService} from './service/senddata.service';
describe('Unit Tests', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent, DisplayResultComponent
      ],
      providers: [ SendDataService]
    }).compileComponents();
  }));

  it('should keep the same values if we move outside the grid for columns', async(() => {
    const grid = new Grid(3, 3);
    let mower = new Mower(0, 2, 0, 2, 'W', 'W');

    const app = TestBed.createComponent(AppComponent);

    mower = MowerService.executeAction(mower, 'M', grid);
    mower = MowerService.executeAction(mower, 'M', grid);
    mower = MowerService.executeAction(mower, 'M', grid);
    expect(mower.positionX).toEqual(0);
    expect(mower.positionY).toEqual(2);
  }));

  it('should keep the same values if we move outside the grid for lines', async(() => {
    const grid = new Grid(3, 3);
    let mower = new Mower(3, 0, 3, 0, 'S', 'S');
    const app = TestBed.createComponent(AppComponent);

    mower = MowerService.executeAction(mower, 'M', grid);
    mower = MowerService.executeAction(mower, 'M', grid);
    mower = MowerService.executeAction(mower, 'M', grid);
    mower = MowerService.executeAction(mower, 'M', grid);
    expect(mower.positionX).toEqual(3);
    expect(mower.positionY).toEqual(0);
  }));


  it('should create a new Grid', async(() => {
    const grid = new Grid(3, 3);
    expect(grid.x).toEqual(3);
    expect(grid.y).toEqual(3);
  }));

  it('sould create a new Mower', async(() => {
    const mower = new Mower(3, 5, 3, 5, 'N', 'N');
    expect(mower.positionX + ' ' + mower.positionY + ' ' + mower.position).toEqual('3 5 N');
  }));

  it('should move the mower with some actions', async(() => {

    const app = TestBed.createComponent(AppComponent);
    const fileSimulation = `5 5\n1 2 N\nLMLMLMLMM`;

    const lines = fileSimulation.split(/[\r\n]+/g);
    const firstLine: string[] = lines[0].split(' ');

    let grid: Grid;
    grid = new Grid(Number(firstLine[0]), Number(firstLine[1]));
    const mower = MowerService.parseActions(lines[1].split(' '), lines[2], grid);

    expect(mower.positionX + ' ' + mower.positionY + ' ' + mower.position).toEqual('1 3 N');

  }));

  it('it should change the position after L action', async(() => {
    const app = TestBed.createComponent(AppComponent);
    let mower = new Mower(1, 1, 1, 1, 'N', 'N');
    mower = MowerService.changePositionL(mower);
    expect(mower.position).toEqual('W');
  }));

  it('it should change the position after R action', async(() => {
    const app = TestBed.createComponent(AppComponent);
    let mower = new Mower(1, 1, 1, 1, 'N', 'N');
    mower = MowerService.changePositionR(mower);
    expect(mower.position).toEqual('E');
  }));

  it('it should change the position after move', async(() => {
    const app = TestBed.createComponent(AppComponent);
    let mower = new Mower(1, 1, 1, 1, 'E', 'E');
    const grid = new Grid(3, 3);

    mower = MowerService.executeMove(grid, mower);
    expect(mower.position).toEqual('E');
  }));

});
