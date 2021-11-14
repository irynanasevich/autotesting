package page;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class PastebinCreatePasteResultsPage {
    private WebDriver driver;

    private WebElement pageHeader;
    private By pageHeaderLocator = By.xpath("//div[@class='info-top']/h1");

    private WebElement syntaxHighlightingField;
    private By syntaxHighlightingFieldLocator = By.xpath("//div[@class='top-buttons']/div[@class='left']/a");

    private WebElement textArea;
    private By textAreaLocator = By.xpath("//textarea[@class='textarea']");

    public PastebinCreatePasteResultsPage(WebDriver driver) {
        this.driver = driver;
        pageHeader = findElementByLocator(pageHeaderLocator);
        syntaxHighlightingField = findElementByLocator(syntaxHighlightingFieldLocator);
        textArea = findElementByLocator(textAreaLocator);
    }

    public boolean isInitialized() {
        return pageHeader.isDisplayed();
    }

    public String copyPageHeader() {
        return pageHeader.getText();
    }

    public boolean isHighlighting(final String SYNTAX) {
        final String syntax = syntaxHighlightingField.getText();
        return syntax.equals(SYNTAX);
    }

    public boolean isEquals(final String CODE) {
        final String code = textArea.getText();
        return code.equals(CODE);
    }

    private WebElement findElementByLocator(By locator) {
        return new WebDriverWait(driver, 10)
                .until(ExpectedConditions
                        .presenceOfElementLocated(locator));
    }
}
