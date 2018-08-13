
const keys = require('../../config/keys');

module.exports = (content) => {
    return (
        `
        <html>
            <body>
                <div>
                    <h2>Free weeks</h2>
                    <p>Hello all, </p>
                    <br/>
                    <p>We won a total of $${content.paidAmount}!</p>
                    <br/>
                    <p>
                        This means we have added ${content.paidAmount/(content.recipients.length*2)} credit(s) to everybody's account.
                        <a href=${keys.url}>Check out your current status here</a>
                    </p>
                    <br/>
                    <p>Thank you!</p>
                </div>
            </body>
        </html>
        `
    );
}