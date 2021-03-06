const keys = require('../../config/keys');

module.exports = (content) => {
    return (
        `
        <html>
            <body>
                <div>
                    <h2>Lotto due next week</h2>
                    <p>
                        Hello all, <br/><br/>
                        This is a friendly reminder that you will be due next week for the lotto.<br/>
                        Please consider paying this week.
                        <a href=${keys.url}>You can check out your current status here</a>
                    </p>
                    <p>Thank you!</p>
                </div>
            </body>
        </html>
        `
    );
}