const assert = require("assert");
const Driver = require("../driver/Driver");
const TravelataMainPage = require("../pages/TravelataMain.page");
const UserCreator = require("../services/UserCreator.service");
const TourCreator = require("../services/TourCreator.service");

describe("Travelata main page", () => {
  let driver;
  let travelataMainPage;

  beforeEach(async function () {
    driver = await Driver.getDriver();
    travelataMainPage = new TravelataMainPage(driver, 3);
  });

  afterEach(async function () {
    await Driver.closeDriver();
  });

  it('Should get error when subscribe to news by invalid email', async function () {
    travelataMainPage
      .openTravelataSite();

    await travelataMainPage.waitWelcomePopup();

    travelataMainPage
      .closeWelcomePopup()
      .writeEmailToSubscriptionField("invalidEmail")
      .sendEmailToSubscription();

    await travelataMainPage.waitEmailErrorMessage();

    const errorMessage = await travelataMainPage.getEmailErrorMessage();
    assert.strictEqual(errorMessage, "Неправильный емейл");
  });

  it('Should get certain hotels by country', async function () {
    const tourInfo = await TourCreator.withTourInfoFromProperty();

    travelataMainPage
      .openTravelataSite();

    await travelataMainPage.waitWelcomePopup();

    travelataMainPage
      .closeWelcomePopup()
      .chooseDestinationInput()
      .clearDestinationInput()
      .writeDestinationCountry(tourInfo.getCountry());

    await travelataMainPage.waitDropdownResorts();

    travelataMainPage
      .chooseDropdownResort()
      .searchHotels();

    await travelataMainPage.waitHotelsDestination();

    const isHotelCountrySuited = await travelataMainPage.getHotelsDestination(tourInfo.getCountry());
    assert.ok(isHotelCountrySuited);
  });

  it('Should change region', async function () {
    const newRegion = "Пермь";

    travelataMainPage
      .openTravelataSite();

    await travelataMainPage.waitWelcomePopup();

    travelataMainPage
      .closeWelcomePopup()
      .openRegionMenu();

    await travelataMainPage.waitRegionMenuContent();

    travelataMainPage
      .chooseRegion(newRegion);

    await travelataMainPage.waitRegionMenuContentClosed();

    const expectedRegion = await travelataMainPage.getCurrentRegion();

    assert.strictEqual(expectedRegion, newRegion);
  });

  it("Should get error message when log in by invalid credentials", async function () {
    const userInfo = await UserCreator.withInvalidCredentialsFromProperty();

    travelataMainPage
      .openTravelataSite();

    await travelataMainPage.waitWelcomePopup();

    travelataMainPage
      .closeWelcomePopup()
      .openLoginForm();

    await travelataMainPage.waitEmailFormField();

    travelataMainPage
      .writeEmail(userInfo.getEmail())
      .writePassword(userInfo.getPassword())
      .enterToAccount();

    await travelataMainPage.waitLoginErrorMessage();

    const errorMessage = await travelataMainPage.getLoginErrorMessage();
    assert.strictEqual(errorMessage, "Попробуйте другой логин или пароль");
  });
});
