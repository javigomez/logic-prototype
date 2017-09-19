import { getCurrentBranch } from '../formStore'
import defaultJumpForm from './fixtures/defaultJumpForm.json'
import { getBlockRef, answer } from './helpers'

const JUMP_BLOCK = 0
const IGNORED_BLOCK = 1
const TARGET_BLOCK = 2

describe('given a form with a block with a default jump', () => {
  it('returns the initial branch', () => {
    const fields = getCurrentBranch(defaultJumpForm)
    expect(fields.length).toBe(2)
    expect(getBlockRef({ fields }, 1)).not.toBe(getBlockRef(defaultJumpForm, IGNORED_BLOCK))
  })
})
