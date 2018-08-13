import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

import ParticipantsListMega from './Participants/ParticipantsListMega';
import ParticipantsInfo from './Participants/ParticipantsInfo';
import ParticipantsAdd from './Participants/ParticipantsAdd';
import ParticipantFree from './Participants/ParticipantFree';

class MegaMillion extends Component {
    
    //Reset a participant selection
    componentDidMount() {
        this.props.updateParticipantProps({label: 'participantId', value: null})
        this.props.updateParticipantProps({label: 'page', value: 'mega'})
    }

    render() {
        const { updateParticipantProps, addParticipants, participantsFormValue, addFree, freeFormValue, currentMonday, user } = this.props;
        const isMega = 'mega';

        return(
            <div>
                <div className='lottoTitle'>
                    <h1 onClick={() => updateParticipantProps({label: 'participantId', value: null})}>Mega Millions</h1>
                    <p>Current week: {currentMonday}</p>
               </div>
                {user ? 
                    <div className='addOrFreeButtons'>
                        <ParticipantsAdd 
                            onSubmit={() => addParticipants({...participantsFormValue.values, isMega, currentMonday})}
                        />
                        <ParticipantFree
                            onSubmit={() => addFree({...freeFormValue.values, isMega, currentMonday})}
                        />
                    </div>
                : null}
                <div className='main-section'>
                    <ParticipantsListMega/>
                    <ParticipantsInfo/>
                </div> 
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const { user } =  state.auth;
    const { currentMonday } = state.participants;
    return (
        {
            user,
            participantsFormValue: state.form.participantsForm,
            freeFormValue: state.form.freeForm,
            currentMonday,
        }
    );
}

export default connect(mapStateToProps, actions)(MegaMillion);