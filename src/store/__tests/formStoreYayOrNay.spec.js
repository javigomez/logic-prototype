import { getCurrentBranch, commitAnswer } from '../formStore'
import yayOrNayForm from './fixtures/yayOrNayForm.json'

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
const YAY_STATEMENT = 1
const NAY_STATEMENT = 2

describe('given a yay or nay form with answers', () => {
  describe('when the answer is "yay"', () => {
    it('returns the yay branch', () => {
      const state = answer(yayOrNayForm, SHORT_TEXT_BLOCK, 'yay')

      const fields = getCurrentBranch(state)
      expect(fields.length).toBe(2)
      expect(fields[1].ref).toBe(getBlockRef(yayOrNayForm, YAY_STATEMENT))
    })
  })

  describe('when the answer is "nay"', () => {
    it('returns the nay branch', () => {
      const state = answer(yayOrNayForm, SHORT_TEXT_BLOCK, 'nay')

      const fields = getCurrentBranch(state)
      expect(fields.length).toBe(2)
      expect(fields[1].ref).toBe(getBlockRef(yayOrNayForm, NAY_STATEMENT))
    })
  })
  
  describe('when the answer is "may"', () => {
    it('returns the initial branch', () => {
      const state = answer(yayOrNayForm, SHORT_TEXT_BLOCK, 'may')

      const fields = getCurrentBranch(state)
      expect(fields.length).toBe(1)
      expect(fields[0].ref).toBe(getBlockRef(yayOrNayForm, SHORT_TEXT_BLOCK))
    })
  })
})
