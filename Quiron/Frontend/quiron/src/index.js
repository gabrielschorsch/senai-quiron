import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Doutores from './pages/Doutores/Doutores'
import Pacientes from './pages/Pacientes/Pacientes'
import * as serviceWorker from './serviceWorker';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';


const routing = (
    <Router>
        <div>
            <Switch>
                <Route exact path="/" component={Pacientes} />
                <Route path="/doutores" component={Doutores} />
            </Switch>
        </div>
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
