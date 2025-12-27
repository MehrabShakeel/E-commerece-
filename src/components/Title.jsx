import React from 'react'

const Title = ({text1,text2}) => {
  return (
    <div className='inline flex gap-2 item-center mb-3'>
    <p className='text-gray-500'>{text1}<span className='text-slate-700 font-medium'>{text2}</span></p>
    <p></p>

    </div>
  )
}

export default Title