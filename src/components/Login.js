import React, { Component } from 'react'
import firebase from '../contexts/firebase';

const auth = firebase.auth()

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: null,
      user: null,
      token: null,
    }
    //this.wrapper = React.createRef()
    this.domRef = React.createRef()
  }

  async googleSignIn() {
    const provider = new firebase.auth.GoogleAuthProvider()
    let token = null
    let user = null

    await //auth.signInWithRedirect(provider)
    auth
      .signInWithPopup(provider)
      .then((result) => {
        token = result.credential.accessToken
        user = result.user
      })
      .catch((error) => {
        console.log(error)
        throw error
      })

    this.setState({ user: user, token: token })
    //console.log(user)
    sessionStorage.setItem(
      'user',
      JSON.stringify({ email: user.email, displayName: user.displayName })
    )
    this.props.handleCloseForm()
  }

  render() {
    return (
      <div>
<<<<<<< HEAD
        <Card className="LoginDialog" variant="outlined">
          <CardContent>
            <h1>Ready to Sing?</h1>
            <Button
              ref={this.wrapper}
              id="closeform"
              name="closeform"
              onClick={this.googleSignIn.bind(this)}
              color="primary"
            >
              Authenticate with Google
            </Button>
          </CardContent>
        </Card>
=======
>>>>>>> b286212... remove old deps
      </div>
    )
  }
}

export default Login