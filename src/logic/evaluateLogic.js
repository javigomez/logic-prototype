// TODO: WRITE UNIT TEST FOR THIS
const getLogicForCurrentBlockRef = (ref, logic) => {
  return logic.filter(logic => {
    return logic.actions.filter(action => {
      return action.condition.vars.filter(variable => variable.type === 'field' && variable.variable === ref)
    })
  })
}

const isRefApplicableToAction = (ref, action) => {
  return action.details.to.value === ref
}

const isConditionMatching = (action, answers) => {
  return action.condition.vars[1].value === answers[action.condition.vars[0].value]
}

const evaluateLogic = (ref, logic, answers) => {
  if (!answers) {
    return false
  }

  return !!getLogicForCurrentBlockRef(ref, logic)
  .filter(
    logic => logic.actions
      .filter(action => isRefApplicableToAction(ref, action))
      .some(action => isConditionMatching(action, answers))
  ).length
}

export default evaluateLogic
