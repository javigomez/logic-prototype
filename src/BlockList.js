import React, { Component } from 'react';
import { connect } from 'react-redux'
import Block from './components/block'
import './BlockList.css';
import { getCurrentBranch } from './store/formStore'

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
    fields: getCurrentBranch(state)
  }
}

export default connect(
  mapStateToProps
)(App)
