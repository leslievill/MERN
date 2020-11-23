import React, { Component } from 'react';

class BusinessResults extends Component{
  constructor(props){
    super(props)
    this.state = {
      value: 'Save'
    }
    this.updateButton = this.updateButton.bind(this);
  }

  updateButton(e){
    this.props.saveClick(e);
    this.setState({ value: 'Saved!' })
  }

  render(){
    return(
      <div className="card small horizontal">
        <div className="card-image-business">
          <img className="responsive-img" src={this.props.business.image_url} alt="{this.props.business.name}" />
        </div>
        <div className="card-stacked">
          <div className="card-content">
            <ul>
              <li className="restaurant-results">
                <p id="results-rest-name"><a href={this.props.business.url}><img className="yelp" src="https://i.imgur.com/cSLthnw.png" alt="yelp"/>{this.props.business.name}</a></p>
                <p className="rest-results-detail">Rating: {this.props.business.rating}</p>
                <p className="rest-results-detail"><bold>{this.props.business.categories[0].title} </bold></p>
              </li>
            </ul>
          </div>
            <ul>
              <li className="restaurant-results">
                <div className="card-action">
                  <input type="button" value={this.state.value} id={this.props.business.id} onClick={this.updateButton} />
                </div>
              </li>
            </ul>
          </div>
        </div>
    );
  }
}
export default BusinessResults;