import React, { Component } from 'react';
import '../App.css';

class About extends Component {
  render() {
    return(
      <div className="About-container z-depth-3">
      <section id="team">
        <h5>The Team</h5>
        <p id="team-description">A full-stack project for General Assembly Web Development Immersive created by:</p>
        <div className="container">
          <div className="row">
            <div className="col s12 m4">
              <div className="card">
                <div className="card-image">
                  <img className="profile-pic" src="https://i.imgur.com/d2WbTpOm.jpg" alt="Winston" />
                </div>
              <div className="card-content team-members">
                <a href="https://github.com/winstonsummers" className="team-link">Winston Summers</a>
              </div>
            </div>
          </div>
          <div className="col s12 m4">
            <div className="card">
              <div className="card-image">
                <img className="profile-pic" src="https://i.imgur.com/Xoe7tBpl.jpg?1" alt="Tony" />
              </div>
              <div className="card-content">
                <a href="https://github.com/rallysport206" className="team-link">Tony Phan</a>
              </div>
            </div>
          </div>
          <div className="col s12 m4">
            <div className="card">
              <div className="card-image">
                <img className="profile-pic" src="https://i.imgur.com/SMoWjxim.jpg?2" alt="Sweeney" />
              </div>
              <div className="card-content">
                <a href="https://github.com/sweeneyyy" className="team-link">Sweeney Arnett</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      </section>
    </div>
    );
  }
}

export default About;