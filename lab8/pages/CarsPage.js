const { By } = require('selenium-webdriver');

class CarsPage {

  carsSectionSelector = '#root > div.hw-header.site-header--wrapper > nav > div > ul > li:nth-child(2) > a';

  navigateToCarsSection(driver) {
    driver
      .findElement(By.css(this.carsSectionSelector))
      .click();
  }

}

module.exports = new CarsPage();
