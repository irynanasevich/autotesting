const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const carsPage = require('../pages/CarsPage');

describe('Test cars section', function () {
  let driver;

  beforeEach(function () {
    const chromeOptions = new chrome.Options();
    chromeOptions.addArguments('test-type');
    chromeOptions.addArguments('start-maximized');
    chromeOptions.addArguments("--no-sandbox");
    chromeOptions.addArguments("--disable-dev-shm-usage");
    // chromeOptions.addArguments('--headless');

    driver = new Builder().forBrowser('chrome').setChromeOptions(chromeOptions).build();
    driver.get('https://www.hotwire.com/');
  });

  afterEach(async function () {
    // driver && driver.quit();
  });

  it('Searching for cars without "Pick-up location" field', async function() {
    await carsPage.navigateToCarsSection(driver);
  });
})
