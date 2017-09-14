import getInitialState from './getInitialState'
import evaluateLogic from '../logic/evaluateLogic'

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
  if (!getLogic(state)) {
    return getBlocks(state)
  }

  let logicFields = getLogic(state).map(logic =>
    logic.actions
      .filter(action =>
        action.details.to.type === 'field'
      ).map(action =>
        action.details.to.value
      )
  )

  logicFields = [].concat.apply([], logicFields)

  return getBlocks(state).filter(field => {
    if (!logicFields.some(ref => ref === field.ref)) {
      return true
    }
    return evaluateLogic(field.ref, getLogic(state), getAnswers(state))
  })
}
