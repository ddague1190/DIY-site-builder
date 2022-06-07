import React from 'react'

const classNames = (arr = []) => {
  let result = ''
  arr.forEach((el) => {
    result += ' ' + el
  })
  return result
}


const AddContentButton = ({ text, onClick, classList }) => {
  return (
    <button type='button' className={`cursor-pointer ${classNames(classList)}`} onClick={onClick}>{text}</button>
  )
}

export default AddContentButton