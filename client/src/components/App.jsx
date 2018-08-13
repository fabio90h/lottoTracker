import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';

import MegaMillion from './MegaMillion';
import Powerball from './Powerball';
import Landing from './Landing';

class App extends Component {

    componentDidMount() {
        const { fetchUser, fetchWins, updateParticipantProps, fetchParticipants } = this.props
        fetchUser(); //Get the current user admin (if any)
        //Gets the current monday week
        updateParticipantProps({label: 'currentMonday', value: this.getMonday(new Date()).toLocaleDateString()})
        fetchWins() //Gets all the wins
        fetchParticipants()
    }

    //Finds out what Monday of the month it is
     getMonday = (d) => {
        d = new Date(d);
        let day = d.getDay();
        let diff = d.getDate() - day + (day === 0 ? -6 : 1);
        return new Date(d.setDate(diff));
    };

    render() {
        return(
            <div>
                <BrowserRouter>
                    <div>
                        <Header/>
                        <Route exact path='/' component={Landing}/>
                        <Route exact path="/mega_million" component={MegaMillion}/>
                        <Route path="/powerball" component={Powerball} />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default connect(null, actions)(App);