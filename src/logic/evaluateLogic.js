// TODO: WRITE UNIT TEST FOR THIS
// TODO: MOVE THIS INTO A SELECTOR
const getLogicForCurrentBlockRef = (ref, logic) => {
  return logic.filter(logic => {
    return logic.actions.filter(action => {
      return action.condition.vars.filter(variable => {
        variable.type === 'field' && variable.variable === ref
      })
    })
  })
}

const evaluateLogic = (ref, logic, answers) => {
  if (!answers) {
    return false
  }

  logic = getLogicForCurrentBlockRef(ref, logic)
  return logic.filter(logic => {
    return logic.actions.some(action => {
      return action.condition.vars[1].value === answers[action.condition.vars[0].value] && 
        action.details.to.value === ref
    })
  }).length
}

export default evaluateLogic
