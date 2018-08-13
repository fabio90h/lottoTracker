import * as actionTypes from '../actions/types';

const STATE = {
    user: {}
}

export default (state=STATE, action) => {
    switch(action.type) {
        case actionTypes.FETCH_USER:
            return(
                {
                    ...state,
                    user: action.payload || false
                }
            )
        default:
            return state
    }
}