import React, { Component } from 'react';
import Search from './Search.js';
import RestaurantResults from './RestaurantResults.js';
import axios from 'axios';

class Results extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query: '',
      businesses: [],
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange = (e) => {
    this.setState({ query: e.target.value });
  }

  preventing = (e) => {
    e.preventDefault();
    axios.post('/saved/results', {
      location: this.state.query,
    }).then((res) => {
      this.setState({ businesses: res.data.businesses });
    }).catch((err) => {
      console.log("error:", err);
    });
  }

  saveClick = (e) => {
    e.preventDefault();
    let businessToSave;
    for (let i = 0; i < this.state.businesses.length; i++) {
      if (this.state.businesses[i].id === e.target.id) {
        businessToSave = this.state.businesses[i];
      }
    }

    //find user saved items to display on profile page
    axios.post('/saved/results/restaurantsaved', {
      business: businessToSave,
      user: this.props.user,
    }).then((res) => {
      // console.log("response data", res.data);
    }).catch((err) => {
      console.log("err", err);
    });
  }

  render() {
    var results;
    var res = this.state.businesses;

    if (this.state.businesses) {
      results = res.map((b) => (
        <div className="container Results">
          <li>b</li>
        </div>
      ));
    } else {
      results = <p>none</p>
      console.log(this.state.businesses);
    }

    return (
      <div className="container Results">
        <div className="row">
          <div className="col s12 m6 z-depth-3">{results}</div>
          <Search query={this.state.query} handleInputChange={(event) => this.handleInputChange(event)} preventing={this.preventing} onSubmit={this.handleSubmit} />
          <RestaurantResults businesses={this.state.businesses} saveClick={this.saveClick} />
        </div>
      </div>
    );
  }
}

export default Results;