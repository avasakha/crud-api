import React, { Component } from 'react';
import TBODY from './tablebody';
import BEADD from './bestcreate';
export default class BELIST extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userarray: [],
      row: [],
      initvalue:'',
}
  }


  BestList = () => {
    const { users } = this.props
    let use = [];
    for (let i = 0; i < 20; i++) {
      use.push(users[i])
    }
    this.setState({

      userarray: use,
      row: [],
})


  }
  Handlechange = (event) => {
    this.setState({
      initvalue: event.target.value,
    })
  }

  delrow = (e, id) => {
    const { userarray } = this.state
    userarray.splice(userarray.findIndex(row => row.id === id), 1);
    this.setState({ userarray })
  }

  

  editRow = (initvalue, curitem) => (event) => {
    event.preventDefault();
    const { userarray } = this.state
    userarray.forEach(element => {
      if (!element.isEdit && element.id === curitem.id) {
        element.isEdit =true; 
      } else if (element.isEdit && element.id === curitem.id) {
        element.isEdit = false;
        fetch('https://jsonplaceholder.typicode.com/posts/' + curitem.id, {
          method: 'PATCH',
          body: JSON.stringify({
            title: initvalue
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          }
        })
          .then(response => response.json())
          .then(json => {
            // json.isEdit=false;
            userarray[userarray.findIndex(row=>row.id === curitem.id)]=json;
            this.setState({
              userarray:userarray,
            })
          })

      }
    })
    this.setState(userarray)

  }
  render() {

    return (

      <div>

        <button onClick={this.BestList} className="del">bestlist </button>
        <table>
          <thead>
            <th>Title</th>
          </thead>
          <tbody>
          <TBODY userarray={this.state.userarray} delrow={this.delrow} editRow={this.editRow}  Handlechange={this.Handlechange}  initvalue={this.state.initvalue}/>
          <BEADD userarray={this.state.userarray}  />
          </tbody>
        </table>
      </div>

    )
  }
}

