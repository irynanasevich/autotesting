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

public class PastebinCreateBashPasteTest {
    private WebDriver driver;
    private static final String CODE = "git config --global user.name  \"New Sheriff in Town\"\n" +
                                       "git reset $(git commit-tree HEAD^{tree} -m \"Legacy code\")\n" +
                                       "git push origin master --force";
    private static final String NAME = "how to gain dominance among developers";
    private static final String PAGE_HEADER = NAME;
    private static final String SYNTAX = "Bash";

    @BeforeMethod(alwaysRun = true)
    public void setupBrowser() {
        FirefoxOptions options = new FirefoxOptions();
        options.setHeadless(true);
        driver = new FirefoxDriver(options);
        driver.manage().window().setSize(new Dimension(1000, 2000));
    }

    @Test
    public void createBashPaste_pageHeaderCompare_checkSyntaxHighlighting_checkCodeTest() {
        PastebinHomePage homePage = new PastebinHomePage(driver);
        final PastebinCreatePasteResultsPage resultsPage = homePage.openHomePage()
                                                                   .pasteCode(CODE)
                                                                   .selectSyntaxHighlighting()
                                                                   .selectExpiration()
                                                                   .pasteName(NAME)
                                                                   .createPaste();
        final boolean isInitialized = resultsPage.isInitialized();
        final String pageHeader = resultsPage.copyPageHeader();
        final boolean isHighlighting = resultsPage.isHighlighting(SYNTAX);
        final boolean isEquals = resultsPage.isEquals(CODE);

        Assert.assertTrue(isInitialized);
        Assert.assertEquals(pageHeader, PAGE_HEADER);
        Assert.assertTrue(isHighlighting);
        Assert.assertTrue(isEquals);
    }

    @AfterMethod(alwaysRun = true)
    public void tearDownBrowser() {
        driver = null;
    }
}
