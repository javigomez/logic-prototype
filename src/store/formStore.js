import getInitialState from './getInitialState'
import isVisible from '../logic/isVisible'

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
  return state.fields.find(field => field.ref === ref)
}

export const getLogic = state => state.logic 

export const getAnswers = state => state.answers 

export const getBlocks = state => state.fields 

/**
  Selects the current visible fields according to the logic
*/
export const getCurrentBranch = (state) => {
  return getBlocks(state).filter(field => {
    return isVisible(field.ref, getLogic(state), getAnswers(state))
  })
}
