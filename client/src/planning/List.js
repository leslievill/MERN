import React, { Component } from 'react';
import axios from 'axios';

// User list component with default state empty
class List extends Component {
  constructor(props){
    super(props)
    this.state = {
      error: '',
      toPack: [],
      newItem: ''
    }
  }
  // Clear entire packing list
  // clear = () => {
  //   this.setState({ toPack: [] });
  // }

  // Delete a single item from the list
  deleteItem = (item) => {
    // the items in the packing list
    let toPackLocal = this.state.toPack;
    // indexOf returns in to array. you can then slice
    let itemIndex = toPackLocal.indexOf(item);
    if(itemIndex >= 0){
      toPackLocal.splice(itemIndex, 1);
      this.setState({ toPack:  toPackLocal });
      console.log('toPackLocal', toPackLocal);
    }

    // Send user list to back end to update db
    // back tick is es6 syntax that allows inline interpolation / eliminates concatenation
    axios.delete(`/saved/profile/list/${this.props.user.id}`, {
      data: { list: toPackLocal }
    }).then((res) => {
      console.log("removed item from list", item)
    }).catch((err) => {
      console.log("err", err);
    });
  }

  // Add new item to the users list
  add = (e) => {
      e.preventDefault();
      if(this.state.newItem){
      let toPackLocal = this.state.toPack;
      toPackLocal.push(this.state.newItem)
      this.setState({error: '', newItem: '', toPack: toPackLocal});

      // update database with user items
      // back tick is es6 syntax that allows inline interpolation / eliminates concatenation
      axios.post(`/saved/profile/list/${this.props.user.id}`, {
        list: this.state.toPack
      }).then((res) => {
        console.log("updated user list", res.data)
      }).catch((err) => {
        console.log("err", err);
      });
    }
    else{
      this.setState({error: 'Please enter something to pack'})
    }
  }

  newItemChange = (e) => {
    this.setState({ newItem: e.target.value });
  }

  componentWillMount() {
    axios.get('/saved/profile/' + this.props.user.id).then((res) => {
      this.setState({
        toPack: res.data.list
      });
    });
  }

  render() {
    return(
      <div className="packing-list-container z-depth-3">
        <PackingList items={this.state.toPack} onDelete={this.deleteItem} />
          <form>
            <input type='text' className='form-control' id="add-list-item" placeholder='add something to pack' onChange={this.newItemChange} value={this.state.newItem} />
            <button className='add-item' onClick={this.add}>Add</button>
          </form>
      </div>
    );
  }
}

class PackingList extends Component{
  render(){
    const packingItems = this.props.items.map(thing =>{
      return (<ListItem key={thing} item={thing} onDelete={this.props.onDelete} />);
    });
    return(
      <ul className='list-group'>
        {packingItems}
      </ul>
    );
  }
}

class ListItem extends Component{
  deleteHandler = () => {
    this.props.onDelete(this.props.item);
  }

  render(){
    return(
      <li className='packing-list-item'>
        {this.props.item}
        <button className='packing-list-delete' onClick={this.deleteHandler}> X</button>
      </li>
    );
  }
}

export default List;