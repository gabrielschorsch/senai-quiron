import React, { Component } from 'react';
import './Header.css'
import logo from './../../assets/imgs/logo.png'

// import { Container } from './styles';

export default class components extends Component {



    render() {
        return (
            <header>
                <nav className="nav">
                    <img src={logo} className="logo"/>
                    <ul className="list">
                        <li className="listItem">Doutores</li>
                        <li className="listItem">Pacientes</li>
                    </ul>
                </nav>
            </header>
        );
    }
}
