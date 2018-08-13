import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import participantsReducers from './participantsReducer';
import winReducer from './winReducer';

export default combineReducers(
    {
        auth: authReducer,
        participants: participantsReducers,
        form: reduxForm,
        result: winReducer
    }
)