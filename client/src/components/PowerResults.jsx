import React, { Component } from 'react';
import { connect } from 'react-redux';

class PowerResults extends Component {
    render() {
        const { wins } = this.props
        const totalArray = wins.powerWin.map(({winAmount}, index) => {
            if (winAmount === 'NaN') {
                wins.powerWin[index].winAmount = 0
                return 0
            }
            else{
                wins.powerWin[index].winAmount = parseInt(winAmount, 10)
                return parseInt(winAmount, 10)
            }
        })
        const totalWon = totalArray.reduce((a,b) => a + b, 0)
        return (
            <div className='winsResults'>
                <div className='winsPic'>
                    <img src={`https://res.cloudinary.com/dha7bla4a/image/upload/v${wins.megaPics[3]}/lotto_1.png`} alt="PowerResults"/>
                    <img src={`https://res.cloudinary.com/dha7bla4a/image/upload/v${wins.megaPics[2]}/lotto_3.png`} alt="PowerResults"/>
                    <img src={`https://res.cloudinary.com/dha7bla4a/image/upload/v${wins.megaPics[1]}/lotto_5.png`} alt="PowerResults"/>
                    <img src={`https://res.cloudinary.com/dha7bla4a/image/upload/v${wins.megaPics[0]}/lotto_7.png`} alt="PowerResults"/>
                </div>
                <div className='winsTable'>
                    <div className='winsTotal'>Total Won: ${totalWon}</div>
                    <div className='win'>
                        {
                            wins.powerWin.map(({ winDate, winAmount }, index) => {
                                return <li key={`${winDate}${index}`}>{winDate}: &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;{winAmount}</li>})
                        }
                    </div>
                </div>
                
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    const { wins } = state.result
    return (
        {
            wins
        }
    )
}

export default connect(mapStateToProps)(PowerResults);