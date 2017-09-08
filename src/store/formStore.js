import getInitialState from './getInitialState'

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

/**
  Selects the current visible fields according to the logic
*/
export const getCurrentPath = (state) => {
  if (!state.logic) {
    return state.fields
  }

  let logicFields = state.logic.map(logic =>
    logic.actions
      .filter(action =>
        action.details.to.type === 'field'
      ).map(action =>
        action.details.to.value
      )
  )

  logicFields = [].concat.apply([], logicFields)

  return state.fields.filter(field => !logicFields.some(ref => ref === field.ref))
}
