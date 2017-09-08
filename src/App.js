import React, { Component } from 'react';
import { connect } from 'react-redux'
import logo from './logo.svg';
import Block from './components/block'
import './App.css';
import { getCurrentPath } from './store/formStore'

class App extends Component {
  render() {
    return (
      <div className="App">
        {this.props.fields.map(field => <Block {...field} blockRef={field.ref} key={field.ref} />)}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state,
    fields: getCurrentPath(state)
  }
}

export default connect(
  mapStateToProps
)(App)
