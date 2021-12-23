const TravelataBasePage = require('./TravelataBase.page');
const { By, until } = require("selenium-webdriver");

class TravelataFindToursPage extends TravelataBasePage {

  #TRAVELATA_FIND_TOURS_URL = 'https://kostroma.travelata.ru/search';

  secondLine = '.secondLine';
  lineOfBeach = '.serpHotelCard__attribute:first-child';
  toursState = '.toursFilteringState';
  sandBeach = '.sandBeach label';
  beachType = '.serpHotelCard__attribute:nth-child(2)'

  constructor(driver, popupNumber) {
    super(driver, popupNumber);
  }

  async waitToursState() {
    this.tableOfTours = this.findElementBy('css', this.toursState);
    return this.driver.wait(until.elementIsNotVisible(this.tableOfTours));
  }

  async getLinesOfBeach() {
    this.linesOfBeachElements = await this.driver.findElements(By.css(this.lineOfBeach));
    this.linesOfBeaches = await Promise.all(this.linesOfBeachElements.map(line => line.getText()));
    this.logger.info('Get line of beach');
    return this.linesOfBeaches.every(line => line.includes('2-я линия'));
  }

  async getSandTypesOfBeach() {
    this.beachTypeElements = await this.driver.findElements(By.css(this.beachType));
    this.beachTypes = await Promise.all(this.beachTypeElements.map(beach => beach.getText()));
    this.logger.info('Get sand type of beach');
    return this.beachTypes.every(type => type.includes('песок'));
  }

  goToFindToursPage() {
    this.driver.get(this.#TRAVELATA_FIND_TOURS_URL);
    this.logger.info('Open find tours page');
    return this;
  }

  chooseLineOfBeach() {
    this.clickBy('css', this.secondLine);
    this.logger.info('Choose line of beack');
    return this;
  }

  chooseBeachType() {
    this.clickBy('css', this.sandBeach);
    this.logger.info('Choose beach type');
    return this;
  }

}

module.exports = TravelataFindToursPage;
