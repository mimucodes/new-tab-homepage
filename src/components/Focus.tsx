import { useEffect, useRef, useState } from 'react'
import { useLocalStorage } from '../hooks/use-local-storage'

export function Focus() {
  const [focus, setFocus] = useLocalStorage('focus', '')
  const [width, setWidth] = useState(0)
  const spanRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (spanRef.current !== null) {
      if (spanRef.current.offsetWidth < 84) {
        setWidth(84)
      } else {
        setWidth(spanRef.current.offsetWidth)
      }
    }
  }, [focus])

  return (
    <section id="focus">
      <p className="center">
        what will you <strong>focus</strong> on today?
      </p>
      <span className="helper" ref={spanRef}>
        {focus}
      </span>
      <div className="user-input">
        <input
          type="text"
          placeholder="today i will..."
          value={focus}
          onChange={event => {
            setFocus(event.target.value)
          }}
          style={{ width }}
        />
        <button onClick={() => setFocus('')}>
          <span aria-hidden="true">×</span>
        </button>
      </div>
    </section>
  )
}
