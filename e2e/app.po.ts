import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h4')).getText();
  }

  getFileContent() {
    return '5 5\n1 2 N\nLMLMLMLMM';
  }

}
