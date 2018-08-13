import * as actionTypes from '../actions/types';

const STATE = {
    wins: 
        {
            megaWin: [
                {
                    winDate: null,
                    winAmount: null
                }
            ],
            megaPics: [0,0,0,0],
            powerWin: [
                {
                    winDate: null,
                    winAmount: null
                }
            ],
            powerPics: [0,0,0,0]
        },
    total: 0,
    
}

export default (state = STATE, action) => {
    switch(action.type) {
        case actionTypes.FETCH_WINS:
            return (
                {
                    ...state,
                    wins: action.payload
                }
            )
        case actionTypes.UPDATE_WINS_PROPS:
            return (
                {
                    ...state,
                    [action.payload.label]: action.payload.value,
                }
            ) 
        default: 
            return state;
    }
}