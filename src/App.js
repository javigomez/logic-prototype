import React, { Component } from 'react';
import { connect } from 'react-redux'
import logo from './logo.svg';
import Block from './components/block'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        {this.props.fields.map(field => <Block {...field} />)}
      </div>
    );
  }
}

const mapStateToProps = state => state

export default connect(
  mapStateToProps
)(App)
