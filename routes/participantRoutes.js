const mongoose = require('mongoose')
const requireLogin = require('../middlewares/requireLogin');
const Mailer = require('../services/Mailer');
const keys = require('../config/keys')

const receiptTemplate = require('../services/emailTemplates/receiptTemplate');
const freeTemplate = require('../services/emailTemplates/freeTemplate')
const skipTemplate = require('../services/emailTemplates/skipTemplate')

const Participants = mongoose.model('participants'); //Load Participants
const Wins = mongoose.model('wins');

module.exports = (app) => {
    //Fetch All Participants
    app.get('/api/fetch_participants', async (req, res) => {
        const participants = await Participants.find({category: 'LottoCategory'})
        res.send(participants);
    })

    //Adding Participants
    app.post('/api/add_participants', requireLogin, async (req, res) => {
        const { name, email, isMega, currentMonday} = req.body;
        let participant = null
            participant = await new Participants(
                {
                    name,
                    email,
                    category: 'LottoCategory',
                    _user: req.user.id,
                    [isMega]: true,
                    dueDate: currentMonday
                }
            ).save();
        const participants = await Participants.find({category: 'LottoCategory'})
        res.send(participants);
    })

    //Adding Free or Skip (group)
    app.post('/api/free_amount', requireLogin,  async (req, res) => {
        const { isMega, freeAmount, freeOrSkip, dateFree, currentMonday } = req.body;
        let participants = await Participants.find({[isMega]: true, hide: false});
        
        if (freeOrSkip.toUpperCase() === 'FREE') {
            if (isMega === 'mega'){
                await Wins
                .update({_id: keys.winId }, {$push: { 
                    megaWin: { 
                        winDate: `${new Date(dateFree).toLocaleDateString('en-US')} - ${freeOrSkip}`, winAmount: -freeAmount 
                    },
                }})
            }
            else if (isMega === 'powerball'){
                await Wins
                .update({_id: keys.winId}, {$push: { 
                    powerWin: {
                        winDate: `${new Date(dateFree).toLocaleDateString('en-US')} - ${freeOrSkip}`, winAmount: -freeAmount
                    }
                }})
            }
        }
        const moneyWon = freeAmount/participants.length;
        const emails = [];
        participants
            .forEach( async ({ credit, email, _id }) => {
                const newCredit = credit + (moneyWon/2);
                const result = new Date(currentMonday);
                const newDueDate = new Date(result.setDate(result.getDate() + (newCredit * 7))).toLocaleDateString('en-US');
                emails.push({ email });
                await Participants.update({_id}, {$push: {payments: { paidDate: `${dateFree} - ${freeOrSkip}`, paidAmount: moneyWon }}, dueDate: newDueDate, credit: newCredit })
            })
        const content = {recipients: emails, paidAmount: freeAmount, paidDate: dateFree, subject: `${freeOrSkip} Lotto`}
        const mailer = freeOrSkip.toUpperCase() === 'FREE' ? new Mailer(content, freeTemplate(content)) 
            : freeOrSkip.toUpperCase() === 'SKIP' ? new Mailer(content, skipTemplate(content)) : null
        try{
            await mailer.send();     
        }
        catch(err) {
            res.status(422).send(err)
        }   
        participants = await Participants.find({category: 'LottoCategory'})
        const wins = await Wins.findById({_id: keys.winId })
        res.send({participants, wins});
    })

    //Adding Paid (individual)
    app.post('/api/paid_amount', requireLogin, async (req, res) => {
        const { paidAmount, paidDate, _id, email, name, credit, dueDate, currentMonday } = req.body;

        const newCredit = credit + (paidAmount/2);
        const result = new Date(currentMonday);
        const newDueDate = new Date(result.setDate(result.getDate() + (newCredit * 7))).toLocaleDateString('en-US');

        const content = {recipients: [{ email }], name, paidAmount, paidDate, newDueDate, newCredit, subject: 'Lotto Receipt'}
        await Participants.update({_id}, {$push: {payments: { paidDate, paidAmount }}, dueDate: newDueDate, credit: newCredit })
        const mailer = new Mailer(content, receiptTemplate(content))
        try{
            await mailer.send();     
            const participants = await Participants.find({category: 'LottoCategory'})
            res.send(participants);
        }
        catch(err) {
            res.status(422).send(err)
        }
    })

    //Updating Credit
    app.post('/api/update_credit', async (req, res) => {
        //Finds out what Monday of the month it is
        getMonday = (d) => {
           d = new Date(d);
           let day = d.getDay();
           let diff = d.getDate() - day + (day === 0 ? -6 : 1);
           return new Date(d.setDate(diff));
        };
        const currentMonday = getMonday(new Date()).toLocaleDateString();
        let participants = await Participants.find({category: 'LottoCategory'})
        participants.forEach( async ({ _id, dueDate, credit }) => {
             const diff = new Date(dueDate) - new Date(currentMonday)
             const creditLeft = (diff / (1000 * 60 * 60 * 24))/7;
             await Participants.update({_id}, {credit: creditLeft})
        })
        participants = await Participants.find({category: 'LottoCategory'})
        res.send(participants);
    })

    //Update Participant
    app.post('/api/update_participant', requireLogin, async (req, res) => {
        const { participantId, update } = req.body
        await Participants.update({_id: participantId}, update)
        const participants = await Participants.find({category: 'LottoCategory'})
        res.send(participants);
    })
}