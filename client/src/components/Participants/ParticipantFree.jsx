import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Modal, Button, Icon } from 'react-materialize';


class ParticipantFree extends Component{
    render() {
        return (
            <Modal
                header='Free or Skip'
                trigger={<a><Icon>insert_emoticon</Icon></a>}
                actions={
                    <div>
                        <Button style={{ marginLeft: "10px" }} modal='close'>Close</Button>
                        <Button type='submit' form='formFree' modal='close'>Pay</Button>
                    </div>
                    
                }
            >
                <form id='formFree' onSubmit={this.props.handleSubmit}>
                    <label htmlFor="freeAmount">Amount: </label>
                    <Field type='text' name='freeAmount' component='input' />
                    <label htmlFor="dateFree">Date</label>
                    <Field type='text' name='dateFree' component='input'/>
                    <label htmlFor="freeOrSkip">Free or Skip? </label>
                    <Field type='text' name='freeOrSkip' component='input'/>
                </form>
            </Modal>
        );
    }
}

export default reduxForm({form: 'freeForm'})(ParticipantFree);