import { useEffect, useState } from 'react'
import { getDate, getTime } from '../helpers/time.helpers'

export function DateTime() {
  let [date, setDate] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000)
    return () => clearInterval(timer)
  })

  return (
    <div className="datetime">
      <strong className="time">{getTime(date)}</strong>
      <p className="date">{getDate(date)}</p>
    </div>
  )
}
