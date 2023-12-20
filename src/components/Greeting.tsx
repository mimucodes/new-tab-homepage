import { useEffect, useRef, useState } from 'react'
import { useLocalStorage } from '../hooks/use-local-storage'
import { now } from '../helpers/time.helpers'

const hours = now.getHours()

export function Greeting() {
  const [username, setUsername] = useLocalStorage('name', '')
  const [width, setWidth] = useState(0)
  const spanRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (spanRef.current !== null) {
      if (!spanRef.current.textContent) {
        setWidth(58)
      } else {
        setWidth(spanRef.current.offsetWidth + 4)
      }
    }
  }, [username])

  let greeting =
    hours >= 5 && hours < 12
      ? 'good morning, '
      : hours >= 12 && hours < 18
      ? 'good afternoon, '
      : 'good evening, '

  return (
    <section id="greeting">
      <h2 className="center">
        {greeting}
        <span className="helper" ref={spanRef}>
          {username}
        </span>
        <span className="user-input">
          <input
            type="text"
            name="username"
            placeholder="friend"
            value={username}
            onChange={event => setUsername(event.target.value)}
            style={{ width }}
            spellCheck="false"
            autoComplete="off"
          ></input>
        </span>
      </h2>
    </section>
  )
}
