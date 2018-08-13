import React from 'react';
import { Link } from 'react-router-dom'
import MegaMillions from './img/mega.png'
import Powerball from './img/power.png'

const Landing = () => {
    return (
        <div className='landingPage'>
            <h1>Welcome</h1>
            <div id='rules'>
                    <h3>Description</h3>
                    <hr/>
                    <p>
                        The purpose of this website is to keep track of how much credit each participants have before they need to pay more. This website also keeps
                        the participants up to date on how much was won every week.It is automatically updated every Monday and Sunday to see how much was won.
                    </p>
                    <p>
                        Your name will appear in RED if you owe for that week, yellow if you owe the next week, and green if you have enough credits.
                        You will be receiving emails from the admin to remind you of your current status and also when you make a payment.
                    </p>
                    <p>
                        Click on your name to see your payment history. Click on the title to view the winning history.
                    </p>
                    <strong>Please remember to pay in advance!</strong>
                    <p>Thank you!</p>
                </div>
            <div id='landingContents'>
                <div className="row">
                    {/* ************** MEGAMILLIONS ************** */}
                    <div className="col s12 m6">
                        <div className="card">
                            <div className='card-body'>
                                <div className="card-image">
                                    <img src={MegaMillions} style={{  height: '100px', padding: '10px'}} alt='MegaMillions'/>
                                </div>
                                <div className="card-content">
                                <p>
                                        We play the Mega Millions every Tuesday and Friday. Each draw cost $2.
                                        We buy 20 draws every week. <br/><br/>
                                        If won, the current participants will split the prize evenly. <br/> <br/>
                                        <strong>Remember</strong>: the odds of winning the Mega Millions is 1 out of 303 million. <br/>
                                    </p>
                                </div>
                            </div>
                            <div className="card-action">
                                <Link to="/mega_million">View Mega Millions</Link>
                            </div>
                        </div>
                    </div>
                    {/* ************** POWERBALL ************** */}
                    <div className="col s12 m6">
                        <div className="card">
                            <div className='card-body'>
                                <div className="card-image">
                                    <img src={Powerball} style={{ height: '100px', padding: '10px'}} alt='Powerball'/>
                                </div>
                                <div className="card-content">
                                    <p>
                                        We play the Powerball every Wednesday and Saturday. Each draw cost $2.
                                        We buy 20 draws every week. <br/><br/>
                                        If won, the current participants will split the prize evenly. <br/> <br/>
                                        <strong>Remember</strong>: the odds of winning the Powerball is 1 out of 292 million. <br/>
                                    </p>
                                </div>
                            </div>
                            <div className="card-action">
                                <Link to="/powerball">View Powerball</Link>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="row">
                    
                </div> */}
                    
                    
            </div>
        </div>
    );
}

export default Landing;