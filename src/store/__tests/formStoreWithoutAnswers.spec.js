import { getCurrentBranch } from '../formStore'
import formWithoutAnswers from './fixtures/noAnswersForm.json'

const getBlockRef = (form, blockIndex) => {
  return form.fields[blockIndex].ref
}

const SHORT_TEXT_BLOCK = 0

describe('given a form without answers', () => {
  it('returns the initial branch', () => {
    const fields = getCurrentBranch(formWithoutAnswers)
    expect(fields.length).toBe(1)
    expect(fields[0].ref).toBe(getBlockRef(formWithoutAnswers, SHORT_TEXT_BLOCK))
  })
})

