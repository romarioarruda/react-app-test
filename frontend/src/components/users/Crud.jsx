import './Crud.css'
import React, { Component } from 'react'
import axios from 'axios'
import Main from '../template/Main'


const headerPorps = {
  icon: 'users',
  title: 'Usuários',
  subtitle: 'Cadastro de usuários'
}

const baseUrl = 'http://romario.io:3001/users'

const initialState = {
  user: { name: '', email: '' },
  list: []
}

export default class UserCrud extends Component {
  state = {...initialState}

  clear() {
    this.setState({ user: initialState.user })
    document.getElementById('name').style.display = 'none'
    document.getElementById('email').style.display = 'none'
  }

  componentWillMount() {
    axios.get(baseUrl)
      .then(resp => {
        this.setState({ list: resp.data })
      })
  }

  edit(user) {
    this.setState({ user })
  }

  save() {
    const user = this.state.user

    if(!user.name) return document.getElementById('name').style.display = 'block'
    if(!user.email) return document.getElementById('email').style.display = 'block'

    document.getElementById('name').style.display = 'none'
    document.getElementById('email').style.display = 'none'

    const method = user.id ? 'put' : 'post'
    const url = user.id ? `${baseUrl}/${user.id}` : baseUrl

    axios[method](url, user)
      .then(resp => {
        this.setState({ user: initialState.user })
        this.componentWillMount()
      })
  }

  delete(userId) {
    const url = `${baseUrl}/${userId}`
    axios.delete(url)
      .then(resp => this.componentWillMount())
  }

  updateField(event) {
    const user = { ...this.state.user }
    user[event.target.name] = event.target.value

    this.setState({ user })
  }

  renderForm() {
    return (
      <div className="form">
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Nome</label>
              <input type="text" className="form-control" name="name"
                value={this.state.user.name} onChange={e => this.updateField(e)}
                placeholder="Digite um nome..." required/>
              <div class="invalid-feedback" id="name">
                Informe um nome.
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Email</label>
              <input type="email" className="form-control" name="email"
                value={this.state.user.email} onChange={e => this.updateField(e)}
                placeholder="Digite um email..." required/>
              <div class="invalid-feedback" id="email">
                Informe um e-mail.
              </div>
            </div>
          </div>
        </div>

        <hr />

        <div className="row">
          <div className="col-12 d-flex justify-content-end">
            <button className="btn btn-primary" onClick={e => this.save(e)}>Salvar</button>
            <button className="btn btn-secondary ml-2" onClick={e => this.clear(e)}>Cancelar</button>
          </div>
        </div>
      </div>
    )
  }

  renderTable() {
    return (
      <table className="table table-bordered table-stripped mt-5">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {this.renderTbody()}
        </tbody>
      </table>
    )
  }

  renderTbody() {
    return this.state.list.map(user => {
      return (
        <tr key={user.id}>
          <td>{user.id}</td>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>
            <button className="btn btn-primary" onClick={e => this.edit(user)}><i className="fa fa-pencil"></i></button>
            <button className="btn btn-danger ml-2" onClick={e => this.delete(user.id)}><i className="fa fa-trash"></i></button>
          </td>
        </tr>
      )
    })
  }

  render() {
    return (
      <Main {...headerPorps}>
        <hr />
        {this.renderForm()}
        <hr />
        {this.renderTable()}
      </Main>
    )
  }
}