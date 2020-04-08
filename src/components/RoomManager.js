import React, {Component} from 'react';

import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/DialogContent'
import GroupAdd from '@material-ui/icons/GroupAdd'
import MeetingRoom from '@material-ui/icons/MeetingRoom'
import TextField from '@material-ui/core/TextField';

class RoomManager extends Component {
    constructor(props){
        super(props)
        this.state = {
            form: false,
            formTitle: '',
            roomName: ''
        }
        //this.handleInputChange.bind(this)
    }

    toggleUI(title){
        this.setState({form: !this.state.form, formTitle: title})
    }

    handleInputChange(event) {
        //console.log(event.target.name+" : "+event.target.value)                                                                                                                                                                                                            
        this.setState({                                                                                                                                                                                                                             
            [event.target.name]:event.target.value                                                                                                                                                                                               
        })
    }

    render(){
        if(this.state.form){
            return  (
                <div>
                    <Card className="RoomMenu" variant="outlined">
                        <CardContent>
                            <h1>{this.state.formTitle}</h1>
                            <p>Note: the name of the room is required and without spaces</p>
                            <TextField id="room-name" name="roomName" label="Room Name*" variant="filled" onChange={this.handleInputChange.bind(this)}/>
                            <Button
                                id="man-room"
                                name="man-room"
                                color="primary"
                                size="large"
                                startIcon={<GroupAdd />}
                                disabled={(this.state.roomName && this.state.roomName !== '' && this.state.roomName.indexOf(" ") === -1)?false:true}
                                onClick={(event)=>{
                                    this.props.handleRoomSelection(this.state.roomName)
                                }}
                            >
                                {this.state.formTitle.indexOf("Create") !== -1?'Create':'Join'}
                            </Button>
                    </CardContent>
                    </Card>
                </div>
            )
        } else {
            return (
                <div>
                    <Card className="RoomMenu" variant="outlined">
                        <CardContent>
                            <h1>Options</h1>
                            <Button
                                id="create-room"
                                name="create-room"
                                color="primary"
                                size="large"
                                startIcon={<GroupAdd />}
                                onClick={()=>{
                                    this.toggleUI('Create Room Form')
                                }}
                            >
                                Create Room
                            </Button>
                            <Button
                                id="join-room"
                                name="join-room"
                                color="primary"
                                size="large"
                                startIcon={<MeetingRoom />}
                                onClick={()=>{
                                    this.toggleUI('Join Room Form')
                                }}
                            >
                                Join Room
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            )
        }
    }
}

export default RoomManager;
