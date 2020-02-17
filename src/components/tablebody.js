import React, { Component } from 'react';
export default class TBODY extends Component {


  render() {

    const { editRow, delrow, userarray,Handlechange,initvalue } = this.props
    return <>
      
        {userarray.map(item => (
          <tr key={item.id}>
            <td>{item.title}</td>
           <td>{(!item.isEdit) ?  <button onClick={(e) => delrow(e, item.id)}>Delete</button> : <input onChange={Handlechange}></input>}</td> 
            <td><button onClick={editRow(initvalue, item)}>{(item.isEdit) ? "save" : 'Edit'}</button></td>

          </tr>
        ))}
    
    </>
  }
}

