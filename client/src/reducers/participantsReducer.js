import * as actionTypes from '../actions/types';

const STATE = {
    participantsAll: [],
    participantId: null,
    currentMonday: null,
    page: null,
}

export default (state=STATE, action) => {
    switch(action.type) {
        case actionTypes.FETCH_PARTICIPANTS:
            return(
                {
                    ...state,
                    participantsAll: action.payload
                }
            );
        case actionTypes.UPDATE_PARTICIPANT_PROPS:
            return(
                {
                    ...state,
                    [action.payload.label]: action.payload.value,
                }
            );
        default: 
            return state;
    }
}

