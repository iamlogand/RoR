import { Component } from 'react';
import axios from "axios";

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password1: '',
      password2: '',
      feedback: '',
      pending: false,
      submitReady: true
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    if (event.target.name === 'username') {
      this.setState({ username: event.target.value });
    } else if (event.target.name === "email") {
      this.setState({ password1: event.target.value });
    } else if (event.target.name === "password1") {
      this.setState({ password1: event.target.value });
    } else if (event.target.name === "password2") {
      this.setState({ password2: event.target.value });
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({
      pending: true,
      submitReady: false
    });

    setTimeout(async () => {
      const username = this.state.username;
      const password1 = this.state.password1;
      const password2 = this.state.password2;

      if (username === '' || password1 === '') {
        this.setState({
          feedback: 'Please provide a username and password.',
          pending: false,
          submitReady: true
        });
      } else if (password2 === '') {
        this.setState({
          feedback: 'Please confirm your new password.',
          pending: false,
          submitReady: true
        });
      } else if (password1 !== password2) {
        this.setState({
          feedback: "Those passwords don't match. Please try again.",
          pending: false,
          submitReady: true
        });
      } else {

        const data = JSON.stringify({
          "username": username,
          "password": password1
        });

        try {
          await axios({
            method: 'post',
            url: process.env.REACT_APP_BACKEND_ORIGIN + '/rorapp/api/token/',
            headers: { "Content-Type": "application/json" },
            data: data
          });
        } catch (error) {

          if (error.code === "ERR_BAD_REQUEST") {
            this.setState({
              password: '',
              feedback: 'Your username and password do not match. Please try again.',
              pending: false,
              submitReady: true
            });
          } else {
            this.setState({
              password: '',
              feedback: 'Something went wrong. Please try again later.',
              pending: false,
              submitReady: true
            });
          }
          return;
        }
      }
    }, 1);
  }

  renderFeedback = () => {
    if (this.state.feedback !== '') {
      return <div className={`feedback ${this.state.pending ? "" : "feedback-ready"}`}>
        {this.state.feedback}
      </div>
    } else {
      return null
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="form">
        {this.renderFeedback()}
        <div className="field">
          <label htmlFor="new-username">Username</label>
          <input
            type="text"
            id="new-username"
            name="username"
            autoComplete="username"
            value={this.state.username}
            onChange={this.handleInputChange} />
        </div>
        <div className="field">
          <label htmlFor="new-username">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            autoComplete="email"
            value={this.state.email}
            onChange={this.handleInputChange} />
        </div>
        <div className="field">
          <label htmlFor="password1">Password</label>
          <input
            type="password"
            id="password1"
            name="password1"
            autoComplete="new-password"
            value={this.state.password1}
            onChange={this.handleInputChange} />
        </div>
        <div className="field">
          <label htmlFor="password2">Confirm Password</label>
          <input
            type="password"
            id="password2"
            name="password2"
            autoComplete="new-password"
            value={this.state.password2}
            onChange={this.handleInputChange} />
        </div>
        <div>
          {this.state.submitReady === true
            ? <input className="submit submit-ready" type="submit" value="Create Account" />
            : <div className="submit submit-loading"><img src={require("../images/throbber_light.gif")} alt="loading" /></div>
          }
        </div>
      </form>
    );
  }
}

export default RegisterForm;