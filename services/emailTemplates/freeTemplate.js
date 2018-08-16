
const keys = require('../../config/keys');

module.exports = (content) => {
    const typeLotto = content.isMega === 'mega' ? 'Mega Millions' : 'Powerball';
    return (
        `
        <html>
            <body>
                <div>
                    <h2>${typeLotto} Free Credit(s)</h2>
                    <p>Hello all, </p>
                    <p>We won a total of $${content.paidAmount}!</p>
                    <p>
                        This means we have added ${content.paidAmount/(content.recipients.length*2)} credit(s) to everybody's ${typeLotto} account.
                        <a href=${keys.url}>Check out your current status here</a>
                    </p>
                    <p>Thank you!</p>
                </div>
            </body>
        </html>
        `
    );
}