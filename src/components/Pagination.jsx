import React from 'react'

const Pagination = ({count, index, setIndex}) => {
  let arr = []
  
  if (count) for (let i = 1; i <= Math.ceil(count / 9); i++) {
    arr.push(i)
  }

  const minusHandler = () => {
    setIndex(prevIndex => prevIndex - 1)
  }

  const plusHandler = () => {
    setIndex(prevIndex => prevIndex + 1)
  }

  return (
    <ul className="pagination">
      <li className="waves-effect" onClick={index > 0 ? minusHandler : null}><i className="material-icons">chevron_left</i></li>
        {arr.map((_, i) => {
          const cls = ["waves-effect"]
          if (index === i) {
            cls.push('active')
          }
          return (
          <li key={i} className={cls.join(' ')} onClick={() => setIndex(i)}><i className="material-icons">filter_{i + 1}</i></li>
        )})}
      <li className="waves-effect" onClick={arr.length !== index + 1 ? plusHandler : null}><i className="material-icons">chevron_right</i></li>
    </ul>
  )
}

export default Pagination
