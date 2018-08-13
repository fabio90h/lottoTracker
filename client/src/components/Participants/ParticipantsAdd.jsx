import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Icon, Modal, Button } from 'react-materialize';

class ParticipantsAdd extends Component {
    render() {
        return (
            <Modal
                header='Add New Participant'
                trigger={<a><Icon>add_circle</Icon></a>}
                actions={
                    <div>
                        <Button style={{ marginLeft: "10px" }} modal='close'>Close</Button>
                        <Button type='submit' form='formParticipant' modal='close'>Submit</Button>
                    </div>
                    
                }
            >
                <form id='formParticipant' onSubmit={this.props.handleSubmit}>
                        <label htmlFor="name">Name: </label>
                        <Field type='text' name='name' component='input'/>
                        <label htmlFor="name">Email: </label>
                        <Field type='text' name='email' component='input'/>
                </form>
            </Modal>
        );
    }
}

export default reduxForm({
    form: 'participantsForm'
})(ParticipantsAdd);