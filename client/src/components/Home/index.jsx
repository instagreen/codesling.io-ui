import React, { Component } from 'react';
import randomstring from 'randomstring';
import axios from 'axios';

import Button from '../globals/Button';
import Logo from '../globals/Logo';

import './LandingPage.css';
import Input from '../globals/forms/Input';
import FriendsList from '../Friends/FriendsList.jsx';
import FriendSearch from '../Friends/FriendSearch.jsx'

let slingId;

class Home extends Component {
  state = {
    searchTerm: '',
    searchResults: [],
    allChallenges: [],
    friendList: [],
    selectedChallenge: {}
   }

   componentWillMount() {
     // get friendList
   }

   async componentDidMount() {
    const id = localStorage.getItem('id');
    const { data } = await axios.get(`http://localhost:3396/api/usersChallenges/${id}`)
    this.setState({ allChallenges: data.rows });
   }

  randomSlingId = () => {
    slingId = `${randomstring.generate()}`;
  }

  handleDuelClick = () => {
    this.randomSlingId();
    this.props.history.push({
      pathname: `/${slingId}`,
      state: {
        challenge: this.state.selectedChallenge
      }
    });
  }

  handleSearchFriend(e) {
    if(this.state.searchTerm) {
      axios.get(`http://localhost:3396/api/users/getUser/${this.state.searchTerm}`)
        .then(({ data }) => {
          this.setState({
            searchResults: data.rows,
          });
        });
    } else {
      this.setState({ searchResults: []});
    }
  }
  
  handleAddChallengeClick = () => {
    this.props.history.push('/addChallenge');
  }

  handleChallengeSelect = (e) => {
    e.preventDefault();
    const { value } = e.target;
    this.setState({ selectedChallenge: value });
  }

  handleLogOut = () => {
    localStorage.clear();
    this.props.history.push('/');
  }

  render() {
    return (
      <div className="landing-page-container">
        <Logo
          className="landing-page-logo"
        />
        <br />
        <Input
            name='title'
            type='title'
            placeholder={'find friends'}
            onChange={(e) => this.setState({ searchTerm: e.target.value })}
          />
        <Button
          backgroundColor="red"
          color="white"
          text="Search"
          onClick={this.handleSearchFriend.bind(this)}
        />
        {this.state.searchResults.length ? <FriendSearch searchList={this.state.searchResults} /> : null}
        <br/>
        <br/>
        <select onChange={(e) => this.handleChallengeSelect(e)}>
          {this.state.allChallenges.map(challenge => {
            return (
            <option
              value={JSON.stringify(challenge)}
            >
              {challenge.title}
            </option>)
          }
          )}
        </select>
        <br />
        <br />
        <Button
          backgroundColor="red"
          color="white"
          text="Create Challenge"
          onClick={() => this.handleAddChallengeClick()}
        />
        <br />
        <Button
          backgroundColor="red"
          color="white"
          text="Duel"
          onClick={() => this.handleDuelClick()}
        />
        <br />
        <Button
          backgroundColor="blue"
          color="white"
          text="Logout"
          onClick={() => this.handleLogOut()}
        />
      </div>
    );
  }
}

export default Home;
