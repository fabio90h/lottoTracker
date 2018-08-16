const keys = require('../../config/keys');

module.exports = (content) => {
    const typeLotto = content.page === 'mega' ? 'Mega Millions' : 'Powerball'
    return (
        `
        <html>
            <body>
                <div>
                    <h2>${typeLotto} Payment Receipt</h2>
                    <p>Hello ${content.name}, </p>
                    <p>This is a confirmation email to say that we have received a payment for the ${typeLotto} lotto on ${content.paidDate}</p>
                    <p>
                        Our records show that you have paid: <strong>$${content.paidAmount}</strong><br/>
                        You have a total of <strong>${content.newCredit} credit(s)</strong> which makes you good until <strong>${content.newDueDate}</strong><br/>
                        <a href=${keys.url}>Check out your current status here</a>
                    </p>
                    <p>Thank you!</p>
                </div>
            </body>
        </html>
        `
    );
}