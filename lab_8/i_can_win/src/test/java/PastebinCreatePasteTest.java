import org.openqa.selenium.Dimension;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxOptions;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;
import page.PastebinCreatePasteResultsPage;
import page.PastebinHomePage;

public class PastebinCreatePasteTest {
    private WebDriver driver;
    private static final String CODE = "Hello from WebDriver";
    private static final String NAME = "helloweb";

    @BeforeMethod(alwaysRun = true)
    public void setupBrowser() {
        FirefoxOptions options = new FirefoxOptions();
        options.setHeadless(true);
        driver = new FirefoxDriver(options);
        driver.manage().window().setSize(new Dimension(1000, 2000));
    }

    @Test
    public void createPasteTest() {
        PastebinHomePage homePage = new PastebinHomePage(driver);
        PastebinCreatePasteResultsPage resultsPage = homePage.openHomePage()
                                                             .pasteCode(CODE)
                                                             .selectExpiration()
                                                             .pasteName(NAME)
                                                             .createPaste();
        Assert.assertTrue(resultsPage.isInitialized());
    }

    @AfterMethod(alwaysRun = true)
    public void tearDownBrowser() {
        driver = null;
    }
}
