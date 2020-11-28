import React, { Component } from 'react';
import List from './planning/List.js';
import RestaurantsSaved from './planning/RestaurantsSaved.js';
import axios from 'axios';

class Profile extends Component {
  constructor(props){
    super(props);
    this.state= {
      user: {},
      restaurants: [],
      list: []
    }
  }

  componentWillMount() {
    if(this.props.user && this.props.user.id) {
      axios({url:'/saved/profile/' + this.props.user.id,
    method:"get",
    headers:{token:localStorage.getItem("mernToken")}
    }).then((res) => {
        this.setState({
          restaurants: res.data.restaurant,
          user: this.props.user
        });
      });
    }else { //if no user then redirect home
      this.props.history.push('/');
    }
  }

  render(){
    var display;
    var savedBusiness = this.state.restaurants;
    if(savedBusiness.length < 1){
      display = <p id="profile-empty-search"><a href="/results">Go save some restaurants!</a></p>
    }else {
      display = savedBusiness.map((business) => {
        return(<RestaurantsSaved business={business} />);
      });
    }

    if(this.props.user && this.props.user.name){
      return (
          <div className="container saved-business">
          <h3 id="profile-heading">{this.props.user.name}'s Profile</h3>
            <div className="row profile-body">
              <div className="col s12 m6 packing-list">
                <h5 id="profile-pack">Packing List:</h5>
                <List user={this.props.user} />
              </div>
              <div className="col s12 m6">
                <h5 id="profile-search">Saved Restaurants:</h5>
                {display}
              </div>
            </div>
          </div>);
    }
    else {
      return (<p>This is a profile page. You need to be logged in to view it.</p>);
    }
  }
}

export default Profile;