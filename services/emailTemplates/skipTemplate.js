const keys = require('../../config/keys');

module.exports = (content) => {
    return (
        `
        <html>
            <body>
                <div>
                    <h2>Skip week</h2>
                    <p>Hello all, </p>
                    <br/>
                    <p>Just a quick update:</p>
                    <br/>
                    <p>
                        We will be skipping week ${content.paidDate}<br/>
                        Credits wont be taken off your account
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