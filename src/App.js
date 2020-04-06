import React, {Component} from 'react';
//import logo from './logo.svg';
import './App.css';

import Login from './Login'
import Karaoke from './Karaoke'

class  App extends Component { 

  constructor(props){
    super(props)
    this.state = {
      username: sessionStorage.getItem('username'),
      preauth: ((sessionStorage.getItem('username')!==null && sessionStorage.getItem('username')!==undefined)?true:false)
    }
  }

  handleInputChange(event) {
    //console.log(event.target.name+" : "+event.target.value)                                                                                                                                                                                                            
    this.setState({                                                                                                                                                                                                                             
     [event.target.name]:event.target.value                                                                                                                                                                                               
    })
  }

  handleCloseForm(event) {

    //if(event.target.name && event.target.name === 'closeform')
    this.setState({preauth: true})

  }


  render(){
    if(!this.state.preauth){
      return (
        <div className="App">
          <header className="App-header">
            <Login show={true} handleInputChange={this.handleInputChange.bind(this)} handleCloseForm={this.handleCloseForm.bind(this)}/>
          </header>
        </div>
      )
    } else {
      return (
        <div className="App">
          <header className="App-header">
            <Karaoke username={this.state.username}/>
          </header>
        </div>
      )
    }
  }
}

export default App;
