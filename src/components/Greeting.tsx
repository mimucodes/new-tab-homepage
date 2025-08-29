import { useChromeStorage } from '../hooks/useChromeStorage'
import { now } from '../helpers/time.helpers'

const hours = now.getHours()

export function Greeting() {
  const [username, setUsername] = useChromeStorage('name', '')

  let greeting =
    hours >= 5 && hours < 12
      ? 'good morning, '
      : hours >= 12 && hours < 18
        ? 'good afternoon, '
        : 'good evening, '

  return (
    <div className="greeting">
      <h2>
        {greeting}
        <input
          type="text"
          name="username"
          placeholder="cutie"
          value={username}
          onChange={event => setUsername(event.target.value)}
          spellCheck="false"
          autoComplete="off"
        />
      </h2>
    </div>
  )
}
