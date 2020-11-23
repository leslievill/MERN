import React, { Component } from 'react';
// import Signup from './auth/Signup.js';
import { Link } from 'react-router-dom';
import Results from './Results';
import Signup from '../auth/Signup';

class HowItWorks extends Component {
  render() {
    return(
      <div className="About-container-how">
        <div className="container">
          <div className="row">
            <div className="how-it-works col s12 m4">
              <a href="/results">
                <p>Search Travel Destinations</p> 
                  <i className="how material-icons">language</i>
              </a>
            </div>
            <div className="how-it-works col s12 m4">
              <p>View & Save Top Restaurants</p> 
                <i className="how material-icons">border_color</i>
            </div>
            <div className="how-it-works col s12 m4">
              <p>Create Your Custom Packing List</p>
                <i className="how material-icons">clear_all</i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HowItWorks;