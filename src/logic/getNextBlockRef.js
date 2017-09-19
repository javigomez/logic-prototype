import { evaluateCondition } from './model'

const getActions = (ref, logic) => logic.find(logicItem => logicItem.ref === ref).actions

const evaluateAction = (action, answers) => {
  const operation = evaluateCondition(action.condition.op)

  if (operation(action.condition, answers)) {
    return action.details.to.value
  }

  return null
}

export const blockHasLogic = (ref, logic) => {
  return logic.some(logicItem => logicItem.ref === ref)
}

export const getNextBlockRef = (ref, logic, answers) => {
  return getActions(ref, logic).map(action =>
    evaluateAction(action, answers)
  ).reduce((prev, curr) => curr || prev, null)
}
