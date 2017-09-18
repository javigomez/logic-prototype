import { getCurrentBranch } from '../formStore'
import defaultJumpForm from './fixtures/defaultJumpForm.json'

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

const JUMP_BLOCK = 0
const IGNORED_BLOCK = 1
const TARGET_BLOCK = 2

describe('given a form with a block with a default jump', () => {
  xit('returns the initial branch', () => {
    const fields = getCurrentBranch(defaultJumpForm)
    console.log(fields)
    expect(fields.length).toBe(2)
    expect(getBlockRef({ fields }, 1)).not.toBe(getBlockRef(defaultJumpForm, IGNORED_BLOCK))
  })
})
