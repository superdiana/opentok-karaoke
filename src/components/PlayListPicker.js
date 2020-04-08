import React, {Component} from 'react';
import axios from 'axios'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/DialogContent'
//import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Queue from '@material-ui/icons/Queue'
import Visibility from '@material-ui/icons/Visibility'

class PlayListPicker extends Component { 

  constructor(props){
    super(props)
    this.state = {
        items: null,
        video: null
    }
    console.log(props)
    //this.wrapper = React.createRef()
    this.domRef = React.createRef()
    //this.showVideoPreview = this.showVideoPreview.bind(this)
    //this.addToQueue = this.addToQueue.bind(this)
  }

  componentDidMount(){
    console.log(this.props.playlist_id)
    //Load items from server
    axios.get(`${process.env.REACT_APP_SERVER_URL}/api/get-videos-from-playlist`, {
        params: {
            playlist_id: this.props.playlist_id,
            room: 'oka'
        }
    })
    .then((response)=>{
        //console.log(response)
        if(response.data && response.data.status === "success"){
            this.setState({items: response.data.playlist.items})
            
        } else {
            console.log('Error when trying to get videos: ' + response.data.message)
        }
    })
  }

  showVideoPreview(videoId){
    //Loads the video in the playlistpicker for preview
    this.setState({video: videoId})
    //console.log(event)
  }

  //This method maybe should be in parent
  addToQueue(id, name, image){
    this.props.handleAddToQueue(id, name, image)
  }

  render(){
    
    return (
        <div className="PlayListPickerContainer">
            <Card className={this.props.openPicker? "PlayListPicker Visible":"PlayListPicker"} variant="outlined">
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <h1>Preview</h1>
                            <div className="player-section">
                                {this.state.video?<iframe title={this.state.video} id="player" src={"https://www.youtube.com/embed/"+this.state.video+"?enablejsapi=1"}></iframe>:<b>No video loaded</b>}
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            <List>
                                {this.state.items && this.state.items.map((item, index) => (
                                    <ListItem button key={item.id}>
                                        <ListItemIcon onClick={() => this.showVideoPreview(item.snippet.resourceId.videoId) }><Visibility/></ListItemIcon>
                                        <ListItemIcon onClick={() => this.addToQueue(item.snippet.resourceId.videoId, item.snippet.title, item.snippet.thumbnails.default.url)}><Queue/></ListItemIcon>
                                        <ListItemText primary={item.snippet.title}/>
                                    </ListItem>
                                ))}
                            </List>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </div>
       
    )
  }
}

export default PlayListPicker;
