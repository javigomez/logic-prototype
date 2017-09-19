import { getCurrentBranch } from '../formStore'
import twoBranchesForm from './fixtures/twoBranchesForm.json'
import { getBlockRef, answer } from './helpers'

const SHORT_TEXT_BLOCK = 0
const YAY_STATEMENT = 1
const NEXT_TO_YAY_STATEMENT = 2
const NAY_STATEMENT = 3
const NEXT_TO_NAY_STATEMENT = 4
const NEITHER_YAY_OR_NAY_STATEMENT = 5
const FINAL_STATEMENT = 6

// TODO: This fixture does too many things. refactor and maybe extract one or two fixtures from it
describe('given a form having answers with two branches', () => {
  describe('when the answer is "yay"', () => {
    it('should return the "yay" branch', () => {
      const state = answer(twoBranchesForm, SHORT_TEXT_BLOCK, 'yay')
      const fields = getCurrentBranch(state)
      expect(fields.length).toBe(4)
      expect(fields[1].ref).toBe(getBlockRef(twoBranchesForm, YAY_STATEMENT))
      expect(fields[2].ref).toBe(getBlockRef(twoBranchesForm, NEXT_TO_YAY_STATEMENT))
      expect(fields[3].ref).toBe(getBlockRef(twoBranchesForm, FINAL_STATEMENT))
    })
  })

  describe('when the answer is "nay"', () => {
    it('should return the "nay" branch', () => {
      const state = answer(twoBranchesForm, SHORT_TEXT_BLOCK, 'nay')
      const fields = getCurrentBranch(state)
      expect(fields.length).toBe(4)
      expect(fields[1].ref).toBe(getBlockRef(twoBranchesForm, NAY_STATEMENT))
      expect(fields[2].ref).toBe(getBlockRef(twoBranchesForm, NEXT_TO_NAY_STATEMENT))
      expect(fields[3].ref).toBe(getBlockRef(twoBranchesForm, FINAL_STATEMENT))
    })
  })

  describe('when the answer is neither "yay" or "nay"', () => {
    it('should return the "default jump" branch', () => {
      const state = answer(twoBranchesForm, SHORT_TEXT_BLOCK, 'may')
      const fields = getCurrentBranch(state)
      expect(fields.length).toBe(3)
      expect(fields[1].ref).toBe(getBlockRef(twoBranchesForm, NEITHER_YAY_OR_NAY_STATEMENT))
      expect(fields[2].ref).toBe(getBlockRef(twoBranchesForm, FINAL_STATEMENT))
    })
  })
})
