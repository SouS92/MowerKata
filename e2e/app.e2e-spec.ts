import { AppPage } from './app.po';
import { MowerLogic } from '../src/app/utilities/mowerlogic';
import { Grid } from '../src/app/model/grid.model';

describe('mower-taka App', () => {
  let page: AppPage;
  let contentPage: string;
  let mowerService: MowerLogic;
  let lines: string[];
  beforeEach(() => {
    page = new AppPage();
    mowerService = new MowerLogic();
  });

  it('should display main page', () => {
    page.navigateTo();
    expect(page);
    expect(page.getParagraphText()).toEqual('Choose a txt file');
  });

  it('should get File Content' , () => {
    contentPage = page.getFileContent();
    expect(contentPage).toContain('5 5');
  });

  it('should have a valid data', () => {
    lines = contentPage.split(/[\r\n]+/g);
    expect(lines.length % 2).toEqual(1);
  });

  it('should display a valid result', () => {
    const firstLine: any[] = lines[0].split(' ');

    let grid: Grid;
    grid = new Grid(firstLine[0], firstLine[1]);
    const mower = mowerService.parseActions(lines[1].split(' '), lines[2], grid);

    expect(mower.positionX + ' ' + mower.positionY + ' ' + mower.position).toEqual('1 3 N');
  });
});
