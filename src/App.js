import React, { Component } from 'react';
import "./App.css";
import BELIST from './components/bestlist'
export default class App extends Component {
  constructor(props) {
    super(props);
    // this.componentDidMount = this.componentDidMount.bind(this);
    this.state = {
      users: [],
    }
  }
  componentDidMount=()=> {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then(json => {
        this.setState({
          users: json
        })
      })
    
  }

  render() {
    return <>
    {this.state.users.map(item=>(item.isEdit=false))}
   
    <BELIST users={this.state.users}/>
    
    </>
      
}
}

