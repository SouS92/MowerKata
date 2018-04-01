import { AppPage } from './app.po';
import { MowerService } from '../src/app/service/mower.service';
import { Grid } from '../src/app/model/grid.model';

describe('Try a valid Text file', () => {
  let page: AppPage;
  let mowerService: MowerService;
  let path;

  beforeEach(() => {
    page = new AppPage();
    mowerService = new MowerService();
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

describe('Try with an invalid mower Actions', () => {
  let page: AppPage;
  let mowerService: MowerService;
  let path;

  beforeEach(() => {
    page = new AppPage();
    mowerService = new MowerService();
    path = require('path');
  });
  it('should display main page', () => {
    page.navigateTo();
    expect(page);
    expect(page.getParagraphText()).toEqual('Choose a txt file');
  });

  it('should select txt file and display result' , () => {

    const fileToUpload = '../invalidtest.txt',
    absolutePath = path.resolve(__dirname, fileToUpload);
    page.getInputFile().sendKeys(absolutePath);
  });

  it('should display error message' , () => {
    expect(page.getErrorText()).toContain('Error');

  });
  it('should keep browser open', () => {
    page.keepBrowser();
  });
});

describe('Try with a blank text file', () => {
  let page: AppPage;
  let path;

  beforeEach(() => {
    page = new AppPage();
    path = require('path');
  });
  it('should display main page', () => {
    page.navigateTo();
    expect(page);
    expect(page.getParagraphText()).toEqual('Choose a txt file');
  });

  it('should select an empty txt file' , () => {
    const fileToUpload = '../emptytest.txt',
    absolutePath = path.resolve(__dirname, fileToUpload);
    page.getInputFile().sendKeys(absolutePath);
  });
  it('should display error message' , () => {
    expect(page.getErrorText()).toContain('Error');

  });
  it('should keep browser open', () => {
    page.keepBrowser();
  });
});
