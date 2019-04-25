import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import api from "../services/api";
import { login } from "../services/auth";

import { Form, Container } from "./styles";

class SignIn extends Component {
  state = {
    email: "",
    password: "",
    error: ""
  };

  handleSignIn = async e => {
    e.preventDefault();
    const { email, password } = this.state;
    if (!email || !password) {
      this.setState({ error: "Preencha e-mail e senha para continuar!" });
    } else {
      try {
        const response = await api.post("https://c3khf0pnsd.execute-api.sa-east-1.amazonaws.com/hml/api/v1/acesso/login", { email, password });
        login(response.data.token);
        this.props.history.push("/app");
      } catch (err) {
        this.setState({
          error:
            "Houve um problema com o login, verifique suas credenciais. "
        });
      }
    }
  };

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleSignIn}>
          <img src="http://unicredafinidade.com.br/admin/arquivos/images/logo-quanta.png" />
          {this.state.error && <p>{this.state.error}</p>}
          <input

            placeholder="Login"
            onChange={e => this.setState({ email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Senha"
            onChange={e => this.setState({ password: e.target.value })}
          />
          <button type="submit">Entrar</button>

        </Form>
      </Container>
    );
  }
}

export default withRouter(SignIn);
