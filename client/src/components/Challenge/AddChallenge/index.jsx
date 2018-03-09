import React, { Component } from 'react';
import axios from 'axios';

import Input from '../../globals/forms/Input';
import Button from '../../globals/Button/';
import Logo from '../../globals/Logo';
import Dropdown from '../../globals/forms/Dropdown'

import './Auth.css';

class AddChallenge extends Component {
  state = { 
    title: '',
    content: '',

    difficulty: null,
    input: '',
    output: '',
    difficulty: 0, // 1 by default (Easy)
   }

  submitChallenge = async (e) => {
    console.log('entering submitChallenge');
    e.preventDefault();
    const { title, content, difficulty, input, output } = this.state;
    const id = localStorage.getItem('id');
    const body = {
      title,
      content,
      difficulty,
      input,
      output,
      user_id: id,
      type: 0
    }
    const result = await axios.post('http://localhost:3396/api/challenges', body);
    console.log('req.body',result);

    const bodyTestCase = {
      content,
      challenge_id: result.data.id,
      input,
      output
    }
    const postTestCase = await axios.post('http://localhost:3396/api/testCases', bodyTestCase);
    
    this.props.history.push('/home');
  }

  handleChallengeInput = (event) => {
    const { name, value } = event.target;
    console.log('name, value, event.target', name, value, event.target);
    this.setState({ [name]: value });
  }

  render() {
    console.log('input, output', this.state.input, this.state.output)
    return (
      <div className="login-form-container">
        <Logo
          className="landing-page-logo"
        />
        <form className="auth-form">
          <Input
            name='title'
            type='title'
            placeholder={'enter title'}
            onChange={this.handleChallengeInput}
            />
          <Input
            name='content'
            type='content'
            placeholder={'enter content'}
            onChange={this.handleChallengeInput}
            />
          <Dropdown 
            name='difficulty'
            type='difficulty'
            placeholder={'enter your difficulty'}
            onChange={this.handleChallengeInput}
            />
          <Input 
            name='input'
            type='input'
            placeholder={'input'}
            onChange={this.handleChallengeInput}
            />
          <Input 
            name='output'
            type='output'
            placeholder={'output'}
            onChange={this.handleChallengeInput}
            />            
          <Button
            backgroundColor="red"
            color="white"
            text="Add Challenge"
            onClick={(e) => this.submitChallenge(e)}
            />
        </form>
      </div>
    );
  }
}

export default AddChallenge;
