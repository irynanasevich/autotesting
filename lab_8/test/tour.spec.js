const { Builder } = require('selenium-webdriver');
const chrome = require("selenium-webdriver/chrome");
const MainTourPage = require('../pages/MainTourPage');
const assert = require('assert');

describe('Test tez-tour site', function () {
  let driver;

  beforeEach(function () {
    const chromeOptions = new chrome.Options();
    chromeOptions.addArguments("test-type");
    chromeOptions.addArguments("start-maximized");
    chromeOptions.addArguments("--no-sandbox");
    chromeOptions.addArguments("--disable-dev-shm-usage");
    chromeOptions.addArguments("--headless");
    driver = new Builder().forBrowser('chrome').setChromeOptions(chromeOptions).build();
  });

  afterEach(async function () {
    driver && driver.quit();
  });

  it('Should get hotels by name', async function() {
    const tourPage = new MainTourPage(driver);
    tourPage
      .goToTourSite()
      .closeModal();

    await tourPage.waitCountryTab();

    tourPage
      .openCountryTab()
      .chooseCountry()

      await tourPage.waitCountryHotels();

      tourPage.chooseCountryHotels();

      tourPage
        .searchHotels('moscow')
        .findHotels()

      const foundHotelsLength = tourPage.getFoundHotelsLength();
      assert.ok(foundHotelsLength);
  })
})
