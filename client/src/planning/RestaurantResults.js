import React, { Component } from 'react';
import BusinessResults from './BusinessResults.js';

class RestaurantResults extends Component {
  render(){
    var names = [];
    var businesses = this.props.businesses;
    if(businesses.length < 1){
      names = <p>What is your next travel destination?</p>
    }else{
      names = businesses.map((business) => {
        return (<BusinessResults business={business} saveClick={this.props.saveClick} />);
      });
    }

		return(
      <div className="results-container container">
        <div className="row">
          {names}
        </div>
      </div>
		);
	}
}

export default RestaurantResults;