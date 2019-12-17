import React, { Component } from 'react';
import Header from '../../components/Header/Header'
import './../general.css'
import edit from "./../../assets/imgs/editpng.png"
import remove from "./../../assets/imgs/remove.png"
import ReactModal from 'react-modal'
import Axios from 'axios';
import loading from './../../assets/imgs/loading.gif'

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
      listaPacientes: [],
      listaDoutores: [],
      loading: 0,
      modalOpen: false,
      postNome: '',
      postCpf: '',
      postIdDoutor: '',
      postDataNascimento: '',
      putNome: '',
      putCpf: '',
      putIdDoutor: '',
      putNomeDoutor: '',
      putDataNascimento: '',
      selectedId: ''
    };
  }

  componentDidMount() {
    this.recuperarListaPacientes();
    this.recuperarListaDoutores();
  }

  removerPaciente = (id) => {
    Axios.delete('http://localhost:5000/api/pacientes/' + id)
      .then(x => {
        if (x.status === 200) {
          this.recuperarListaPacientes();
        }
      }).catch(x => console.log(x))
  }


  recuperarListaPacientes = async () => {
    this.setState({ loading: 1 })
    await fetch('http://localhost:5000/api/pacientes')
      .then(x => x.json())
      .then(x => {
        this.setState({ listaPacientes: x })
        this.setState({ loading: 0 })
      })
  }

  openModal = (id, nome, cpf, dataNascimento, idDoutor, nomeDoutor) => {
    this.setState({ selectedId: id })
    this.setState({ modalOpen: true })
    this.setState({ putNome: nome });
    this.setState({ putCpf: cpf });
    this.setState({ putDataNascimento: dataNascimento });
    this.setState({ putIdDoutor: idDoutor });
    this.setState({ putNomeDoutor: nomeDoutor });
  }

  closeModal = () => {
    this.setState({ modalOpen: false })
  }



  cadastrar = (event) => {
    event.preventDefault();
    Axios.post('http://localhost:5000/api/pacientes', {
      nome: this.state.postNome,
      dataNascimento: this.state.postDataNascimento,
      cpf: this.state.postCpf,
      idDoutor: this.state.postIdDoutor,
    })
      .then(x => {
        if (x.status === 200) {
          this.recuperarListaPacientes();
        }
      })
      .catch(x => console.log(x))
  }

  recuperarListaDoutores = async () => {
    this.setState({ loading: 1 })
    await fetch('http://localhost:5000/api/doutores')
      .then(x => x.json())
      .then(x => {
        this.setState({ listaDoutores: x })
      })
  }

  getNomePost = (event) => {
    this.setState({ postNome: event.target.value })
  }

  getCpfPost = (event) => {
    this.setState({ postCpf: event.target.value })
  }
  getIdDoutorPost = (event) => {
    this.setState({ postIdDoutor: event.target.value })
  }

  getDataNascimento = (event) => {
    this.setState({ postDataNascimento: event.target.value + 'T00:00:0000' })
  }

  getNomePut = (event) => {
    this.setState({ putNome: event.target.value })
  }

  getCpfPut = (event) => {
    this.setState({ putCpf: event.target.value })
  }
  getIdDoutorPut = (event) => {
    this.setState({ putIdDoutor: event.target.value })
  }

  getDataNascimentoPut = (event) => {
    console.log(event.target.value)
    this.setState({ putDataNascimento: event.target.value})
  }

  atualizar = (event) => {
    event.preventDefault();
    console.log(this.state)
    Axios.put('http://localhost:5000/api/pacientes/' + this.state.selectedId, {
      nome: this.state.putNome,
      dataNascimento: this.state.putDataNascimento,
      cpf: this.state.putCpf,
      idDoutor: this.state.putIdDoutor,
    })
      .then(x => {
        if (x.status === 200) {
          this.closeModal();
          this.recuperarListaPacientes();
        }
      })
      .catch(x => console.log(x))
  }

  tratarData = (data) => {
    let newData = data.split('T')[0]
    let a = newData.split('-')
    return a[2] + '/' + a[1] + '/' + a[0]
  }

  tratarDataInput = (data) => {
    return data.split('T')[0]
  }


  render() {
    return (
      <div className="all">
        <Header />

        <div className="signup">
          <input onChange={this.getNomePost} className="input nome" placeholder="Nome" />
          <input onChange={this.getCpfPost} className="input cpf" placeholder="CPF" />
          <input onChange={this.getDataNascimento} type="date" className="input cpf" placeholder="CPF" />
          <select onChange={this.getIdDoutorPost} className="input select">
            <option selected disabled>Doutor vinculado</option>
            {this.state.listaDoutores.map(x => (
              <option value={x.idDoutor}>{x.nome}</option>
            ))}
          </select>
          <button onClick={this.cadastrar} className="btnCadastrar" placeholder="Cadastrar" > Cadastrar</button>
        </div>

        <div className="center">
          {(this.state.loading)
            ?
            (<img src={loading} />)
            : (
              <table className="table">
                <thead>
                  <tr>
                    <th className="tableHeader tableCell">Id</th>
                    <th className="tableHeader tableCell">Nome</th>
                    <th className="tableHeader tableCell">CPF</th>
                    <th className="tableHeader tableCell">Data de Nascimento</th>
                    <th className="tableHeader tableCell">Doutor Vinculado</th>
                    <th className="tableHeader tableCell">Editar</th>
                    <th className="tableHeader tableCell">Remover</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.listaPacientes.map(x => (
                    <tr>
                      <td className="tableItem tableCell">{x.idPaciente}</td>
                      <td className="tableItem tableCell">{x.nome}</td>
                      <td className="tableItem tableCell">{x.cpf}</td>
                      <td className="tableItem tableCell">{this.tratarData(x.dataNascimento)}</td>
                      <td className="tableItem tableCell">{x.idDoutorNavigation.nome}</td>
                      <td className="tableItem tableCell">
                        <button className="imgBtn" onClick={() => this.openModal(x.idPaciente, x.nome, x.cpf, x.dataNascimento, x.idDoutor, x.idDoutorNavigation.nome)}>
                          <img src={edit} className="edit"></img>
                        </button>
                      </td>
                      <td className="tableItem tableCell">
                        <button onClick={() => this.removerPaciente(x.idPaciente)} className="imgBtn">
                          <img src={remove} className="edit"></img>
                        </button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )
          }

        </div>

        <ReactModal isOpen={this.state.modalOpen} style={customStyles}>
          <input onChange={this.getNomePut} value={this.state.putNome} className="input nome" placeholder="Nome" />
          <input onChange={this.getCpfPut} value={this.state.putCpf} className="input cpf" placeholder="CPF" />
          <input onChange={this.getDataNascimentoPut} value={this.tratarDataInput(this.state.putDataNascimento)} type="date" className="input cpf" placeholder="CPF" />
          <select onChange={this.getIdDoutorPut} className="input select">
            <option value={this.state.putIdDoutor}>{this.state.putNomeDoutor}</option>
            {this.state.listaDoutores.map(x => (
              <option value={x.idDoutor}>{x.nome}</option>
            ))}
          </select>
          <button onClick={this.closeModal} className="imgBtn"><img src={remove} className="edit"></img></button>
          <button onClick={this.atualizar} className="btnCadastrar" placeholder="Cadastrar" > Atualizar</button>
        </ReactModal>
      </div >
    );
  }
}

