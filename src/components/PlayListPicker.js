import React, {Component} from 'react';
import axios from 'axios'

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
            {this.state.video ? <iframe title={this.state.video} id="player" src={"https://www.youtube.com/embed/" + this.state.video + "?enablejsapi=1"}></iframe> : <b>No video loaded</b>}
        </div>
       
    )
  }
}

export default PlayListPicker;
