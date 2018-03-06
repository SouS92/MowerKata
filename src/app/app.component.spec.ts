import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Mower } from './Models/Mower';
import { Grid } from './Models/Grid';
describe('', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
      ],
    }).compileComponents();
  }));

  it('should keep the same values if we move outside the grid for columns', async(() => {
    var grid = new Grid(3,3);
    var mower = new Mower(0,2,'W');
    mower.executeAction('M',grid);
    mower.executeAction('M',grid);
    mower.executeAction('M',grid);

    expect(mower.positionX).toEqual(0);
    expect(mower.positionY).toEqual(2);
  }));

  it('should keep the same values if we move outside the grid for lines', async(() => {
    var grid = new Grid(3,3);
    var mower = new Mower(3,0,'S');
    mower.executeAction('M',grid);
    mower.executeAction('M',grid);
    mower.executeAction('M',grid);

    expect(mower.positionX).toEqual(3);
    expect(mower.positionY).toEqual(0);
  }));


  it('should create a new Grid', async(() => {
    var grid = new Grid(3,3);
    expect(grid.x).toEqual(3);
    expect(grid.y).toEqual(3);
  }));

  it('sould create a new Mower', async(()=>{
    var mower = new Mower(3,5,'N');
    expect(mower.positionX + " " + mower.positionY + " " + mower.position).toEqual("3 5 N");
  }));

  it('should move the mower with some actions',async(()=>{
    var fileSimulation = `5 5\n1 2 N\nLMLMLMLMM`;

    var lines = fileSimulation.split(/[\r\n]+/g);
    var firstLine:any[] = lines[0].split(" ") ;

    var grid:Grid;
    grid = new Grid(firstLine[0],firstLine[1]);

    var secondLine: any[] = lines[1].split(" ") ;

    var mower = new Mower(secondLine[0],secondLine[1],secondLine[2]);

    var actions = lines[2].split("") ;
    for(var i = 0 ; i <= actions.length; i++){
      mower.executeAction(actions[i],grid);
    }

    expect(mower.positionX + " " + mower.positionY + " " + mower.position).toEqual("1 3 N");

  }));

});
