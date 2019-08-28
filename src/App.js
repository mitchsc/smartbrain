import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo.js'
import Rank from './components/Rank/Rank.js'
import SignIn from './components/SignIn/SignIn.js'
import Register from './components/Register/Register.js'
import FaceRecognition from './components/FaceRecognition/FaceRecognition.js'
import Particles from 'react-particles-js'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js'
import './App.css';

const particleOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 150
      }
    }
  }
}

const initialState = {
  input: '',
  imageURL: '',
  boxes: [],
  route: 'signIn',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: '',
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageURL: '',
      boxes: [],
      route: 'signIn',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: '',
      }
    }
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      }
    })
  }

  drawBoxes = (data) => {
    const numFaces = data.outputs[0].data.regions.length;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    const boundingBoxes = [];
    for (var i = 0; i < numFaces; i++) {
      const clarifaiFace = data.outputs[0].data.regions[i].region_info.bounding_box;
      const box = {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - clarifaiFace.right_col * width,
        bottomRow: height - clarifaiFace.bottom_row * height,
      }
      boundingBoxes.push(box);
    }
    this.setState({ boxes: boundingBoxes });
  }

  onInputChange = (event) => {
    console.log(event.target.value);
    this.setState({ input: event.target.value })
  }

  onImageSubmit = () => {
    this.setState({ imageURL: this.state.input });
    fetch('https://quiet-shore-53168.herokuapp.com/imageurl', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('https://quiet-shore-53168.herokuapp.com/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count }));
            })
            .catch(console.log);
        }
        this.drawBoxes(response);
      })
      .catch(err => console.log(err))
  }

  onRouteChange = (route) => {
    if (route === 'signOut') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({ isSignedIn: true })
    }
    this.setState({ route: route });
  }

  render() {
    const { isSignedIn, imageURL, boxes, route } = this.state;
    return (
      <div className="App">
        <Particles className='particles' params={particleOptions} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        {this.state.route === 'home' ?
          <div>
            <Logo />
            <Rank name={this.state.user.name} entries={this.state.user.entries} />
            <ImageLinkForm onInputChange={this.onInputChange} onButtonClick={this.onImageSubmit} />
            <FaceRecognition imageURL={imageURL} boxes={boxes} />
          </div> :
          (route === 'signIn' ?
            <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} /> :
            <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />)
        }
      </div>
    );
  }
}

export default App;
