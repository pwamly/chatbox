import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import ForgotPassword from './Forms/ForgotPassword/ForgotPasswordForm';
import Login from './Forms/Login';
import './home.css';
import Navbar from './Forms/Navibar/index';

const login = true;

function index() {
    return (
        <>
            {' '}
            <div>
                <Router>
                    <Container className="main-home">
                        <Switch>
                            <Route exact path="/login">
                                <Login />
                            </Route>
                            <Route exact path="/reset-password">
                                <ForgotPassword />
                            </Route>
                        </Switch>{' '}
                    </Container>{' '}
                </Router>{' '}
            </div>{' '}
        </>
    );
}

export default index;
