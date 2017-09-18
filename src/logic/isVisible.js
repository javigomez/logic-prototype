// TODO: WRITE UNIT TEST FOR THIS
const getLogicTargetingCurrentBlock = (ref, logic) => {
  return logic.reduce((prev, curr) => {
    return [].concat(curr.actions.filter(action =>
      isRefApplicableToAction(ref, action)))
  }, [])
}

const isRefApplicableToAction = (ref, action) => {
  return action.details.to.value === ref
}

const isConditionMatching = (action, answers) => {
  if (action.condition.op === 'always') {
    return true
  }
  if(action.condition.op === 'equal') {
    if (!answers) {
      return false
    }
    return action.condition.vars[1].value === answers[action.condition.vars[0].value]
  }
}

const isVisible = (ref, logic, answers) => {
  const actions = getLogicTargetingCurrentBlock(ref, logic)

  if(!actions.length) {
    return true
  }
  
  return actions.some(action => isConditionMatching(action, answers))
}

export default isVisible
