import React, { Component } from 'react';

class RestaurantsSaved extends Component{
  render(){
    return(
      <div class="card small z-depth-3">
        <div class="card-image">
          <img src={this.props.business.imgurl} alt={this.props.business.name} id="restaurants-saved-image" />
        </div>
        <div class="card-content" id="restaurants-saved">
          <p id="saved-rest-name"><a href={this.props.business.url}><img className="yelp" src="https://i.imgur.com/cSLthnw.png" alt="yelp"/>{this.props.business.name}</a></p>
          <span><p>{this.props.business.category} | Rating: {this.props.business.rating}</p></span>
        </div>
      </div>
    );
  }
}

export default RestaurantsSaved;