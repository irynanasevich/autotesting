const TravelataBasePage = require('./TravelataBase.page');
const { until, By } = require("selenium-webdriver");

class TravelataMainPage extends TravelataBasePage {

  #TRAVELATA_BASE_URL = 'https://travelata.ru/';
  region = 'Москва';

  loginButton = '.accountTopMenuBar__logInButton';
  emailField = '#accountAuthorize__email';
  passwordField = '#accountAuthorize__password';
  authorizedButton = '.accountAuthorize__submitAuthFormContainer > button';
  loginErrorMessage = '#accountAuthorize__email-error';
  currentRegion = `//div/span[text()="${ this.region }"]`;
  queryRegionName = `a[title="${ this.region }"]`;
  regionMenuContent = '.region .open';
  destination = '[name="destination"]';
  clearDestination = '#mainSearchForm .close';
  searchToursButton = '#startSearch';
  dropdownResorts = '.formDropdownContent li:nth-child(3) > label > div > div';
  hotelDestination = '.serpHotelCard__info > a';
  newsSubscription = '#newsletter-validate-detail input';
  newsSubscriptionButton = '#newsletter-validate-detail button';
  emailError = '#email-error';

  constructor(driver, popupNumber) {
    super(driver, popupNumber);
  }

  openTravelataSite() {
    this.driver.get(this.#TRAVELATA_BASE_URL);
    this.logger.info('Open Travelata site');
    return this;
  }

  async waitRegionMenuContent() {
    return this.driver.wait(until.elementLocated(By.css(this.regionMenuContent)));
  }

  async waitRegionMenuContentClosed() {
    return this.driver.wait(until.elementLocated(By.xpath(this.currentRegion)));
  }

  async waitEmailErrorMessage() {
    return this.driver.wait(until.elementLocated(By.css(this.emailError)));
  }

  async waitDropdownResorts() {
    return this.driver.wait(until.elementLocated(By.css(this.dropdownResorts)));
  }

  async waitHotelsDestination() {
    return this.driver.wait(until.elementsLocated(By.css(this.hotelDestination)));
  }

  async waitEmailFormField() {
    return this.driver.wait(until.elementLocated(By.css(this.emailField)));
  }

  async waitLoginErrorMessage() {
    return this.driver.wait(until.elementLocated(By.css(this.loginErrorMessage)));
  }

  async getHotelsDestination(countryName) {
    this.hotelsElements = await this.driver.findElements(By.css(this.hotelDestination));
    this.hotelCountry = await Promise.all(this.hotelsElements.map(excursion => excursion.getText()));
    this.logger.info('Get hotel destination');
    return this.hotelCountry.every(country => country.includes(countryName));
  }

  async getLoginErrorMessage() {
    this.errorMessageElement = this.findElementBy('css', this.loginErrorMessage);
    this.logger.info('Get email login error message');
    return this.errorMessageElement.getText();
  }

  async getEmailErrorMessage() {
    this.emailErrorElement = this.findElementBy('css', this.emailError);
    this.logger.info('Get email error message');
    return this.emailErrorElement.getText();
  }

  async getCurrentRegion() {
    this.currentRegionElement = this.findElementBy('xpath', this.currentRegion);
    this.logger.info('Get current region');
    return this.currentRegionElement.getText();
  }

  openRegionMenu() {
    this.clickBy('xpath', this.currentRegion);
    this.logger.info('Open region menu');
    return this;
  }

  updateRegionName(region) {
    this.region = region;
    this.queryRegionName = `a[title="${ region }"]`;
    this.currentRegion = `//div/span[text()="${ region }"]`;
  }

  chooseRegion(region) {
    this.updateRegionName(region);
    this.clickBy('css', this.queryRegionName);
    this.logger.info('Choose region');
    return this;
  }

  sendEmailToSubscription() {
    this.clickBy('css', this.newsSubscriptionButton);
    this.logger.info('Send email to subscription');
    return this;
  }

  writeEmailToSubscriptionField(userEmail) {
    this.enterTextBy('css', this.newsSubscription, userEmail);
    this.logger.info('Write email to subsciption field');
    return this;
  }

  searchHotels() {
    this.clickBy('css', this.searchToursButton);
    this.logger.info('Search hotels');
    return this;
  }

  chooseDropdownResort() {
    this.clickBy('css', this.dropdownResorts);
    this.logger.info('Choose dropdown resort');
    return this;
  }

  chooseDestinationInput() {
    this.clickBy('css', this.destination);
    this.logger.info('Choose destination in form');
    return this;
  }

  clearDestinationInput() {
    this.clickBy('css', this.clearDestination);
    this.logger.info('Clear destination in form');
    return this;
  }

  writeDestinationCountry(countryName) {
    this.enterTextBy('css', this.destination, countryName);
    this.logger.info('Write destination country');
    return this;
  }

  openLoginForm() {
    this.clickBy('css', this.loginButton);
    this.logger.info('Open login form');
    return this;
  }

  writeEmail(userEmail) {
    this.enterTextBy('css', this.emailField, userEmail);
    this.logger.info('Write email');
    return this;
  }

  writePassword(userPassword) {
    this.enterTextBy('css', this.passwordField, userPassword);
    this.logger.info('Write password');
    return this;
  }

  enterToAccount() {
    this.clickBy('css', this.authorizedButton);
    this.logger.info('Enter to account');
    return this;
  }

}

module.exports = TravelataMainPage;
