const getActions = (ref, logics) => logics.find(logic => logic.ref === ref).actions

const evaluateAction = (action, answers) => {
  if (action.condition.op === 'equal') {
    if (!answers || action.condition.vars[1].value !== answers[action.condition.vars[0].value]) {
      return null
    }
  }
  if(action.condition.op === 'and') {
    return null
  }
  return action.details.to.value
}

export const blockHasLogic = (ref, logic) => {
  return logic.some(l => l.ref === ref)
}

export const getNextBlockRef = (ref, logic, answers) => {
  return getActions(ref, logic).map(action =>
    evaluateAction(action, answers)
  ).reduce((prev, curr) => curr || prev, null)
}
