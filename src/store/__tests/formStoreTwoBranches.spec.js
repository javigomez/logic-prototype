import { getCurrentBranch } from '../formStore'
import twoBranchesForm from './fixtures/twoBranchesForm.json'

const answer = (form, blockIndex, value) => {
  return {
    ...form,
    answers: {
      [getBlockRef(form, blockIndex)]: value
    }
  }
}

const getBlockRef = (form, blockIndex) => {
  return form.fields[blockIndex].ref
}

const SHORT_TEXT_BLOCK = 0

it('should return 4 fields', () => {
  const state = answer(twoBranchesForm, SHORT_TEXT_BLOCK, 'yay')
  const fields = getCurrentBranch(state)
  expect(fields.length).toBe(4)
})
