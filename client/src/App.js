import React, { Component } from "react";
import Builder from "./components/Builder";
import Header from "./components/Header";

class App extends Component {
  render() {
    return (
      <div style={{paddingBottom: 40}}>
        <Header>Build-A-Monster Workshop</Header>
        <Builder />
      </div>
    );
  }
}

export default App;
