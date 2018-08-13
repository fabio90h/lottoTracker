import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

 class ParticipantsListMega extends Component {

     renderParticipants() {
        const { participantId } = this.props
        return this.props.participantsAll
            .filter(({ powerball, hide }) => powerball && !hide)
            .sort(function(a, b) {
                var textA = a.name.toUpperCase();
                var textB = b.name.toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            })
            .map(({name, email, _id, credit, dueDate}) => {
                return(
                    <div 
                        className={ participantId === _id ?
                         'selected card-panel hoverable waves-effect waves-light' : credit < 1 ? 
                         'redOn hoverable waves-effect waves-light' : credit === 1 ? 
                         'warning hoverable waves-effect waves-light' : 
                         'greenOn hoverable waves-effect waves-light'} 
                        key={name}
                        onClick={() => this.props.updateParticipantProps({label: 'participantId', value: _id})}>
                        <a>{name}</a>
                        <div>Credit: {credit}</div>
                        <div>Due Date: {dueDate}</div>
                    </div>  
                );
            })
     }
     
     render() {
         return(
             <div className='participantsList'>
                {this.renderParticipants()}
            </div>
         );
     }
 }

 const mapStateToProps = (state) => {
     const { participantsAll, currentMonday, participantId } = state.participants;
     return (
         {
            participantsAll,
            currentMonday,
            participantId
         }
     );
 };

 export default connect(mapStateToProps, actions)(ParticipantsListMega)