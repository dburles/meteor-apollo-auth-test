import React, { Component } from 'react';
import { loginWithPassword } from 'meteor-apollo-accounts';
import { apollo } from './index';

class Login extends Component {
  state = {
    email: '',
    password: '',
  };

  onChange = type => event => {
    const value = event.target.value;
    this.setState(state => ({
      ...state,
      [type]: value,
    }));
  };

  onSubmit = async event => {
    event.preventDefault();
    const { email, password } = this.state;

    try {
      await loginWithPassword({ email, password }, apollo);
      alert('Signed in!');
    } catch (error) {
      alert(error.message);
    }
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          type="text"
          placeholder="email"
          value={this.state.email}
          onChange={this.onChange('email')}
        />
        <input
          type="password"
          placeholder="password"
          value={this.state.password}
          onChange={this.onChange('password')}
        />
        <button type="submit">Login</button>
      </form>
    );
  }
}

export default Login;
