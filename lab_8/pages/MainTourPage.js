const { By, until } = require('selenium-webdriver');
const tourSiteURL = 'https://www.tez-tour.com/';

class MainTourPage {
  closeModalButtonId = 'fancybox-close';
  countryTabXpath = '//*[@id="firstlevel"]/li[1]';
  countrySelector = 'country-150601';
  countryHotelsSelector = 'div.right-country-info > div:nth-child(25) > div > div.country-info-morelinks > ul > li.field-3';
  hotelSearchInputSelector = '#grid-list_filter > input';
  hotelsSubmitXpath = '//*[@id="1"]';
  hotelsTableSelector = '#grid-list';
  hotelsTableContentSelector = '#grid-list > tbody > tr';

  constructor(driver) {
    this.driver = driver;
  }

  goToTourSite() {
    this.driver.get(tourSiteURL);
    return this;
  }

  async waitCountryTab() {
    return this.driver.wait(until.elementLocated(By.xpath(this.countryTabXpath)));
  }

  async waitCountryHotels() {
    return this.driver.wait(until.elementLocated(By.css(this.countryHotelsSelector)));
  }

  findElementOnTourPage(byField, elementPath) {
    return this.driver.findElement(By[byField](elementPath));
  }

  searchHotels(hotelName) {
    this.findElementOnTourPage('css', this.hotelSearchInputSelector).sendKeys(hotelName);
    return this;
  }

  findHotels() {
    this.findElementOnTourPage('xpath', this.hotelsSubmitXpath).click();
    return this;
  }

  getFoundHotelsLength() {
    return this.findElementOnTourPage('css', this.hotelsTableSelector)
      .findElements(By.css(this.hotelsTableContentSelector))
      .then(function(hotels){
        return hotels.length;
      });
  }

  chooseCountryHotels() {
    this.findElementOnTourPage('css', this.countryHotelsSelector).click();
    return this;
  }

  chooseCountry() {
    this.findElementOnTourPage('id', this.countrySelector).click();
    return this;
  }

  openCountryTab() {
    this.findElementOnTourPage('xpath', this.countryTabXpath).click();
    return this;
  }

  closeModal() {
    this.findElementOnTourPage('id', this.closeModalButtonId).click();
    return this;
  }
}

module.exports = MainTourPage;
