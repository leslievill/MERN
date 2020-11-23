import React, { Component } from 'react';
import '../App.css';

class About extends Component {
  render() {
    return(
      <div className="About-container z-depth-3">
      <section id="team">
        <h5>The Team</h5>
        <p id="team-description">A MERN project for the UC Berkeley extension Full Stack program by:</p>
        <div className="container">
          <div className="row">
            <div className="col s12 m4">
              <div className="card">
                <div className="card-image">
                  <img className="profile-pic" src="https://github.com/kent28808/React-Portfolio/blob/main/src/assets/profile.jpg?raw=true" alt="Ken" />
                </div>
              <div className="card-content team-members">
                <a href="https://github.com/kent28808" className="team-link">Ken Tanoue</a>
              </div>
            </div>
          </div>
          <div className="col s12 m4">
            <div className="card">
              <div className="card-image">
                <img className="profile-pic" src="https://github.com/leslievill/reactportfolio/blob/main/public/images/leslie.png?raw=true" alt="Leslie" />
              </div>
              <div className="card-content">
                <a href="https://github.com/leslievill" className="team-link">Leslie Villatoro</a>
              </div>
            </div>
          </div>
          <div className="col s12 m4">
            <div className="card">
              <div className="card-image">
                <img className="profile-pic" src="https://github.com/biencarlovilla/About-Me/blob/master/images/portrait.png?raw=true" alt="Biencarlo" />
              </div>
              <div className="card-content">
                <a href="https://github.com/biencarlovilla" className="team-link">Biencarlo Villa</a>
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