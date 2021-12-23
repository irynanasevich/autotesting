const assert = require("assert");
const Driver = require("../driver/Driver");
const TravelataRestInRussia = require("../pages/TravelataRestInRussia.page");

describe("Travelata rest in Russia page", () => {
  let driver;
  let travelataRestInRussia;

  beforeEach(async function () {
    driver = await Driver.getDriver();
    travelataRestInRussia = new TravelataRestInRussia(driver, 2);
  });

  afterEach(async function () {
    await Driver.closeDriver();
  });

  it('Should change departure city', async function() {
    travelataRestInRussia.goToRestInRussiaPage();

    await travelataRestInRussia.waitWelcomePopup();

    travelataRestInRussia
      .closeWelcomePopup()
      .openDepartureSelect()
      .changeDepartureCity();

    await travelataRestInRussia.waitDepartureCityAfterChange();

    const departureCityAfterChange = await travelataRestInRussia.getDepartureCity();

    assert.strictEqual(departureCityAfterChange, "Архангельск");
  });

  it('Should choose excursions type of rests', async function() {
    travelataRestInRussia.goToRestInRussiaPage();

    await travelataRestInRussia.waitWelcomePopup();

    travelataRestInRussia
      .closeWelcomePopup()
      .chooseExcursionsTypeOfRest();

    await travelataRestInRussia.waitTypeOfRest();

    const typeOfRest = await travelataRestInRussia.getTypeOfRest();

    assert.strictEqual(typeOfRest, "Экскурсионный");
  });

});
