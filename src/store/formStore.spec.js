import { getCurrentBranch } from './formStore'
import getInitialState from './getInitialState'
import { commitAnswer } from './formStore'

describe('given a form without answers', () => {
  it('returns the initial branch', () => {
    const fields = getCurrentBranch(getInitialState())
    expect(fields.length).toBe(1)
    expect(fields[0].ref).toBe('054e4eb0-f276-484a-bab4-f6c8c39035c5')
  })
})

describe('given a form with answers', () => {
  describe('when the answer is "yay"', () => {
    it('returns the yay branch', () => {
      const state = {
        ...getInitialState(),
        answers: {
          '054e4eb0-f276-484a-bab4-f6c8c39035c5': 'yay'
        }
      }

      const fields = getCurrentBranch(state)
      expect(fields.length).toBe(2)
      expect(fields[1].ref).toBe('1cbab94c-96aa-4900-971a-16511733df3c')
    })
  })

  describe('when the answer is "nay"', () => {
    it('returns the nay branch', () => {
      const state = {
        ...getInitialState(),
        answers: {
          '054e4eb0-f276-484a-bab4-f6c8c39035c5': 'nay'
        }
      }

      const fields = getCurrentBranch(state)
      expect(fields.length).toBe(2)
      expect(fields[1].ref).toBe('310b1dd4-597c-41e9-bccb-9a35d1917e44')
    })
  })
  
  describe('when the answer is "may"', () => {
    it('returns the initial branch', () => {
      const state = {
        ...getInitialState(),
        answers: {
          '054e4eb0-f276-484a-bab4-f6c8c39035c5': 'may'
        }
      }

      const fields = getCurrentBranch(state)
      expect(fields.length).toBe(1)
      expect(fields[0].ref).toBe('054e4eb0-f276-484a-bab4-f6c8c39035c5')
    })
  })
})
