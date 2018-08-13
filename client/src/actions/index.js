import axios from 'axios';
import * as actionTypes from './types';

//=======================
// USERS ================
//=======================
export const fetchUser = () => async (dispatch) => {
    const res = await axios.get('/api/current_user');
    dispatch(
        {
            type: actionTypes.FETCH_USER,
            payload: res.data
        }
    )
}

//=======================
// WINS =================
//=======================
export const fetchWins = () => async (dispatch) => {
    const res = await axios.get('/api/fetch_wins');
    dispatch(
        {
            type: actionTypes.FETCH_WINS,
            payload: res.data
        }
    )
}

export const updateWins = (values) => async dispatch => {
    const res = await axios.post('/api/update_wins', values)
    dispatch(
        {
            type: actionTypes.FETCH_WINS,
            payload: res.data
        }
    )
}

//store current paticipant id
export const updateWinsProps = ({ label, value }) => {
    return (
        {
            type: actionTypes.UPDATE_WINS_PROPS,
            payload: { label, value }
        }
    )
}

//=======================
// PARTICIPANTS =========
//=======================

//add participant to collection
export const addParticipants = (values) => async dispatch => {
    const res = await axios.post('/api/add_participants', values);
    dispatch(
        {
            type: actionTypes.FETCH_PARTICIPANTS,
            payload: res.data
        }
    )
};

//add a payment made (individual)
export const addPaid = (values) => async dispatch => {
    const res = await axios.post('/api/paid_amount', values);
    dispatch(
        {
            type: actionTypes.FETCH_PARTICIPANTS,
            payload: res.data
        }
    )
}

//add a FREE or SKIP (group)
export const addFree = (values) => async dispatch => {
    const res = await axios.post('/api/free_amount', values);
    dispatch(
        {
            type: actionTypes.FETCH_PARTICIPANTS,
            payload: res.data.participants
        }
    )
    dispatch(
        {
            type: actionTypes.FETCH_WINS,
            payload: res.data.wins
        }
    )
}

//hide participant
export const updateParticipant = (values) => async dispatch => {
    const res = await axios.post('/api/update_participant', values)
    dispatch(
        {
            type: actionTypes.FETCH_PARTICIPANTS,
            payload: res.data
        }
    )
}

//updating credit
export const updateCredit = () => async dispatch => {
    const res = await axios.post('/api/update_credit');
    dispatch(
        {
            type: actionTypes.FETCH_PARTICIPANTS,
            payload: res.data
        }
    )
}

//grab all the Participants
export const fetchParticipants = () => async dispatch => {
    const res = await axios.get('/api/fetch_participants');
    dispatch(
        {
            type: actionTypes.FETCH_PARTICIPANTS,
            payload: res.data
        }
    )
}

//store current paticipant id
export const updateParticipantProps = ({ label, value }) => {
    return (
        {
            type: actionTypes.UPDATE_PARTICIPANT_PROPS,
            payload: { label, value }
        }
    )
}