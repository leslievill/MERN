import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class Signup extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: '',
      email: '',
      password: ''
    }
  }

  handleNameChange = (e) => {
    this.setState({name: e.target.value})
  }
  handleEmailChange = (e) => {
    this.setState({email: e.target.value})
  }
  handlePasswordChange = (e) => {
    this.setState({password: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/auth/signup', {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    }).then(result => {
      localStorage.setItem('mernToken', result.data.token);
      this.props.updateUser();
    }).catch(error => {
      console.log(error.response);
      this.props.setFlash('error', error.response.status + ': ' + (error.response.data && error.response.data.error ? error.response.data.message : error.response.statusText));
    });
  }

  render() {
    let form = '';
    if(this.props.user){
      return (<Redirect to="/saved/profile/" />);
    }
    else {
      form = (<form onSubmit={this.handleSubmit}>
                <div>
                  <input name="Name"
                       placeholder="What is your first name?"
                       value={this.state.name}
                       onChange={this.handleNameChange} />
                </div>
                <div>
                  <input name="Email"
                       placeholder="What is your email?"
                       value={this.state.email}
                       onChange={this.handleEmailChange} />
               </div>
               <div>
                  <input name="Password"
                     placeholder="Choose a password"
                     type="password"
                     value={this.state.password}
                     onChange={this.handlePasswordChange} />
                 </div>
                 <button type="submit" value="Sign up!" class="waves-effect waves-teal btn-flat">Sign Up<i class="material-icons left">create</i></button>
        </form>);
    }
    return(
      <div className="signup-form">
        <div className="container">
          {form}
          {this.props.user ? <Redirect to="/saved/profile" /> : ''}
        </div>
      </div>
    );
  }
}

export default Signup;