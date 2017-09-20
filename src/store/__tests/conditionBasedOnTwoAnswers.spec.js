import { getCurrentBranch } from '../formStore'
import conditionBasedOnTwoAnswersForm from './fixtures/conditionBasedOnTwoAnswersForm.json'
import { getBlockRef, answer } from './helpers'

const JUMP_BLOCK_1 = 0
const JUMP_BLOCK_2 = 1
const NON_TARGETED_BLOCK = 2
const JUMP_TARGET_BLOCK = 3

describe('given a form with a jump condition based on two answers', function () {
  describe('when there is no answer', function () {
    it('should return the initial branch', function () {
      const fields = getCurrentBranch(conditionBasedOnTwoAnswersForm)
      expect(fields.length).toBe(2)
      expect(getBlockRef({ fields }, 1)).toBe(getBlockRef(conditionBasedOnTwoAnswersForm, JUMP_BLOCK_2))
    })
  })

  describe('when there are answers', function () {
    describe('and both are the expected ones', function () {
      it('should render the branch with the target block only', function () {
        let state = answer(conditionBasedOnTwoAnswersForm, JUMP_BLOCK_1, 'yes')
        state = answer(state, JUMP_BLOCK_2, 'yes')
        const fields = getCurrentBranch(state)
        expect(fields.length).toBe(3)
        expect(getBlockRef({ fields }, 2)).toBe(getBlockRef(conditionBasedOnTwoAnswersForm, JUMP_TARGET_BLOCK))
      })
    })

    describe('and none of them are the expected ones', function () {
      xit('should render the non targeted block', function () {
        let state = answer(conditionBasedOnTwoAnswersForm, JUMP_BLOCK_1, 'nay')
        state = answer(state, JUMP_BLOCK_2, 'nay')
        const fields = getCurrentBranch(state)
        expect(fields.length).toBe(4)
        expect(getBlockRef({ fields }, 2)).toBe(getBlockRef(conditionBasedOnTwoAnswersForm, NON_TARGETED_BLOCK))
        expect(getBlockRef({ fields }, 3)).toBe(getBlockRef(conditionBasedOnTwoAnswersForm, JUMP_TARGET_BLOCK))
      })
    })
  })
})
