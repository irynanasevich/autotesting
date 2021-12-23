const { createLogger, format, transports } = require("winston");
const { By, until } = require('selenium-webdriver');

class TravelataBasePage {

  loading = '#searchProgressBar .progressStatusContainer';

  constructor(driver, popupNumber) {
    this.driver = driver;
    this.welcomePopup = `#ui-id-${ popupNumber } > .popupClose > i`;
    this.logger = createLogger({
      level: 'info',
      format: format.combine(
        format.timestamp(),
        format.json()
      ),
      transports: [
        new transports.Console()
      ]
    });
  }

  async waitWelcomePopup() {
    return this.driver.wait(until.elementLocated(By.css(this.welcomePopup)));
  }

  async waitLoading() {
    this.loadingElement = this.findElementBy('css', this.loading)
    return this.driver.wait(until.elementIsNotVisible(this.loadingElement));
  }

  closeWelcomePopup() {
    this.clickBy('css', this.welcomePopup);
    return this;
  }

  findElementBy(by, searchPath) {
    return this.driver.findElement(By[by](searchPath));
  }

  enterTextBy(by, searchPath, searchText) {
    this.findElementBy(by, searchPath).sendKeys(searchText);
  }

  clickBy(by, searchPath) {
    this.findElementBy(by, searchPath).click();
  }

}

module.exports = TravelataBasePage;
