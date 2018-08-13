import React, { Component } from 'react'; 
import { connect } from 'react-redux';
import ParticipantPaidAdd from './ParticipantPaidAdd';
import ParticipantRemove from './ParticipantRemove';
import MegaResults from '../../components/MegaResults';
import PowerResults from '../../components/PowerResults';
import * as actions from '../../actions';


class ParticipantsInfo extends Component {
    //Will filter out the participant that was clicked on
    renderOne = () => {
        return this.props.participantsAll.filter((participant) => participant._id === this.props.participantId)
    }

    //Participant Information
    renderInfo = () => {
        const { participantId, addPaid, participantsPaidValue, currentMonday, page } = this.props;
        const info = (this.renderOne())[0] //getting the participant information
        let paymentHistory = null
        
        if (info) {
            //Go through Payment History
            paymentHistory = info.payments.reverse().map(({paidDate, paidAmount, _id}) => {
                return (
                    <div className='indivPayment' key={_id}>{paidDate}: ${parseInt(paidAmount, 10)}</div>
                )
            })
        }
        
        if (participantId) {
            return (
                <div>
                    {this.props.user ? 
                        <div id='participantsInfoButton'>
                            <ParticipantRemove />
                            <ParticipantPaidAdd onSubmit={() => addPaid({...participantsPaidValue.values, ...info, currentMonday})}/> 
                        </div>
                    : null}
                    <div id='paymentHistory'>
                        <h5>Payment History</h5>
                        {paymentHistory}
                    </div>
                </div>
            );
        }
        if (page === 'mega'){
            return <MegaResults/>
        }
        return <PowerResults/>
    }

    render() {
        return (
            <div id='participantsInfo'>
                {this.renderInfo()}
            </div>
           
        );
    }
}

const mapStateToProps = (state) => {
    const { user } = state.auth
    const { participantsAll, participantId, currentMonday, page } = state.participants;

    return (
        {
            participantsAll,
            participantId,
            participantsPaidValue: state.form.paidForm,
            user,
            currentMonday,
            page,
        }
    );
}

export default connect(mapStateToProps, actions)(ParticipantsInfo);