import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Modal, Icon, Button } from 'react-materialize';

class ParticipantPaidAdd extends Component {
    render() {
        return (
            <Modal
                header='Add New Payment'
                trigger={<a><Icon>add_circle</Icon></a>}
                actions={
                    <div>
                        <Button style={{ marginLeft: "10px" }} modal='close'>Close</Button>
                        <Button type='submit' form='formPayment' modal='close'>Pay</Button>
                    </div>
                    
                }
            >
                <form id='formPayment' onSubmit={this.props.handleSubmit}>
                    <label htmlFor="paidAmount">Amount: </label>
                    <Field type='text' name='paidAmount' component='input' />
                    <label htmlFor="paidDate">Date </label>
                    <Field type='text' name='paidDate' component='input'/>
                </form>
            </Modal>
        );
    }
}
export default reduxForm({ form: 'paidForm' })(ParticipantPaidAdd);