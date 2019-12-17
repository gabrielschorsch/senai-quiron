import React, { Component } from 'react';
import Header from '../../components/Header/Header'
import './../general.css'
import edit from "./../../assets/imgs/editpng.png"
import remove from "./../../assets/imgs/remove.png"
import { Spinner } from 'react-activity';
import ReactModal from 'react-modal'
import Axios from 'axios';

// import { Container } from './styles';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '70%',
        backgroundColor: 'rgb(199, 240, 247)'
    }
};

export default class Doutores extends Component {

    constructor() {
        super();
        this.state = {
            listaDoutores: [],
            loading: 0,
            modalOpen: false,
            ufs: [],
            nome: '',
            crm: '',
            uf: '',
            crmUfName: '',
            selectedId: '',
            selectedNome: '',
            selectedCrm: '',
            selectedUf: '',
            // putNome: '',
            // putCrm: '',
            // putUf: '',
        };
    }

    removerDoutor = (id) => {
        Axios.delete('http://localhost:5000/api/doutores/' + id)
            .then(x => {
                if (x.status === 200) {
                    this.recuperarListaDoutores();
                }
            }).catch(x => console.log(x))
    }

    recuperarUfs = () => {
        fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
            .then(x => x.json())
            .then(x => this.setState({ ufs: x }))
    }

    recuperarListaDoutores = async () => {
        this.setState({ loading: 1 })
        await fetch('http://localhost:5000/api/doutores')
            .then(x => x.json())
            .then(x => {
                this.setState({ listaDoutores: x })
                this.setState({ loading: 0 })
            })
    }

    openModal = (id, nome, crm, uf) => {
        this.setState({ selectedId: id })
        this.setState({ selectedNome: nome })
        this.setState({ selectedCrm: crm })
        this.setState({ selectedUf: uf })
        this.setState({ modalOpen: true })
    }

    closeModal = () => {
        this.setState({ modalOpen: false })
    }

    getUfNameById = (id) => {
        console.log(id)
    }

    getNomePost = (event) => {
        this.setState({ nome: event.target.value })
    }

    getCrmPost = (event) => {
        this.setState({ crm: event.target.value })
    }

    getUfPost = (event) => {
        this.setState({ uf: event.target.value })
    }

    putNome = (event) => {
        this.setState({ selectedNome: event.target.value })
    }

    putCrm = (event) => {
        this.setState({ selectedCrm: event.target.value })
    }

    putUf = (event) => {
        this.setState({ selectedUf: event.target.value })
    }

    componentDidMount() {
        this.recuperarListaDoutores();
        this.recuperarUfs();
    }

    cadastrar = (event) => {
        event.preventDefault();
        Axios.post('http://localhost:5000/api/doutores', {
            nome: this.state.nome,
            crm: this.state.crm,
            crmUf: this.state.uf
        })
            .then(x => {
                if (x.status === 200) {
                    this.recuperarListaDoutores();
                }
            })
            .catch(x => console.log(x))
    }

    atualizar = (event) => {
        event.preventDefault();
        Axios.put('http://localhost:5000/api/doutores/' + this.state.selectedId, {
            nome: this.state.selectedNome,
            crm: this.state.selectedCrm,
            crmUf: this.state.selectedUf
        })
            .then(x => {
                if (x.status === 200) {
                    this.closeModal();
                    this.recuperarListaDoutores();
                }
            })
            .catch(x => console.log(x))
    }


    render() {
        return (
            <div className="all">
                <Header />

                <div className="signup">
                    <input onChange={this.getNomePost} className="input nome" placeholder="Nome" />
                    <input onChange={this.getCrmPost} className="input crm" placeholder="CRM" />
                    <select onChange={this.getUfPost} className="input select">
                        <option selected disabled>UNIDADE FEDERATIVA</option>
                        {this.state.ufs.map(x => (
                            <option value={x.sigla}>{x.nome}</option>
                        ))}
                    </select>
                    <button onClick={this.cadastrar} className="btnCadastrar" placeholder="Cadastrar" > Cadastrar</button>
                </div>

                <div className="center">
                    {(this.state.loading)
                        ?
                        (<Spinner color="black" />)
                        : (
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th className="tableHeader tableCell">Id</th>
                                        <th className="tableHeader tableCell">Nome</th>
                                        <th className="tableHeader tableCell">Crm</th>
                                        <th className="tableHeader tableCell">UF</th>
                                        <th className="tableHeader tableCell">Editar</th>
                                        <th className="tableHeader tableCell">Remover</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.listaDoutores.map(x => (
                                        <tr>
                                            <td className="tableItem tableCell">{x.idDoutor}</td>
                                            <td className="tableItem tableCell">{x.nome}</td>
                                            <td className="tableItem tableCell">{x.crm}</td>
                                            <td className="tableItem tableCell">{x.crmUf}</td>
                                            <td className="tableItem tableCell"><button className="imgBtn" onClick={() => this.openModal(x.idDoutor, x.nome, x.crm, x.crmUf, this.state.crmUfName)}><img src={edit} className="edit"></img></button></td>
                                            <td className="tableItem tableCell"><button onClick={() => this.removerDoutor(x.idDoutor)} className="imgBtn"><img src={remove} className="edit"></img></button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )
                    }

                </div>

                <ReactModal isOpen={this.state.modalOpen} style={customStyles}>
                    <button onClick={this.closeModal} className="imgBtn"><img src={remove} className="edit"></img></button>
                    <input onChange={this.putNome} value={this.state.selectedNome} className="input nome" />
                    <input onChange={this.putCrm} value={this.state.selectedCrm} className="input crm" />
                    <select className="input select" onChange={() => this.putUf} >
                        <option disabled selected value={this.state.selectedUf}>{this.state.selectedUf}</option>
                        {this.state.ufs.map(x => (
                            <option value={x.sigla}>{x.nome}</option>
                        )
                        )}
                    </select>
                    <button onClick={this.atualizar} className="btnCadastrar" placeholder="Atualizar" > Atualizar</button>

                </ReactModal>
            </div >
        );
    }
}

