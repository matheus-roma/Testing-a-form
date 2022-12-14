const{Builder, By, until} = require("selenium-webdriver");
const assert = require('assert');
const { PAGE_URL, idBR, xPathFeedbackItems1, xPathFeedbackItems2, xPathFeedbackItems3, 
        feedbackEmptyField, languageButtonId, formPageTitleClassName, pageHeaderTitleClassName, 
        pageHeaderDescriptionClassName, formPageDescriptionClassName, textSecondaryClassName, 
        firstQuestionXPath, secondQuestionXPath, thirdQuestionXPath, submitTextId} = require('./constants');


//Test submition with all fields empty
async function testEmptyFields(){
    let driver = new Builder().forBrowser("firefox").build();

    try{

        //Opening firefox browser
        await driver.get(PAGE_URL);

        //Submiting without fill any field
        submitButton = driver.wait(until.elementLocated(By.id(submitTextId)));
        await driver.executeScript("arguments[0].click();", submitButton);

        //Checking reports
        let feedbackItem1 = driver.wait(until.elementLocated(By.xpath(xPathFeedbackItems1)));
        let feedbackItem2 = driver.wait(until.elementLocated(By.xpath(xPathFeedbackItems2)));
        let feedbackItem3 = driver.wait(until.elementLocated(By.xpath(xPathFeedbackItems3)));
    
        assert.strictEqual(await feedbackItem1.getText(), feedbackEmptyField);
        assert.strictEqual(await feedbackItem2.getText(), feedbackEmptyField);
        assert.strictEqual(await feedbackItem3.getText(), feedbackEmptyField);
        console.log("PASS!")
    
    } finally {
        //Closing the browser
        await driver.quit();
    }
}

async function testTranslation(){
    let driver = new Builder().forBrowser("firefox").build();

    try{

        //Opening firefox browser
        await driver.get(PAGE_URL);

        //Changing the language
        languageButton = driver.wait(until.elementLocated(By.id(languageButtonId)));
        await driver.executeScript("arguments[0].click();", languageButton);
 
        let brazilButton = driver.wait(until.elementLocated(By.id(idBR)));
        
        //Skiping delay to change the language
        //await driver.sleep(1000)
        await driver.executeScript("arguments[0].click();", brazilButton);
        //await driver.sleep(1000)
        

        let formPageTitle = driver.wait(until.elementLocated(By.className(formPageTitleClassName)));
        let pageHeaderTitle = driver.wait(until.elementLocated(By.className(pageHeaderTitleClassName)));
        let pageHeaderDescription = driver.wait(until.elementLocated(By.className(pageHeaderDescriptionClassName)));
        let formPageDescription = driver.wait(until.elementLocated(By.className(formPageDescriptionClassName)));
        let textSecondary = driver.wait(until.elementLocated(By.className(textSecondaryClassName)));
        let firstQuestion = driver.wait(until.elementLocated(By.xpath(firstQuestionXPath)));
        let secondQuestion = driver.wait(until.elementLocated(By.xpath(secondQuestionXPath)));
        let thirdQuestion = driver.wait(until.elementLocated(By.xpath(thirdQuestionXPath)));
        let submitText = driver.wait(until.elementLocated(By.id(submitTextId)));


        //assert.strictEqual(await formPageTitle.getText(), "Est?? ?? a primeira p??gina de nosso formul??rio.");
        //assert.strictEqual(await pageHeaderTitle.getText(), "Este ?? um formul??rio Liferay.");
        //assert.strictEqual(await pageHeaderDescription.getText(), "E aqui temos a descri????o do nosso formul??rio.");
        //assert.strictEqual(await formPageDescription.getText(), "Vamos come??ar.");
        //assert.strictEqual(await textSecondary.getText(), "Indica os campos obrigat??rios");
        assert.strictEqual(await firstQuestion.getText(), "Qual ?? o seu jogador de futebol favorito?");
        //assert.strictEqual(await secondQuestion.getText(), "Qual foi a data que a Liferay foi fundada?");
        assert.strictEqual(await thirdQuestion.getText(), "Por que voc?? ingressou na ??rea de testes?");
        assert.strictEqual(await submitText.getText(), "Submeter");
           

        console.log("PASS!")
    

    } catch(err){
        console.log("Input" + err)
    
    }finally {
        //Closing the browser
        await driver.quit();
    }

}
testEmptyFields();
//testTranslation();