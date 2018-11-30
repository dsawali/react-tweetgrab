import React, { Component } from 'react';
import Container from './Container';
import '../css/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>tweetgrab</h1>
        <Container />
        <div id="tweet-wrapper"></div>
      </div>
    );
  }
}

export default App;
