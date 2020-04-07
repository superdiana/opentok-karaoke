import React, {Component} from 'react';

import OpenTok from '@opentok/client'
import axios from 'axios';

// var socket
// //var count = 0

// //Global Methods for youtube player
// var player;
// var interval;
// var done = false
// var eroom = 'oka'

// function onYouTubeIframeAPIReady() {
//   player = new window.YT.Player('player', {
//     events: {
//       'onReady': onPlayerReady,
//       'onStateChange': onPlayerStateChange
//     }
//   });
// }

// function onPlayerReady(event) {
//   event.target.playVideo();
// }

// function onPlayerStateChange(event) {
//   if (event.data === window.YT.PlayerState.PLAYING && !done) {
//     //setTimeout(stopVideo, 6000);
//     interval = setInterval(currentTime,1)
//     done = true;
//   } else{
//     //setInterval(currentTime,1)
//   }
// }

// function stopVideo() {
//   player.stopVideo();
// }

// function currentTime(){
//   let current = parseInt(player.getCurrentTime());
//   let duration = parseInt(player.getDuration());
//   console.log(current + " / "+duration);
//   if(current === duration){
//     socket.emit('sub.queue',{room: eroom})
//     clearInterval(interval);
//   }
// }

// //Global class for share screen to client using sockets and canvas
// let processor = {
//   timerCallback: function() {
//     if (this.video.paused || this.video.ended) {
//       return;
//     }
//     this.computeFrame();
//     let self = this;
//     setTimeout(function () {
//         self.timerCallback();
//       }, 0);
//   },

//   doLoad: function(selector) {
//     //this.video = document.getElementsByTagName("video")[0];
//     //console.log(document.querySelector(".melvin video"))
//     this.video = document.querySelector(selector);
//     this.c1 = document.getElementById("c1");
//     this.ctx1 = this.c1.getContext("2d");
//     //this.c2 = document.getElementById("c2");
//     //this.ctx2 = this.c2.getContext("2d");
//     this.width = this.video.videoWidth;
//     this.height = this.video.videoHeight;
//     //console.log(this.video.videoWidth)
//     //console.log(this.video.videoHeight)
//     this.timerCallback();

//   },

//   computeFrame: function() {
//     this.ctx1.drawImage(this.video, 0, 0, this.width, this.height);
//     let frame = this.ctx1.getImageData(0, 0, this.width, this.height);
//         let l = frame.data.length / 4;

//     for (let i = 0; i < l; i++) {
//       let r = frame.data[i * 4 + 0];
//       let g = frame.data[i * 4 + 1];
//       let b = frame.data[i * 4 + 2];
//       if (g > 100 && r > 100 && b < 43)
//         frame.data[i * 4 + 3] = 0;
//     }
//     //this.ctx2.putImageData(frame, 0, 0);
//     return;
//   }
// }

// class Karaoke extends Component { 

//   constructor(props){
//     super(props)
//     this.state = {
//       auth: ((sessionStorage.getItem('token')!==null && sessionStorage.getItem('token')!==undefined)?true:false),
//       key: process.env.REACT_APP_OPENTOK_API_KEY,
//       site_url: process.env.REACT_APP_SITE_URL,
//       videoselector: null,
//       connected: false,
//       openPicker: false,
//       pickDisabled: true,
//       queue:[],
//       oka: false,
//       iqdata: null
//     }

//     eroom = this.props.roomName
//     socket = socketIOClient(process.env.REACT_APP_SERVER_URL);
//     socket.on('connect', ()=>{
//       console.log("Websocket connected.")
//     })
//     socket.on('join.room', (data)=>{
//       let {email, displayName } = JSON.parse(sessionStorage.getItem('user'))
//       console.log(data["message"]+' ' + email + ' / ' + displayName)
//       if(data["email"] === email){
//         //console.log(data)
//         //Mount backup queue to new connected user
//         this.setState({connected: true, pickDisabled: false, queue: data.queue})
//         //If queue length > 0 , get the first queue position and the user camera that's performing
//         if(this.state.queue.length > 0){
//           //iqdata is the init queue data needed to start sharing stream to new connected users
//           //this var is required because video element must exist first
//           this.setState({iqdata: {email: this.state.queue[0].useremail, videoselector: '#video-' + this.state.queue[0].videoselector + ' video'} })
//           //processor.doLoad(cdata)
//         }
//       }
//     })
//     socket.on('share.video.stream',(data)=>{
//       console.log(data)
//       if(this.state.videoselector !== data){
//         this.setState({oka: false})
//         data ='#video-' + data + ' video'
//         //console.log(data)
//         processor.doLoad(data)
//       } else {
//         if(!this.state.oka){
//           this.setState({oka: true})
//           this.initYTPlayer()
//         }
//       }

//     })
//     socket.on('add.to.queue',(data)=>{
//       this.setState({queue: this.state.queue.concat({vid: data.vid, vname: data.vname, vimage:data.vimage, username: data.username, useremail:data.useremail, videoselector:data.videoselector})})
//       //I am the 1rst in the queue then player appers to play my song and emit my screen to all users conected to room
//       console.log(data)
//       let { email } = JSON.parse(sessionStorage.getItem('user'))
//       if(parseInt(data.queue_count) === 1 && email === data.useremail){
//         this.setState({oka: true})
//         this.initYTPlayer()
//       } else {
//         if(parseInt(data.queue_count) === 1){
//           socket.emit('share.video.stream', {room: this.props.roomName, selector: data.videoselector})
//         }
//       }
//     })
//     socket.on('sub.queue',(data)=>{
//       this.setState({oka:false})
//       //Delete first element in queue
//       this.setState(prevState => {
//         const queue = prevState.queue.slice(0)
//         queue.splice(0, 1)
//         return { queue }
//       })
//       //If queue then execute the next one
//       if(this.state.queue.length){
//         //Search for me in queue
//         let items = this.state.queue.filter(item => {
//           if(item.videoselector)
//             return (item.videoselector === this.state.videoselector)
//           else return false
//         })
//         //If i am not in queue then enable pick button
//         if(items.length === 0)
//           this.setState({pickDisabled: false})
//         else
//           this.setState({pickDisabled: true})
//         //Send the image to anyone except who is going to perform
//         socket.emit('share.video.stream', {room: this.props.roomName, selector: this.state.queue[0].videoselector})
//       } else {
//         //If not queue then enable pick button
//         this.setState({pickDisabled: false})
//       }
//     })

//   }

//   initSession(){
//     if(this.state.auth){

//       //Variant 2 - create publisher and add subscribers
//       const session = OpenTok.initSession(this.state.key, sessionStorage.getItem('session_id'))
//       let { email, displayName } = JSON.parse(sessionStorage.getItem('user'))
//       const publisher = OpenTok.initPublisher('publisher', {name: displayName + " / "+email})
//       this.setState({videoselector: (displayName + " / "+email).replace(/[\/@\.\s]+/g,"-")})

//       session.on({
//         streamCreated: (event) => {
//           let { email } = JSON.parse(sessionStorage.getItem('user'))
//           //let userSelector = email.replace(/@[A-Za-z]+\.[A-Za-z]+/g,"")
//           //console.log(event.stream)
//           let video_selector = `video-${event.stream.name.replace(/[\/@\.\s]+/g,"-")}`
//           //const subscriberClassName = `subscriber-${event.stream.streamId} ${video_selector}`
//           const subscriberClassName = `${video_selector}`
//           const subscriber = document.createElement('div')
//           subscriber.setAttribute('id', subscriberClassName)
//           document.getElementById('subscriber').appendChild(subscriber)
//           session.subscribe(event.stream, subscriberClassName, null, (error)=>{
//             //console.log(event.stream.name)
//             if(this.state.iqdata)
//               if(event.stream.name.indexOf(this.state.iqdata.email))
//                 processor.doLoad(this.state.iqdata.videoselector)
//           })
//          },
//         streamDestroyed: (event) => {
//           console.log(`Stream ${event.stream.name} ended because ${event.reason}.`)
//          },
//          sessionConnected: event => {
//             let { email } = JSON.parse(sessionStorage.getItem('user'))
//             socket.emit('join.room', {room: this.props.roomName, email: email})
//             session.publish(publisher)
//          }
//        })
        
//        session.connect(sessionStorage.getItem('token'), (error) => {
//         if (error) {
//           console.log('error connecting to session')
//         }
//        });

//       /*
//       //Variant 1 - Add publichers not subscribers
//       //create session in opentok
//       let session = OpenTok.initSession(this.state.key, sessionStorage.getItem('session_id'));
//       // Subscribe to a newly created stream
//       session.on('streamCreated', (event)=>{
//         session.subscribe(event.stream, 'subscriber', {
//           insertMode: 'append'
//         }, (error)=>{
//           if(error)
//             console.log(error)
//         })
//       })

//       //Create the publisher
//       let publisher = OpenTok.initPublisher('publisher', {
//         insertMode: 'append'
//       }, (error)=>{
//         if(error)
//           console.log(error)
//       })

//       //Connect to created session
//       session.connect(sessionStorage.getItem('token'), (error)=>{
//         if(error){
//           console.log(error)
//         } else{
//           session.publish(publisher, (error)=>{
//             if(error)
//               console.log(error)
//           })
//         }
//       })*/

//     }
//   }

//   initYTPlayer(){
//     console.log('Init player method')
//     if (window.YT){
//       console.log('Creating player')
//       done = false
//       player = new window.YT.Player('player', {
//         events: {
//           'onReady': onPlayerReady,
//           'onStateChange': onPlayerStateChange
//         }
//       })
//     }else{
//       console.log('YT Object not available')
//     }
//   }

//   componentDidMount(){
//     if(!this.state.auth){
//         //Get username
//         let username = this.props.username
//         //Get OpenTok session_id and token
//         axios.post(`${process.env.REACT_APP_SERVER_URL}/api/get-token`, {
//           username: username,
//           userlevel: 4,
//           room: this.props.roomName
//         })
//         .then((response)=>{
//           if(response.data && response.data.status === "success"){
//             sessionStorage.setItem('token', response.data.token)
//             sessionStorage.setItem('session_id', response.data.session_id)
//             //sessionStorage.setItem('username', username)
//             this.setState({auth: true})
//             //Inizializate session
//             this.initSession()
//           } else {
//             console.log('Error when trying to get token')
//           }
//         });
//     } else {
//         this.initSession()
//     }
//   }

//   triggerme(){
//     //socket.emit('share.video.stream', {room: 'oka', selector: this.state.videoselector})
//     //processor.doLoad();
//   }

//   toggleOpenPicker(){
//     this.setState({openPicker: !this.state.openPicker})
//   }

//   handleAddToQueue(vid, vname, vimage){
//     let { email, displayName } = JSON.parse(sessionStorage.getItem('user'))
//     //console.log(vid+" "+vname+" "+vimage)
//     socket.emit('add.to.queue', {room: this.props.roomName, vid:vid, vname:vname, vimage:vimage, username:displayName, useremail: email, videoselector: this.state.videoselector })
//     this.setState({openPicker: false, pickDisabled: true})
//   }

//   render(){
    
//     return (
// <<<<<<< HEAD
//       <Container className="karaoke-up-next">
//         {/*<img src={logo} className="App-logo" alt="logo" />*/}
//         <Card className="main">
//           <CardContent>
//             {this.state.oka?<iframe title="yt-player" id="player" type="text/html" width="640" height="390" src={"https://www.youtube.com/embed/"+this.state.queue[0].vid+"?enablejsapi=1&origin="+this.state.site_url} frameBorder="0"></iframe>:<canvas width="640" height="480" id="c1"></canvas>}
//             <GridList className="KaraokeQueue" cols={2.5}>
//                 {this.state.queue && this.state.queue.map((item, index) => (
//                   <GridListTile key={item.vid}>
//                       <img src={item.vimage} alt={item.vname} />
//                       <GridListTileBar title={item.username+" / "+item.vname}></GridListTileBar>
//                   </GridListTile>
//                 ))}
//             </GridList>
//             {this.state.connected?<PlayListPicker playlist_id="PL3410948E2468F3D5" openPicker={this.state.openPicker} handleAddToQueue={this.handleAddToQueue.bind(this)}/>:<b>Connecting...</b>}
//           </CardContent>
//           <CardActions>
//             {/*<Button onClick={this.triggerme.bind(this)}>Sing</Button>*/}
//             <Button disabled={this.state.pickDisabled} onClick={()=>{ this.toggleOpenPicker() }}>{this.state.openPicker?"Close Picker":"Pick a Song"}</Button>
//           </CardActions>
//         </Card>
//         <Divider/>
//         <h2>Participants</h2>
//         <div id="publisher" className="my-cam"></div>
//         <div id="subscriber" className="others-cams"></div>
//       </Container>
// =======
//     <>
//       {this.state.oka?<iframe title="yt-player" id="player" type="text/html" width="640" height="390" src={"https://www.youtube.com/embed/"+this.state.queue[0].vid+"?enablejsapi=1&origin=https://9abf79fe.ngrok.io"} frameBorder="0"></iframe>:<canvas width="640" height="480" id="c1"></canvas>}
//     </>
// >>>>>>> b286212... remove old deps
//     );
//   }
// }

// export default Karaoke;
