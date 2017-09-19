export const answer = (form, blockIndex, value) => {
  return {
    ...form,
    answers: {
      [getBlockRef(form, blockIndex)]: value
    }
  }
}

export const getBlockRef = (form, blockIndex) => {
  return form.fields[blockIndex].ref
}
