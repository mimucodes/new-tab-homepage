import { useLocalStorage } from '../hooks/use-local-storage';

const hours = new Date().getHours();

export function Greeting() {
  const [username, setUsername] = useLocalStorage('name', '');

  let greeting =
    hours >= 5 && hours < 12
      ? 'good morning'
      : hours >= 12 && hours < 18
      ? 'good afternoon'
      : 'good evening';

  const inputWidth = username ? `${username.length + 1}ch` : '5ch';

  return (
    <p className='serif'>
      {greeting}{' '}
      <span className="user-input">
        <input
          type="text"
          name="username"
          placeholder="friend"
          value={username}
          onChange={event => setUsername(event.target.value)}
          style={{ width: inputWidth }}
          spellCheck="false"
        ></input>
      </span>
      <br />
      it's currently
    </p>
  );
}
