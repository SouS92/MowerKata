import { browser, by, element, ExpectedConditions } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h4')).getText();
  }

  getInputFile() {
    browser.executeScript('$(\'input[type="file"]\').attr("style", "");');
    // browser.executeScript('$(\'input[type="file"]\').removeClass("hidden-uploader");');
    return element(by.css('input[type="file"]'));
  }

  keepBrowser() {
    browser.sleep(10000);
  }

}
