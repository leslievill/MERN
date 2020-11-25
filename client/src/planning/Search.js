import React, { Component } from 'react';


class Search extends Component {

  render() {
    return(
      <div className="full-page-search">
        <div className="Search container">
      	  <form className="form" onSubmit={this.props.preventing}>
      	    <input type="text"
                name="location"
                placeholder="Enter Location"
                value={this.props.query}
                onChange={this.props.handleInputChange} />
            <button type="submit" value="search" className="waves-effect waves-teal btn-flat">Search<i className="material-icons left">search</i></button>
          </form>
        </div>
      </div>
    );
  }
}


export default Search;