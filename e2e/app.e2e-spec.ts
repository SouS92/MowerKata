import { AppPage } from './app.po';
import { MowerLogic } from '../src/app/utilities/mowerlogic';
import { Grid } from '../src/app/model/grid.model';

describe('mower-taka App', () => {
  let page: AppPage;
  // let contentPage: string;
  let mowerService: MowerLogic;
  // let lines: string[];
  let path;

  beforeEach(() => {
    page = new AppPage();
    mowerService = new MowerLogic();
    path = require('path');
  });

  it('should display main page', () => {
    page.navigateTo();
    expect(page);
    expect(page.getParagraphText()).toEqual('Choose a txt file');
  });

  it('should select txt file and display result' , () => {

    const fileToUpload = '../test.txt',
    absolutePath = path.resolve(__dirname, fileToUpload);
    page.getInputFile().sendKeys(absolutePath);
  });

  it('should keep browser open', () => {
    page.keepBrowser();
  });

});
