import React from 'react'

const Block = ({ title, type, onCommit }) => (
  <section>
    <h1>{title}</h1>
    {type === 'short_text' && <input type='text' />}
    <button onClick={onCommit}>Ok</button>
  </section>
)

export default Block
