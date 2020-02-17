import React, { Component } from 'react';
export default class BEADD extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initvalue: '',
            row: [],

        }
    }
    Handlechange = (event) => {
      debugger
        this.setState({
            initvalue: event.target.value,
         
    })
    }
    Addrow = (titlename) => (event) => {
        event.preventDefault();
        const { userarray } = this.props
        const { row } = this.state
        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify({
                title: titlename,
                body: "bedelkhah",
                userId: 1,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.json())
            .then(response => {
                response.isEdit=false;
                this.setState({
                    userarray: userarray.push(response),
                    row: [...row, response ],
                    initvalue:'',
})
    
                
            })
            
            
          


    }
    deleterow = (e, id) => {
        const { row } = this.state
      row.splice(row.findIndex(item=>item.title === id),1);
      this.setState({row})
    //   console.log(row)
      }
      editRow = ( value,curitem) => (event) => {
        event.preventDefault();
        const { row } = this.state
        row.forEach(element => {
          if (!element.isEdit && element.title === curitem.title) {
            element.isEdit = true
          } else if (element.isEdit && element.title === curitem.title) {
            element.isEdit = false;
            fetch('https://jsonplaceholder.typicode.com/posts/' + curitem.id, {
              method: 'PATCH',
              body: JSON.stringify({
                title: value
              }),
              headers: {
                "Content-type": "application/json; charset=UTF-8"
              }
            })
              .then(response => response.json())
              .then(json => {
                json.isEdit=false;
                row[row.findIndex(row=>row.id === curitem.id)]=json;
                this.setState({
                  row:row,
                  initvalue:"",
        
                })
                console.log(json)
              })
    
          }
        })
        this.setState(row)
    
      }
    render() {
        const { row ,initvalue} = this.state;
//  {console.log(row)}

        return <>
            <tr> <td><input className="input" value={this.state.initvalue}  onChange={this.Handlechange} placeholder='enter your title' /></td>
                <td><button onClick={this.Addrow(this.state.initvalue)}>Creat</button></td>
            </tr>
            {row.map(item => (
                <tr>
                    <td>{item.title}</td>
                    {!item.isEdit? <td><button onClick={(e) =>this.deleterow(e, item.title)}>Delete</button></td>:<td><input  onChange={this.Handlechange}></input></td>}
                   <td><button onClick={this.editRow(initvalue,item)}>{(item.isEdit) ?"save":'Edit'}</button></td> 
                </tr>

            ))}
        </>
    }
}