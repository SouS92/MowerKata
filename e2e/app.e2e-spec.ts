import { AppPage } from './app.po';
import { MowerLogicService } from '../src/app/service/mowerlogic.service';
import { Grid } from '../src/app/model/grid.model';

describe('mower-taka App', () => {
  let page: AppPage;
  // let contentPage: string;
  let mowerService: MowerLogicService;
  // let lines: string[];
  let path;

  beforeEach(() => {
    page = new AppPage();
    mowerService = new MowerLogicService();
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
