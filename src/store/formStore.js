import getInitialState from './getInitialState'
import isVisible from '../logic/isVisible'
import { blockHasLogic, getNextBlockRef } from '../logic/getNextBlockRef'

const actions = {
  commitAnswer: 'COMMIT_ANSWER'
}

export const commitAnswer = (ref, value) => {
  return {
    type: actions.commitAnswer,
    payload: { ref, value }
  }
}

export const formReducer = (state = getInitialState(), action) => {
  switch(action.type){
    case actions.commitAnswer:
      const { ref, value } = action.payload
      return {
        ...state,
        answers: {
          ...state.answers,
          [ref]: value
        }
      }
    default:
      return state
  }
}

export const getBlockByRef = (state, ref) => {
  return getBlocks(state).find(field => field.ref === ref)
}

export const getNextBlockRefInBlockList = (state, ref) => {
  const index = getBlocks(state).findIndex(block => block.ref === ref)
  const nextBlock = getBlocks(state)[index + 1]
  return nextBlock ? nextBlock.ref : null
}

export const getLogic = state => state.logic 

export const getAnswers = state => state.answers 

export const getBlocks = state => state.fields 

/**
  Selects the current visible fields according to the logic
*/
export const getCurrentBranch = (state) => {
  return getNextBlock({ state, ref: getBlocks(state)[0].ref })
}

const getNextBlock = ({ results = [], state, ref }) => {
  if(!ref) {
    return results
  }

  const block = getBlockByRef(state, ref)

  if (isVisible(block.ref, getLogic(state), getAnswers(state))) {
    results.push(block)
  }

  // if it has no logic, get the next in the list
  if (!blockHasLogic(block.ref, getLogic(state))) {
    return getNextBlock({ results, state, ref: getNextBlockRefInBlockList(state, ref)})
  }

  // otherwise, evaluate logic to get the next block
  const nextBlockRef = getNextBlockRef(block.ref, getLogic(state), getAnswers(state))

  if(nextBlockRef) {
    return getNextBlock({ results, state, ref: nextBlockRef })
  }

  return results
}
