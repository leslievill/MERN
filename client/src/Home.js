import React, { Component } from 'react';
import HowItWorks from './planning/HowItWorks.js';
import About from './planning/About.js';


class Home extends Component {
  render(){
    return (
      <div className="Home">
        <HowItWorks />
        <About />
      </div>
    );
  }
}

export default Home;