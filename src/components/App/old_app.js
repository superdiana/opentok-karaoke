<<<<<<< HEAD
import React, {Component} from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ExitToApp from '@material-ui/icons/ExitToApp'
import Typography from '@material-ui/core/Typography';

import Login from '../Login'
import RoomManager from '../RoomManager'
import Karaoke from '../Karaoke'

const classes = {
  title: {
    flexGrow: 1
  },
  toolbar: {
    top: 0,
    position: 'absolute'
  },
  session: {
    color: '#fff',
    fontSize: '15px',
    verticalAlign: 'middle'
  }
}

class  App extends Component {

  constructor(props){
    super(props)
    this.state = {
      username: sessionStorage.getItem('user'),
      preauth: ((sessionStorage.getItem('user')!==null && sessionStorage.getItem('user')!==undefined)?true:false),
      roomName:null,
      roomSelected: false
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

  handleRoomSelection(room) {
    this.setState({roomName: room})
  }

  logOut(){
    //this is the logOut method.
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
            <AppBar position="static" style={classes.toolbar}>
              <Toolbar>
                <Typography variant="h6" style={classes.title}>
                  Oka - OpenTok Karaoke
                </Typography>
                <div style={classes.session}>
                  Connected as: <b>{JSON.parse(this.state.username).displayName}</b>
                  <ListItemIcon onClick={() => this.logOut() } style={ {marginLeft: 10, cursor:'pointer', color:'#fff', verticalAlign: 'middle'} }><ExitToApp/></ListItemIcon>
                </div>
              </Toolbar>
            </AppBar>
            {this.state.roomName?<Karaoke roomName={this.state.roomName} username={this.state.username}/>:<RoomManager handleRoomSelection={this.handleRoomSelection.bind(this)}/>}
          </header>
        </div>
      )
    }
  }
}