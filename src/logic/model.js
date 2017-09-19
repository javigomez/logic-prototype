export const evaluateCondition = (op) => {
  const conditionOperatorMap = {
    'equal': equal,
    'not_equal': notEqual,
    'and': and,
    'always': always
  }

  return conditionOperatorMap[op]
}

const equal = (condition, answers) => answers && condition.vars[1].value === answers[condition.vars[0].value]

const notEqual = (condition, answers) => answers && condition.vars[1].value !== answers[condition.vars[0].value]

const and = (condition, answers) => {
  return condition.vars.every(condition => {
    const operation = evaluateCondition(condition.op)

    return operation(condition, answers)
  })
}

const always = (condition, answers) => true
