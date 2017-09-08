import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { commitAnswer, getBlockByRef } from '../store/formStore'

class Block extends PureComponent{
  constructor(){
    super()
    this.handleCommit = this.handleCommit.bind(this)
  }

  handleCommit() {
    this.props.onCommit(this.props.blockRef, this.input.value)
  }

  render() {
    const { title, type } = this.props
    return(
      <section>
        <h1>{title}</h1>
        {type === 'short_text' && <input type='text' ref={node => {this.input = node}} />}
        <button onClick={this.handleCommit}>Ok</button>
      </section>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...getBlockByRef(state, ownProps.blockRef)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onCommit: (ref, value) => dispatch(commitAnswer(ref, value))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Block)
