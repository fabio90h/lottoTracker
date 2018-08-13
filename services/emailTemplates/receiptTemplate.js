const keys = require('../../config/keys');

module.exports = (content) => {
    return (
        `
        <html>
            <body>
                <div>
                    <h2>Payment Receipt</h2>
                    <p>Hello ${content.name}, </p>
                    <br/>
                    <p>This is a confirmation email to say that we have received a payment for the lotto on ${content.paidDate}</p>
                    <br/>
                    <p>
                        Our records show that you have paid: <strong>$${content.paidAmount}</strong><br/>
                        You have a total of <strong>${content.newCredit} credit(s)</strong> which makes you good until <strong>${content.newDueDate}</strong><br/>
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