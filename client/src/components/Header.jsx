import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Icon, Dropdown } from 'react-materialize';
import * as actions from '../actions';


class Header extends Component {
    renderContent() {
        switch (this.props.user) {
            case null:
                return <li>Loading<i className="material-icons left medium">verified_users</i></li>
            case false:
                return <li><a href="/auth/google">Admin<i className="material-icons left medium">account_circle</i></a></li>
            default:
                return <li><a href="/api/logout">Log out<i className="material-icons left medium">check_circle</i></a></li>
        }
    }
       
    render() {
        return (
            <nav>
                <div className="nav-wrapper">
                    <Link 
                        to='/'
                        onClick={() => this.props.updateParticipantProps({label: 'participantId', value: null})}
                        className="brand-logo"
                        style={{ marginLeft:'20px' }}
                    >
                        <Icon large left>home</Icon> Lotto Club
                    </Link>
                    <ul className="right hide-on-med-and-down">
                        {this.renderContent()}
                        <li><Link to='/mega_million'>Mega Millions</Link></li>
                        <li style={{marginRight: '20px'}}><Link to="/powerball">Powerball</Link></li>
                    </ul>
                    <Dropdown trigger={
                        <a style={{marginRight: '20px'}} className='right hide-on-large-only'><Icon large>menu</Icon></a>
                    }>
                        <Link style={{color: 'black'}} to='/mega_million'>Mega</Link>
                        <Link style={{color: 'black'}} to="/powerball">Power</Link>
                    </Dropdown>
                </div>
            </nav>
        );
    }
}

const mapStateToProps = (state) => {
    const { user } = state.auth
    return(
        {
            user
        }
    );
}

export default connect(mapStateToProps, actions)(Header);