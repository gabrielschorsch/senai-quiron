import React, { Component } from 'react';
import './Header.css'
import logo from './../../assets/imgs/logo.png'
import { Link } from 'react-router-dom'

// import { Container } from './styles';

export default class components extends Component {



    render() {
        return (
            <header>
                <nav className="nav">
                    <img src={logo} className="logo" />
                    <ul className="list">
                        <li className="listItem"><Link to="/">Pacientes</Link></li>
                        <li className="listItem"><Link to="/doutores">Doutores</Link></li>
                    </ul>
                </nav>
            </header>
        );
    }
}
