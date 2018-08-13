import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

import ParticipantsListPower from './Participants/ParticipantsListPower';
import ParticipantsInfo from './Participants/ParticipantsInfo';
import ParticipantsAdd from './Participants/ParticipantsAdd';
import ParticipantFree from './Participants/ParticipantFree';

class Powerball extends Component {
    //Reset a participant selection
    componentDidMount() {
        this.props.updateParticipantProps({label: 'participantId', value: null})
        this.props.updateParticipantProps({label: 'page', value: 'power'})
    }

    render() {
        const { updateParticipantProps, addParticipants, participantsFormValue, addFree, freeFormValue, currentMonday, user } = this.props;
        const isMega = 'powerball';

        return(
            <div>
                <div className='lottoTitle'>
                    <h1 onClick={() => updateParticipantProps({label: 'participantId', value: null})}>Powerball</h1>
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
                    <ParticipantsListPower/>
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

export default connect(mapStateToProps, actions)(Powerball);