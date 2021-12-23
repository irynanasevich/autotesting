const assert = require("assert");
const Driver = require("../driver/Driver");
const TravelataFindToursPage = require("../pages/TravelataFindTours.page");

describe("Travelata find tours page", () => {
  let driver;
  let travelataFindToursPage;

  beforeEach(async function () {
    driver = await Driver.getDriver();
    travelataFindToursPage = new TravelataFindToursPage(driver, 3);
  });

  afterEach(async function () {
    await Driver.closeDriver();
  });

  it('Should change from any beach type to sand beach type', async function () {
    travelataFindToursPage
      .goToFindToursPage();

    await travelataFindToursPage.waitWelcomePopup();

    travelataFindToursPage
      .closeWelcomePopup()

    await travelataFindToursPage.waitLoading();

    travelataFindToursPage
      .chooseBeachType();

    await travelataFindToursPage.waitToursState();

    const isSandTypes = await travelataFindToursPage.getSandTypesOfBeach();
    assert.ok(isSandTypes);
  });

  it('Should change any line of beach to second line', async function () {
    travelataFindToursPage
      .goToFindToursPage();

    await travelataFindToursPage.waitWelcomePopup();

    travelataFindToursPage
      .closeWelcomePopup()

    await travelataFindToursPage.waitLoading();

    travelataFindToursPage
      .chooseLineOfBeach();

    await travelataFindToursPage.waitToursState();

    const isSecondLines = await travelataFindToursPage.getLinesOfBeach();
    assert.ok(isSecondLines);
  });
});
