const mongoose = require('mongoose');
const puppeteer = require('puppeteer');
const fs = require('fs');
const schedule = require('node-schedule');
const cloudinary = require('cloudinary');
const keys = require('./config/keys');

const requireLogin = require('./middlewares/requireLogin');
const Mailer = require('./services/Mailer');
const warningTemplate = require('./services/emailTemplates/warningTemplate');
const redTemplate = require('./services/emailTemplates/redTemplate');

const Wins = mongoose.model('wins'); //Load Wins
const Participants = mongoose.model('participants'); //Load Participants

const ruleScrape = new schedule.RecurrenceRule()
ruleScrape.minute = 10;
ruleScrape.hour = 5;
ruleScrape.dayOfWeek = [0,4];

const ruleUpdateCredit = new schedule.RecurrenceRule()
ruleUpdateCredit.minute = 10;
ruleUpdateCredit.hour = 5;
ruleUpdateCredit.dayOfWeek = 1;

cloudinary.config(
    {
        cloud_name: keys.nameCloudinary,
        api_key: keys.apiKeyCloudinary,
        api_secret: keys.apiSecretCloudinary,
    }
)

//For Deployment in Heroku: Puppeteer has an error that requires more dependency in order to work properly
//https://github.com/GoogleChrome/puppeteer/issues/758
const scrapeForLotto = () => {
    //close button
    const promotionClose = 'body > div.mwc.ng-isolate-scope > div > div > div > div > div.mwc-modal-header.mwc-popup-promo > button';
    const winningClose = 'body > div.mwc.ng-isolate-scope > div > div > div > div > div > div.mwc-modal-header.mwc-popup-promo > button';
    const okayPopup = '#gls-form > div > div.mwc-btn-holder > input'

    //burger button
    const mobileButton = '#mobile-header-container > div > div.bm-burger-button.navigation-burger-button > button';

    //sign in
    const signInButton = '#login_button';
    const email = '#user';
    const password = '#password';
    const submitSignIn = '#submit';

    const multipleSession = 'body > div.mwc.ng-isolate-scope > div > div > div > div > div.mwc-modal-footer > div > div.mwc-row-fluid.mwc-center.mwc-popup-dialog-buttons.mwc-clearfix > div > button';

    //user nav
    const options = '#account-status-button';
    const account = '#account-dropdown > div:nth-child(2) > div:nth-child(1) > a';
    const pastDraws = '#accountSections-itemid-2 > div:nth-child(3) > div > div > div.mwc-account-block-title.mwc-f6.mwc-s.ng-binding';

    (async () => {

        console.log('Copying image file...')
        try{
            await cloudinary.v2.uploader.rename("lotto_6", "lotto_8", { overwrite: true, invalidate: true });
            console.log('Finished copying image file1...') 
            await cloudinary.v2.uploader.rename("lotto_4", "lotto_6", { overwrite: true, invalidate: true });
            console.log('Finished copying image file3...')
            await cloudinary.v2.uploader.rename("lotto_2", "lotto_4", { invalidate: true });
            console.log('Finished copying image file5...') 

            await cloudinary.v2.uploader.rename("lotto_5", "lotto_7", { overwrite: true, invalidate: true });
            console.log('Finished copying image file2...') 
            await cloudinary.v2.uploader.rename("lotto_3", "lotto_5", { overwrite: true, invalidate: true });
            console.log('Finished copying image file4...')
            await cloudinary.v2.uploader.rename("lotto_1", "lotto_3", { invalidate: true });
            console.log('Finished copying image file6...') 
        }
        catch(err){
            //do nothing
        }

        //Open new browser and go to the website
        console.log('Opening a browser...')
        const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
        const page = await browser.newPage();
        await page.setViewport({ width: 745, height: 868});
        await page.goto('https://www.michiganlottery.com/');
        await page.waitFor(3*1000);
        await page.click(mobileButton);
        await page.waitFor(3*1000);
        console.log('Navigating to website...')   

        //Sign In
        console.log('Start Sign in...')      
        await page.click(signInButton);
        await page.waitFor(3*1000);
        await page.click(email);
        await page.keyboard.type(keys.email);
        await page.click(password);
        await page.waitFor(3*1000);
        await page.keyboard.type(keys.ps);
        await page.click(submitSignIn);
        await page.waitFor(3*1000);
        console.log('Sign in Compelete..')

        //Check to see if there is a popup promotion
        if (await page.$(promotionClose) !== null) {
            //Found
            console.log('found promotion button');
            await page.click(promotionClose);
            await page.waitFor(3*1000);
        }

        //Check to see if there is a popup promotion
        if (await page.$(winningClose) !== null) {
            //Found
            console.log('found winning button');
            await page.click(winningClose);
            await page.waitFor(3*1000);
        }
        //Check to see if there is a popup location
        if (await page.$(okayPopup) !== null) {
            //Found
            console.log('found location button');
            await page.click(okayPopup);
            await page.waitFor(3*1000);
        }

        //Go in the Account Information Once
        console.log('Going to User Acount First Time')
        await page.waitFor(10*1000);
        await page.click(mobileButton);
        await page.waitFor(3*1000);      
        await page.click(account);
        await page.waitFor(3*1000);
        console.log('Finished Acount First Time...')                    
        await page.waitFor(10*1000);
        
        //Go inside the Past Draw History
        console.log('Going through the draws...')
        await page.waitFor(3*1000); 
        await page.click(pastDraws);              
        console.log('Done going through the draws...')
        await page.waitFor(5*1000);

        //Take screenshot of winnings
        console.log('Going Screenshots...')
        await page.screenshot({path: './client/src/components/img/Lotto1.png', clip: { x: 10, y: 300, width: 500, height: 180 }}); //power 10 & 300
        await page.screenshot({path: './client/src/components/img/Lotto2.png', clip: { x: 10, y: 490, width: 500, height: 180 }}); //mega 490
      
        await cloudinary.v2.uploader.upload("./client/src/components/img/Lotto1.png", 
            {public_id: "lotto_1"}, 
            async (err, res) => {
                await Wins.update({_id: keys.winId}, {$push: { powerPics: res.version }})
                await Wins.update({_id: keys.winId}, { $pop: { powerPics: -1 }})
            }); 
        await cloudinary.v2.uploader.upload("./client/src/components/img/Lotto2.png", 
            {public_id: "lotto_2"}, 
            async (err, res) => {
                await Wins.update({_id: keys.winId}, {$push: { megaPics: res.version }})
                await Wins.update({_id: keys.winId}, { $pop: { megaPics: -1 }})
            }); 

        console.log('Done Taking Screenshots...')

        //See how much was won for each and it's date
        const elementsDateResult = {};
        const DATES = {};
        const WINNINGS = {};
        for (let x = 1; x <= 2; x++) {
            elementsDateResult[`date_${x}`] = `#history-games-container > div.mwc-container-fluid.mwc-history-games-wrapper.mwc-margin-top.ng-scope > div > div:nth-child(2) > div:nth-child(${x}) > div > div.mwc-history-transaction-header.mwc-f5.mwc-b3.mwc-b.mwc-r.mwc-t3.ng-binding`;
            elementsDateResult[`result_${x}`] = `#history-games-container > div.mwc-container-fluid.mwc-history-games-wrapper.mwc-margin-top.ng-scope > div > div:nth-child(2) > div:nth-child(${x}) > div > div.mwc-container-fluid.mwc-history-games-wrapper > div > div > div > div.mwc-dbg-game-history-transaction-bottom.mwc-clearfix > div > span.mwc-b.ng-binding`;
            
            DATES[`date${x}`] = await page.evaluate((sel) => {
                let date = 'NA'
                try{
                    date = document.querySelector(sel).innerHTML;
                }
                catch(err){
                    return date
                }
                return date;
            }, elementsDateResult[`date_${x}`]);
            
            WINNINGS[`result${x}`] = await page.evaluate((sel) => {
                let winnings = 'NA'
                try{
                    winnings = parseInt((document.querySelector(sel).innerHTML).replace('$', '').replace('.00', ''));
                }
                catch(err){
                    return winnings
                }
                return winnings
            }, elementsDateResult[`result_${x}`]);
            
            //display dates
            console.log(`date${x}`, DATES[`date${x}`]);
            console.log(`result_${x}`, WINNINGS[`result${x}`]);
            
        }
        await Wins
            .update({_id: keys.winId}, {$push: { 
                megaWin: { 
                    winDate: new Date(DATES.date2).toLocaleDateString('en-US'), winAmount: WINNINGS.result2 
                },
                powerWin: {
                    winDate: new Date(DATES.date1).toLocaleDateString('en-US'), winAmount: WINNINGS.result1
                }
            }})
        await browser.close();
    })();
}

//Updating Credits and Sending email to those with less credits
const updateCredits = async () => {
    console.log('updating credit...')
    getMonday = (d) => {
        d = new Date(d);
        let day = d.getDay();
        let diff = d.getDate() - day + (day === 0 ? -6 : 1);
        return new Date(d.setDate(diff));
     };
     const currentMonday = getMonday(new Date()).toLocaleDateString();
     const warningGroup = [] //People with 1 credit
     const redGroup = [] //People with 0 credit
     let participants = await Participants.find({category: 'LottoCategory'})
     participants.forEach( async ({ _id, dueDate, credit, email }) => {
          const diff = new Date(dueDate) - new Date(currentMonday)
          const creditLeft = (diff / (1000 * 60 * 60 * 24))/7;
          if (creditLeft === 1) {
            warningGroup.push({email})
          }
          else if (creditLeft < 1) {
            redGroup.push({email})
          }
          await Participants.update({_id}, {credit: creditLeft})
     })
     //Get only unique email set
     const uniqueArray = a => [...new Set(a.map(o => JSON.stringify(o)))].map(s => JSON.parse(s))
     const warningContent = {recipients: uniqueArray(warningGroup), subject: `Lotto Due Next Week`}
     const warningMailer = new Mailer(warningContent, warningTemplate(warningContent))
     
     const redContent = {recipients: uniqueArray(redGroup), subject: `Lotto is due`}
     const redMailer = new Mailer(redContent, redTemplate(redContent))
        try{
            if (warningGroup.length !== 0){
                await warningMailer.send();  
            }
            if (redGroup.length !== 0){
                await redMailer.send();  
            }   
        }
        catch(err) {
            console.log('error sending mail regarding credit', err)
        }   
        console.log('updated credit...')
}

schedule.scheduleJob(ruleScrape, function(){scrapeForLotto()});
schedule.scheduleJob(ruleUpdateCredit, function(){updateCredits()});

