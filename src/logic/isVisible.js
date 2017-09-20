import { evaluateCondition } from '../logic/model'

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
  const operation = evaluateCondition(action.condition.op)

  return operation(action.condition, answers)
}

const isVisible = (ref, logic, answers) => {
  const actions = getLogicTargetingCurrentBlock(ref, logic)

  if(!actions.length) {
    return true
  }

  return actions.some(action => isConditionMatching(action, answers))
}

export default isVisible
