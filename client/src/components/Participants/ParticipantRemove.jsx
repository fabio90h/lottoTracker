import React, { Component }  from 'react';
import { Modal, Icon, Button } from 'react-materialize';
import { connect } from 'react-redux';
import { updateParticipant, updateParticipantProps} from '../../actions';

class ParticipantRemove extends Component {
    render() {
        const { updateParticipant, updateParticipantProps, participantId } = this.props
        return (
            <Modal
                header='Are you sure?'
                trigger={<a><Icon>remove_circle</Icon></a>}
                actions={
                    <div>
                        <Button style={{ marginLeft: "10px" }} modal='close'>No</Button>
                        <Button
                            onClick={() => { updateParticipant({ participantId, update: {hide: true} }) ; updateParticipantProps({label: 'participantId', value: null});}}
                            modal='close'>Yes</Button>
                    </div>
                    
                }
            >
                <p>Are you sure you want to remove </p>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => {
    const { participantId } = state.participants;
    return(
        {
            participantId
        }
    ); 
}


export default connect(mapStateToProps, { updateParticipant, updateParticipantProps })(ParticipantRemove);