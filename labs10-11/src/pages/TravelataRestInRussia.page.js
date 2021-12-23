const TravelataBasePage = require('./TravelataBase.page');
const { until, By } = require("selenium-webdriver");

class TravelataRestInRussiaPage extends TravelataBasePage {

  #TRAVELATA_RUSSIA_PAGE_URL = 'https://travelata.ru/russia';

  excursionsType = '.js-tourFilter__item:nth-child(2)';
  typeOfRestTitle = '.toursCity_right > h2';
  departureCitySelect = '.customSelect__form-title > a';
  newDepartureCity = '.customSelect__list > div > div:nth-child(6)';

  constructor(driver, popupNumber) {
    super(driver, popupNumber);
  }

  async waitTypeOfRest() {
    return this.driver.wait(until.elementLocated(By.css(this.typeOfRestTitle)));
  }

  async waitDepartureCityAfterChange() {
    return this.driver.wait(until.elementLocated(By.css(this.departureCitySelect)));
  }

  async getDepartureCity() {
    this.departureCityElement = this.findElementBy('css', this.departureCitySelect);
    this.logger.info('Get departure city');
    return this.departureCityElement.getText();
  }

  async getTypeOfRest() {
    this.typeOfRestElement = this.findElementBy('css', this.typeOfRestTitle);
    this.logger.info('Get type of rest');
    return this.typeOfRestElement.getText();
  }

  goToRestInRussiaPage() {
    this.driver.get(this.#TRAVELATA_RUSSIA_PAGE_URL);
    this.logger.info('Open rest in Russia page');
    return this;
  }

  changeDepartureCity() {
    this.clickBy('css', this.newDepartureCity);
    this.logger.info('Change departure city');
    return this;
  }

  openDepartureSelect() {
    this.clickBy('css', this.departureCitySelect);
    this.logger.info('Open departure select');
    return this;
  }

  chooseExcursionsTypeOfRest() {
    this.clickBy('css', this.excursionsType);
    this.logger.info('Choose excursions rest type');
    return this;
  }

}

module.exports = TravelataRestInRussiaPage;
